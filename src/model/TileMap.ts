

import { createMapData, neighbors as getNeighbors } from '../controller/map'
import { HashMap } from 'utils/HashMap';
import { Tile } from './Tile';
import { ElementSignature } from './Element';
import { TilePosition } from 'model/TilePosition';

export class TileMap {
  constructor(public tiles: HashMap<TilePosition, Tile>) { }

  static randomInitialization(size: number) {
    const mapData = createMapData(size);

    const tiles = new HashMap<TilePosition, Tile>(TilePosition.toString);
    mapData.getValues().forEach(tileData => {
      const tile: Tile = Tile.fromTileData(tileData);
      tiles.set(tile.position, tile)
    });

    return new TileMap(tiles);
  }

  deepClone() {
    const copiedTiles = this.tiles.copyMapType();
    this.tiles.getValues().forEach(tile => {
      const copiedTile = tile.deepClone();
      copiedTiles.set(copiedTile.position, copiedTile);
    })
    return new TileMap(copiedTiles);
  }

  getElementsInNeighborhood(position: TilePosition): ElementSignature {
    const positions = getNeighbors(position).concat(position);
    return positions.filter(position => this.tiles.has(position))
      .map(position => this.tiles.get(position).elementSignature)
      .reduce((acc, value) => acc.add(value), new ElementSignature(0, 0, 0, 0, 0))
  }
}
