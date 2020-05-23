import * as PIXI from 'pixi.js'

import { createMapData, neighbors as getNeighbors } from './utils/map'
import { IGuiElem } from './IGuiElem';
import { Position } from "./Position";
import { HashMap } from 'utils/HashMap';
import { Tile } from './Tile';
import { ElementSignature } from './utils/Element';

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

  getElementsInNeighborhood(position: Position): ElementSignature {
    const positions = getNeighbors(position).concat(position);
    return positions.filter(position => this.tiles.has(position)).map(position => this.tiles.get(position).elementSignature).reduce((acc, value) => acc.add(value), new ElementSignature(0,0,0,0,0))
  }
}
