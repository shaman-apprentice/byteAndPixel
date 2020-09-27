import { TileData } from "../controller/map";
import { ElementSignature } from './Element';
import { TilePosition } from 'model/TilePosition';

export class Tile {
    
    position: TilePosition;
    terrainName: string;
    slimed: boolean;
    elementSignature: ElementSignature;

    constructor(tileData: TileData) {
      this.slimed = tileData.slimed;
      this.position = tileData.position;
      this.elementSignature = tileData.elements;
      this.terrainName = tileData.name;
    }

  }