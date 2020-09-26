import { MonsterInfoBox } from "./MonsterInfoBox";
import { GameState } from "GameState";
import { InfoHideEvent } from "controller/events/InfoHideEvent";
import { SelectedMonsterChangedEvent } from "controller/events/SelectedMonsterChangedEvent";
import { MouseHoverEvent } from "controller/events/MouseHoverEvent";
import { monsterAtMousePosition } from "viewModel/utils/monster";
import { StateChangeEvent } from "controller/events/StateChangeEvent";

export class ActiveMonsterInfo extends MonsterInfoBox{
    
    constructor(){
        super();
        if (GameState.selectedMonster)
            this.setInfo(GameState.selectedMonster);

        GameState.emitter.addEventListener(InfoHideEvent.type, () => {
            this.isHidden = !this.isHidden;
            if (this.isHidden)
                this.pixiElem.visible = false;
            else
                this.pixiElem.visible = true;
        });

        GameState.emitter.addEventListener(SelectedMonsterChangedEvent.type, () => { 
              this.setInfo(GameState.selectedMonster);
        });

        GameState.emitter.addEventListener(StateChangeEvent.type, () => { 
              this.setInfo(GameState.selectedMonster);
        });
        
        GameState.emitter.addEventListener(MouseHoverEvent.type, () => {
            const hoveredMonster = monsterAtMousePosition();
            if (hoveredMonster) {
                this.setInfo(hoveredMonster);
            }
            else{
                this.setInfo(GameState.selectedMonster);
            }
        })
    }
}