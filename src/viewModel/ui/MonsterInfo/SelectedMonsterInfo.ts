import * as PIXI from 'pixi.js';

import { GameState } from '.../../GameState';
import { StateChangeEvent } from '.../../controller/events/StateChangeEvent';
import { MonsterInfoBox } from './MonsterInfoBox';
import { Monster } from 'viewModel/Monster';
import { SelectedMonsterChangedEvent } from 'controller/events/SelectedMonsterChangedEvent';

export class SelectedMonsterInfo extends MonsterInfoBox {
  pixiElem: PIXI.Container;
  textBox: PIXI.Text;

  constructor() {
    super();
    this.setInfo(this.target());
    GameState.emitter.addEventListener(SelectedMonsterChangedEvent.type,
      () => { this.setInfo(this.target()); });
    GameState.emitter.addEventListener(StateChangeEvent.type,
      () => { this.setInfo(this.target()); });
  }

  target(): Monster {
    return GameState.selectedMonster;
  }

}