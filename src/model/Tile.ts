import { TileData } from "../controller/map";
import { ElementSignature } from './Element';
import { TilePosition } from 'model/TilePosition';

export class Tile {

  constructor(public position: TilePosition,
    public terrainName: string,
    public slimed: boolean,
    public elementSignature: ElementSignature) { }

  public static fromTileData(tileData: TileData) {
    return new Tile(tileData.position, tileData.name, tileData.slimed, tileData.elements)
  }

  deepClone() {
    return new Tile(this.position.deepClone(), this.terrainName, this.slimed, this.elementSignature.deepClone())
  }

}