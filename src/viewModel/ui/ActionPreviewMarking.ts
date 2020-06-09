import * as PIXI from 'pixi.js'

import { GameState } from '../../GameState'
import { GuiElem } from './GuiElem';
import { StateChangeEvent } from '../../controller/events/StateChangeEvent';
import { MouseHoverEvent } from 'controller/events/MouseHoverEvent';
import { decideAction } from 'controller/Input';

export class ActionPreviewMarking implements GuiElem {
  pixiElem: PIXI.Sprite;

  constructor() {
    this.pixiElem = this.createSprite();
    GameState.emitter.addEventListener(MouseHoverEvent.type, () => this.actionPreview());
    GameState.emitter.addEventListener(StateChangeEvent.type, () => this.actionPreview());
  }

  private createSprite() {
    const sprite = PIXI.Sprite.from('Assets/Images/Actions/walk.png');
    sprite.anchor.set(0.5, 0.5);
    sprite.alpha = 0.75;
    sprite.visible = false;
    return sprite;
  }


  actionPreview() {
    const position = GameState.mousePosition;
    if (!position) {
      this.onClean();
      return;
    }
    const action = decideAction(position);
    if (!action) {
      this.onClean();
      return;
    }

    const dc = action.target().toDisplayCoords();
    this.pixiElem.position.set(dc.x, dc.y);
    this.pixiElem.texture = PIXI.Texture.from(`Assets/Images/Actions/${action.type()}.png`);
    this.pixiElem.visible = true;
  }

  onClean() {
    this.pixiElem.visible = false;
  }

}