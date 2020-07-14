import * as PIXI from 'pixi.js';
import {Monster} from "../Monster";
import { GameState } from "GameState";
import {StateChangeEvent} from "../../controller/events/StateChangeEvent";
import { AttackAction } from 'controller/actions/AttackAction';

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
            this.circle.removeChildren();
            if(this.currentMonster.friendly){
                const size = this.currentMonster.skillList.length;
                for(let i = 0; i < size; i++){
                    const action: ActionUiElement = new ActionUiElement("Assets/Images/Skills/"+this.currentMonster.skillList[i].name+".png" , this.currentMonster.skillList[i].name);
                    action.pixiElem.position.set(this.circle.position.x + 50* Math.cos(i*2*Math.PI/(size + 1)), this.circle.position.y + 50*Math.sin(i*2*Math.PI/(size + 1))) ;
                    this.circle.addChild(action.pixiElem);
                }
                this.container.addChild(this.circle);
                this.container.position.set(this.currentMonster.pixiElem.position.x, this.currentMonster.pixiElem.position.y);
            }
        }
        else {
            this.container.visible = false;
        }
    }
}
class ActionUiElement{
    pixiElem: PIXI.Container;
    pic: PIXI.Sprite;
    button: PIXI.Text;

    constructor(picture:string, text:string){
        this.pixiElem = new PIXI.Container();
        this.pic = PIXI.Sprite.from(picture);
        this.pic.scale.set(0.15, 0.125);
        this.button = new PIXI.Text(text);

        this.button.interactive = true;
        this.button.buttonMode = true;
        //this.button.anchor.set(0.5,0.5);
        //this.button.on("click", ()=> new AttackAction().execute());
        //this.button.position.set(this.pic.position.x + 50, this.pic.position.y + 25);
        this.pixiElem.addChild(this.pic);
        this.pixiElem.addChild(this.button);
    }
}