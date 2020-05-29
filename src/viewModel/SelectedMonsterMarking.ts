import * as PIXI from 'pixi.js'
import { GameState } from '../GameState'
import { IGuiElem } from './IGuiElem';
import { StateChangeEvent } from '../controller/events/StateChangeEvent';
import {GlowFilter} from "@pixi/filter-glow";
export class SelectedMonsterMarking implements IGuiElem {
  pixiElem: PIXI.Sprite;

  constructor() {
    this.pixiElem = this.createSprite();
    this.markSelectedMonster();
    GameState.emitter.addEventListener(StateChangeEvent.type,
      () => { this.markSelectedMonster(); });
  }

  private createSprite() {
    const sprite = PIXI.Sprite.from("Assets/Images/SelectionCircle.png");
    sprite.anchor.set(0.5, 0.5);
    return sprite;
  }

  private markSelectedMonster() {
    const selectedMonster = GameState.monsters.get(GameState.selectedMonster);
    //outline selected monster with green glow
    const glowFilter = new GlowFilter({distance: 10,outerStrength: 4, innerStrength: 1, color: 0x99ff99 ,quality: 0.2}  );
    selectedMonster.pixiElem.filters = [glowFilter];
    
    const dc = selectedMonster.position.toDisplayCoords();
    this.pixiElem.position.set(dc.x, dc.y);
    


  }
}