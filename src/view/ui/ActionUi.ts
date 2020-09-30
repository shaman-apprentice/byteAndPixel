import * as PIXI from 'pixi.js';
import { Skill, SkillType } from "../../controller/skills/Skill"
import { GameState } from "GameState";
import { StateChangeEvent } from "../../controller/events/StateChangeEvent";
import { GuiElem } from 'view/GeneralAbstracts/GuiElem';
import { SelectedMonsterChangedEvent } from 'controller/events/SelectedMonsterChangedEvent';
import { hoverGlow, selectionGlow } from 'view/utils/filters';
import { Monster } from 'model/Monster';
import { ViewState } from 'ViewState';

export class ActionUI extends GuiElem {
    pixiElem: PIXI.Container;
    currentMonster: Monster
    constructor() {
        super();
        this.pixiElem = new PIXI.Container();
        this.showActions();
        GameState.emitter.addEventListener(StateChangeEvent.type, () => {
            this.selectMove();
            this.showActions();
        });
        GameState.emitter.addEventListener(SelectedMonsterChangedEvent.type, () => {
            this.selectMove();
            this.showActions();
        })
    }

    private selectMove() {
        ViewState.selectedAction = GameState.selectedMonster?.skillByType(SkillType.MOVE);
    }

    private showActions() {
        if (GameState.selectedMonster) {
            this.currentMonster = GameState.monsters.get(GameState.selectedMonster.id);
            if (this.currentMonster) {
                this.pixiElem.removeChildren();
                if (this.currentMonster.friendly) {
                    const size = this.currentMonster.skillList.length;
                    for (let i = 0; i < size; i++) {
                        const { x, y } = this.toDisplayCoordinates(GameState.selectedMonster, i);
                        const action: ActionUiElement = new ActionUiElement(this.currentMonster.skillList[i]);
                        action.pixiElem.position.set(x, y);
                        this.pixiElem.addChild(action.pixiElem);
                    }
                }
            }
            else {
                this.pixiElem.visible = false;
            }
        }
    }

    private toDisplayCoordinates(monster: Monster, ringPosition: number) {
        const { x, y } = monster.position.toDisplayCoords();
        const { x: deltaX, y: deltaY } = this.ringDeltaDisplayPosition(ringPosition);
        return { x: x + deltaX, y: y + deltaY };
    }

    private ringDeltaDisplayPosition(ringPosition: number) {
        return { x: 60 * Math.cos(ringPosition * 2 * Math.PI / 10), y: 60 * Math.sin(ringPosition * 2 * Math.PI / 10) }
    }
}

class ActionUiElement extends GuiElem {
    pixiElem: PIXI.Container;
    skill: Skill;
    text: PIXI.Text;
    direction: { x: number, y: number };

    constructor(skill: Skill) {
        super();
        this.skill = skill;
        this.pixiElem = new PIXI.Container();
        this.pixiElem.filters = [];
        const icon = PIXI.Sprite.from("Assets/Images/Icons/" + skill.icon + ".png");
        const border = PIXI.Sprite.from("Assets/Images/Icons/circle border.png");
        this.text = new PIXI.Text(skill.name);
        icon.anchor.set(0.5);
        border.anchor.set(0.5);
        this.text.anchor.set(0.5);
        this.text.visible = false;
        this.pixiElem.addChild(border);
        this.pixiElem.addChild(icon);
        this.pixiElem.addChild(this.text);
        this.pixiElem.interactive = true;
        this.pixiElem.buttonMode = true;
        this.pixiElem.on("click", () => { ViewState.selectedAction = skill; });
        this.pixiElem.on("mouseover", () => { this.onHover(); });
        this.pixiElem.on("mouseout", () => { this.onHoverExit(); });
        GameState.emitter.addEventListener("ActionSelectionEvent", () => this.markSelectedAction());

        this.markSelectedAction();

    }

    private onHover() {
        this.text.visible = true;
        this.addFilter(hoverGlow());
    }

    private onHoverExit() {
        this.text.visible = false;
        this.removeFilter(hoverGlow());
    }

    private markSelectedAction() {
        if (ViewState.selectedAction && this.skill.name == ViewState.selectedAction.name) {
            this.addFilter(selectionGlow());
        } else {
            this.removeFilter(selectionGlow());
        }
    }
}