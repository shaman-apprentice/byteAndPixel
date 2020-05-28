import * as PIXI from 'pixi.js'

import { GameState } from '../GameState'
import { IGuiElem } from './IGuiElem';
import { StateChangeEvent } from '../controller/events/StateChangeEvent';
import { ActionPreviewEvent } from 'controller/events/ActionPreviewEvent';
import { Action } from 'controller/actions/Action';

export class ActionPreviewMarking implements IGuiElem {
  pixiElem: PIXI.Sprite;

  constructor() {
    this.pixiElem = this.createSprite();
    GameState.emitter.addEventListener(ActionPreviewEvent.type, (event: CustomEvent) => this.onActionPreview(event.detail));
    GameState.emitter.addEventListener(StateChangeEvent.type, () => this.onClean());
  }

  private createSprite() {
    const sprite = PIXI.Sprite.from('Assets/Images/Actions/walk.png');
    sprite.anchor.set(0.5, 0.5);
    sprite.alpha = 0.75;
    sprite.visible = false;
    return sprite;
  }



  onActionPreview(action: Action) {
    //TODO: maybe accept empty action for blank
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