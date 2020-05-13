import * as PIXI from 'pixi.js'

import { createMapData } from './utils/map'
import { IGuiElem } from './IGuiElem';
import { Position } from "./Position";
import { HashMap } from 'utils/HashMap';
import { Tile } from './Tile';

export class TileMap implements IGuiElem {
  pixiElem: PIXI.Container;
  tiles: HashMap<Position, Tile>;

  constructor(size: number) {
    const mapData = createMapData(size);
    this.pixiElem = new PIXI.Container();

    this.tiles = new HashMap(Position.toString);
    mapData.getValues().forEach(tileData => {
      const tile: Tile = new Tile(tileData);
      this.tiles.set(tile.position, tile)
      this.pixiElem.addChild(tile.pixiElem);
    });
  }
}
