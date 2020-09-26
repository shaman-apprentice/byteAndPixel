import * as PIXI from 'pixi.js';

import { GameState } from '.../../GameState';
import { StateChangeEvent } from '.../../controller/events/StateChangeEvent';
import { MonsterInfoBox } from './MonsterInfoBox';
import { SelectedMonsterChangedEvent } from 'controller/events/SelectedMonsterChangedEvent';
import { InfoHideEvent } from 'controller/events/InfoHideEvent';

export class SelectedMonsterInfo extends MonsterInfoBox {
  
  textBox: PIXI.Text;
  isHidden: boolean;

  constructor() {
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
        if (GameState.selectedMonster) {
          this.setInfo(GameState.selectedMonster);
          if (!this.isHidden)
            this.pixiElem.visible = true;
        }  
      });
    GameState.emitter.addEventListener(StateChangeEvent.type, () => { 
      if (GameState.selectedMonster && !this.isHidden)
        this.setInfo(GameState.selectedMonster);
    });
  }
}