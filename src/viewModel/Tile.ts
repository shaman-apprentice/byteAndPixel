import * as PIXI from 'pixi.js'

import { TileData } from "./utils/map";
import { IGuiElem } from "./IGuiElem";
import { tileSize, Position } from "./Position";
import { tileSelected, tileClicked, tileHover } from "controller/Input";
import { ElementSignature } from './utils/Element';
import { Action } from 'controller/actions/Action';
import { GameState } from 'GameState';
import { ActionPreviewEvent } from 'controller/events/ActionPreviewEvent';
import { StateChangeEvent } from 'controller/events/StateChangeEvent';

export class Tile implements IGuiElem {
    pixiElem: PIXI.Container;
    private terrain: PIXI.Sprite;
    private slime: PIXI.Sprite;
    private actionPreview: PIXI.Sprite;
  
    private _slimed: boolean;
    position: Position;
    elementSignature: ElementSignature;
  
    set slimed(slimed: boolean) {
      this._slimed = slimed;
      this.slime.visible = slimed;
    }
  
    get slimed(): boolean {
      return this._slimed;
    }
  
    constructor(tileData: TileData) {
      this._slimed = tileData.slimed;
      this.position = tileData.position;
      this.elementSignature = tileData.elements;
  
      this.terrain = PIXI.Sprite.from('Assets/Images/Terrain/' + tileData.name + '.png');
      this.terrain.anchor.set(0.5, 0.5);
      this.slime = PIXI.Sprite.from('Assets/Images/Terrain/Slime.png');
      this.slime.anchor.set(0.5, 0.5);
      this.slime.visible = tileData.slimed;
      this.actionPreview = PIXI.Sprite.from('Assets/Images/Actions/walk.png');
      this.actionPreview.anchor.set(0.5, 0.5);
      this.actionPreview.alpha = 0.5;
      this.actionPreview.scale.set(0.5, 0.5);
      this.actionPreview.visible = false;
      this.pixiElem = new PIXI.Container();
      this.pixiElem.addChild(this.terrain);
      this.pixiElem.addChild(this.slime);
      this.pixiElem.addChild(this.actionPreview);
      
      const dc = tileData.position.toDisplayCoords();
      const ht = tileSize / 2
      this.pixiElem.hitArea = new PIXI.Polygon([-ht+0, -ht+15, -ht+0, -ht+64, -ht+30, -ht+79, -ht+33, -ht+79, -ht+63, -ht+64, -ht+63, -ht+15, -ht+33, -ht+0, -ht+30, -ht+0]);
      this.pixiElem.position.set(dc.x, dc.y);
      this.pixiElem.interactive = true;
      this.pixiElem.on('click', () => {
        tileSelected(tileData.position);
      });
      this.pixiElem.on('rightclick', () => {
        tileClicked(tileData.position);
      });
      this.pixiElem.on('mouseover', () => {
        tileHover(tileData.position);
      })

      GameState.emitter.addEventListener(ActionPreviewEvent.type, (event : CustomEvent) => this.onActionPreview(event.detail));
      GameState.emitter.addEventListener(StateChangeEvent.type, () => this.cleanActionPreview());
    }

    onActionPreview(action: Action) {
      //TODO: there is a solution similar to the SelectionCircle that does not scale quadratic
      
      if (this.position.isEqual(action.target())) {
        this.actionPreview.visible = true;
        this.actionPreview.texture = PIXI.Texture.from(`Assets/Images/Actions/${action.type()}.png`);
      } else {
        this.cleanActionPreview();
      }
    }

    cleanActionPreview() {
      this.actionPreview.visible = false;
    }
  }