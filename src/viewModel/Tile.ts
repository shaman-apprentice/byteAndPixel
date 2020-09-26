import * as PIXI from 'pixi.js'

import { TileData } from "../controller/map";
import { GuiElem } from "../view/GeneralAbstracts/GuiElem";
import { tileSelected, tileClicked, tileHover } from "controller/Input";
import { ElementSignature } from '../model/Element';
import { TilePosition, tileSize } from 'model/TilePosition';

export class Tile extends GuiElem {
    pixiElem: PIXI.Container;
    private terrain: PIXI.Sprite;
    private slime: PIXI.Sprite;
  
    private _slimed: boolean;
    position: TilePosition;
    elementSignature: ElementSignature;
  
    set slimed(slimed: boolean) {
      this._slimed = slimed;
      this.slime.visible = slimed;
    }
  
    get slimed(): boolean {
      return this._slimed;
    }
  
    constructor(tileData: TileData) {
      super();
      this._slimed = tileData.slimed;
      this.position = tileData.position;
      this.elementSignature = tileData.elements;
  
      this.terrain = PIXI.Sprite.from('Assets/Images/Terrain/' + tileData.name + '.png');
      this.terrain.anchor.set(0.5, 0.5);
      this.slime = PIXI.Sprite.from('Assets/Images/Terrain/Slime.png');
      this.slime.anchor.set(0.5, 0.5);
      this.slime.visible = tileData.slimed;
      this.pixiElem = new PIXI.Container();
      this.pixiElem.addChild(this.terrain);
      this.pixiElem.addChild(this.slime);
      
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
    }

  }