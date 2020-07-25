import * as PIXI from 'pixi.js';

import { GameState } from '.../../GameState';
import { StateChangeEvent } from '.../../controller/events/StateChangeEvent';
import { MonsterInfoBox } from './MonsterInfoBox';
import { Monster } from 'viewModel/Monster';

export class SelectedMonsterInfo extends MonsterInfoBox {
  pixiElem: PIXI.Container;
  textBox: PIXI.Text;

  constructor() {
    super();
    this.setInfo(this.target());
    GameState.emitter.addEventListener(StateChangeEvent.type,
      () => { this.setInfo(this.target()); });
  }

  target(): Monster {
    return GameState.monsters.get(GameState.selectedMonster);
  }

}