import * as PIXI from 'pixi.js';
import { Monster } from "../Monster";
import { Skill } from "../../controller/skills/Skill"
import { GameState } from "GameState";
import { StateChangeEvent } from "../../controller/events/StateChangeEvent";
import { GlowFilter } from "@pixi/filter-glow";
import { GuiElem } from 'viewModel/GeneralAbstracts/GuiElem';
import { SelectedMonsterChangedEvent } from 'controller/events/SelectedMonsterChangedEvent';

export class ActionUI extends GuiElem {
    pixiElem: PIXI.Container;
    currentMonster: Monster
    constructor() {
        super();
        this.pixiElem = new PIXI.Container();
        this.showActions();
        GameState.emitter.addEventListener(StateChangeEvent.type,
            () => { this.showActions(); });
        GameState.emitter.addEventListener(SelectedMonsterChangedEvent.type, () => { this.showActions(); })
    }

    private showActions() {
        if (GameState.selectedMonster == undefined) { }
        else {
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
class ActionUiElement {
    pixiElem: PIXI.Container;
    pic: PIXI.Sprite;
    button: PIXI.Text;

    constructor(picture: string, text: Skill) {
        this.pixiElem = new PIXI.Container();
        this.pic = PIXI.Sprite.from(picture);
        this.pic.scale.set(0.4, 0.4);
        this.button = new PIXI.Text(text.name);

        this.button.interactive = true;
        this.button.buttonMode = true;
        this.button.on("click", () => { GameState.selectedAction = text; });
        this.button.on("mouseover", () => { this.onHover(); });
        this.button.on("mouseout", () => { this.onHoverExit(); });
        this.button.position.set(this.pic.position.x + 25, this.pic.position.y - 5);
        this.pixiElem.addChild(this.pic);
        this.pixiElem.addChild(this.button);


    }
    private checkMenuHover() {
        this.pixiElem.on('mouseover', () => {
            this.onHover();
        });
    }
    private onHover() {
        this.pixiElem.filters = [(new GlowFilter({ distance: 10, outerStrength: 2, innerStrength: 0, color: 0x99ff99, quality: 0.2 }))];
        console.log("Mouseover");
    }

    private onHoverExit() {
        this.pixiElem.filters = [];
        console.log("MouseOut");
    }

    private onHoverEnd() {
        this.pixiElem.filters = [];
    }
}