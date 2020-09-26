import * as PIXI from 'pixi.js'

import { createMapData, neighbors as getNeighbors } from './utils/map'
import { GuiElem } from '../view/GeneralAbstracts/GuiElem';
import { HashMap } from 'utils/HashMap';
import { Tile } from './Tile';
import { ElementSignature } from './utils/Element';
import { TilePosition } from 'model/TilePosition';

export class TileMap extends GuiElem {
  pixiElem: PIXI.Container;
  tiles: HashMap<TilePosition, Tile>;

  constructor(size: number) {
    super();
    const mapData = createMapData(size);
    this.pixiElem = new PIXI.Container();

    this.tiles = new HashMap(TilePosition.toString);
    mapData.getValues().forEach(tileData => {
      const tile: Tile = new Tile(tileData);
      this.tiles.set(tile.position, tile)
      this.pixiElem.addChild(tile.pixiElem);
    });
  }

  getElementsInNeighborhood(position: TilePosition): ElementSignature {
    const positions = getNeighbors(position).concat(position);
    return positions.filter(position => this.tiles.has(position)).map(position => this.tiles.get(position).elementSignature).reduce((acc, value) => acc.add(value), new ElementSignature(0,0,0,0,0))
  }
}
