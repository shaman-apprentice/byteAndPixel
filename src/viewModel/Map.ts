import * as PIXI from 'pixi.js'

import { createMapData, TileData, TerrainType } from './utils/map'
import { IGuiElem } from './IGuiElem';
import { Position, tileSize } from "./Position";
import { tileClicked } from '../controller/Input';

export class Map implements IGuiElem {
  pixiElem: PIXI.Container;
  tiles: Tile[][];

  constructor(size: number) {
    const mapData = createMapData(size);
    this.pixiElem = new PIXI.Container();

    this.tiles = [];
    for (let rowData of mapData) {
      const row: Tile[] = [];
      for (let tileData of rowData) {
        const tile: Tile = new Tile(tileData);
        row.push(tile);
        this.pixiElem.addChild(tile.pixiElem);
      }
      this.tiles.push(row);
    }
  }
}



export class Tile implements IGuiElem {
  pixiElem: PIXI.Container;
  private terrain: PIXI.Sprite;
  private slime: PIXI.Sprite;

  private _slimed: boolean;
  position: Position;
  terrainType: TerrainType;

  set slimed(slimed: boolean) {
    this._slimed = slimed;
    this.slime.visible = slimed;
  }

  get slimed(): boolean {
    return this._slimed;
  }

  constructor(tileData: TileData) {
    this._slimed = tileData.slimed;
    this.terrainType = tileData.terrainType;
    this.position = tileData.position;

    this.terrain = PIXI.Sprite.from('Assets/Images/Terrain/' + tileData.terrainType.toString() + '.png');
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
      tileClicked(tileData.position);
    });
  }
}
