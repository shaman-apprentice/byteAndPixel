import * as PIXI from 'pixi.js';
import {Monster} from "../Monster";
import { GameState } from "GameState";
import {StateChangeEvent} from "../../controller/events/StateChangeEvent";

export class ActionUI{
    container: PIXI.Container;
    circle: PIXI.Sprite;
    currentMonster: Monster
    constructor(){
        this.container = new PIXI.Container();
        this.circle = PIXI.Sprite.from("Assets/Images/actions/UICircle.png");
        this.showActions();
        GameState.emitter.addEventListener(StateChangeEvent.type,
            () => { this.showActions(); });
    }

    private showActions(){
        this.currentMonster = GameState.monsters.get(GameState.selectedMonster);
        if(this.currentMonster){
            this.currentMonster.skillList.forEach(element => {
                const action: ActionUiElement = new ActionUiElement("Assets/Images/actions/attack.png" , element.name);
                this.circle.addChild(action.pixiElem);
            });
            this.container.addChild(this.circle);
            this.container.position.set(this.currentMonster.position.x, this.currentMonster.position.y);
        }
        else {
            this.container.visible = false;
        }
    }
}
class ActionUiElement{
    pixiElem: PIXI.Container;
    pic: PIXI.Sprite;
    text: PIXI.Text;

    constructor(picture:string, text:string){
        this.pixiElem = new PIXI.Container();
        this.pic = PIXI.Sprite.from(picture);
        this.text = new PIXI.Text(text);
        this.pixiElem.addChild(this.pic);
        this.pixiElem.addChild(this.text);
    }
}