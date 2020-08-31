import * as PIXI from 'pixi.js';
import { Monster } from "../Monster";
import { Skill, SkillType } from "../../controller/skills/Skill"
import { GameState } from "GameState";
import { StateChangeEvent } from "../../controller/events/StateChangeEvent";
import { GuiElem } from 'viewModel/GeneralAbstracts/GuiElem';
import { SelectedMonsterChangedEvent } from 'controller/events/SelectedMonsterChangedEvent';
import { hoverGlow, selectionGlow } from 'viewModel/utils/filters';

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
        GameState.selectedAction = GameState.selectedMonster?.skillByType(SkillType.MOVE);
    }

    private showActions() {
        if (GameState.selectedMonster) {
            this.currentMonster = GameState.monsters.get(GameState.selectedMonster.id);
            if (this.currentMonster) {
                this.pixiElem.removeChildren();
                if (this.currentMonster.friendly) {
                    const size = this.currentMonster.skillList.length;
                    for (let i = 0; i < size; i++) {
                        const action: ActionUiElement = new ActionUiElement("Assets/Images/Skills/Bubble.png", this.currentMonster.skillList[i]);
                        action.pixiElem.position.set(GameState.selectedMonster.pixiElem.position.x + 70 * Math.cos(i * 2 * Math.PI / 10), GameState.selectedMonster.pixiElem.position.y + 70 * Math.sin(i * 2 * Math.PI / 10));
                        this.pixiElem.addChild(action.pixiElem);
                    }
                }
            }
            else {
                this.pixiElem.visible = false;
            }
        }
    }
}

class ActionUiElement extends GuiElem {
    pixiElem: PIXI.Container;
    pic: PIXI.Sprite;
    button: PIXI.Text;
    skill: Skill;

    constructor(picture: string, skill: Skill) {
        super();
        this.skill = skill;
        this.pixiElem = new PIXI.Container();
        this.pixiElem.filters = [];
        this.pic = PIXI.Sprite.from(picture);
        this.pic.scale.set(0.4, 0.4);
        this.button = new PIXI.Text(skill.name);

        this.button.interactive = true;
        this.button.buttonMode = true;
        this.button.on("click", () => { GameState.selectedAction = skill; });
        this.button.on("mouseover", () => { this.onHover(); });
        this.button.on("mouseout", () => { this.onHoverExit(); });
        this.button.position.set(this.pic.position.x + 25, this.pic.position.y - 5);
        this.pixiElem.addChild(this.pic);
        this.pixiElem.addChild(this.button);
        GameState.emitter.addEventListener("ActionSelectionEvent", () => this.markSelectedAction());

        this.markSelectedAction();

    }

    private onHover() {
        this.addFilter(hoverGlow());
    }

    private onHoverExit() {
        this.removeFilter(hoverGlow());
    }

    private markSelectedAction() {
        if (GameState.selectedAction && this.skill.name == GameState.selectedAction.name) {
            this.addFilter(selectionGlow());
        } else {
            this.removeFilter(selectionGlow());
        }
    }
}