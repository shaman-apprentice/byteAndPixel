

import { createMapData, neighbors as getNeighbors } from '../controller/map'
import { HashMap } from 'utils/HashMap';
import { Tile } from './Tile';
import { ElementSignature } from './Element';
import { TilePosition } from 'model/TilePosition';

export class TileMap {
  tiles: HashMap<TilePosition, Tile>;

  constructor(size: number) {
    const mapData = createMapData(size);

    this.tiles = new HashMap(TilePosition.toString);
    mapData.getValues().forEach(tileData => {
      const tile: Tile = new Tile(tileData);
      this.tiles.set(tile.position, tile)
    });
  }

  getElementsInNeighborhood(position: TilePosition): ElementSignature {
    const positions = getNeighbors(position).concat(position);
    return positions.filter(position => this.tiles.has(position))
      .map(position => this.tiles.get(position).elementSignature)
      .reduce((acc, value) => acc.add(value), new ElementSignature(0, 0, 0, 0, 0))
  }
}
