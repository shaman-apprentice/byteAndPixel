import * as PIXI from 'pixi.js'

import { TileClickEvent } from '../controller/TileClickEvent'
import { Tile, createMapData } from './utils/map'
import { IGuiElem } from './IGuiElem';

export class Map implements IGuiElem {
  pixiElem: PIXI.Container;

  constructor(size: number) {
    const mapData = createMapData(size);
    this.pixiElem = new PIXI.Container();

    for (let rowData of mapData) {
      for (let tileData of rowData) {
        this.pixiElem.addChild(this.createTileSprite(tileData));
      }
    }
  }

  private createTileSprite(tileData: Tile) {
    const sprite = PIXI.Sprite.from('Assets/Images/Terrain/' + tileData.terrainType.toString() + '.png')
    sprite.anchor.set(0.5, 0.5);
    sprite.hitArea = new PIXI.Polygon([-32+0, -32+15, -32+0, -32+64, -32+30, -32+79, -32+33, -32+79, -32+63, -32+64, -32+63, -32+15, -32+33, -32+0, -32+30, -32+0]);
    const dc = tileData.position.toDisplayCoords();
    sprite.position.set(dc.x, dc.y);
    sprite.interactive = true;
    sprite.on('click', () => {
      TileClickEvent.dispatch(tileData.position);
    });
    return sprite;
  }
}
