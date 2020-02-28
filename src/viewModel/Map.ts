import * as PIXI from 'pixi.js'

import { createMapData, TileData, TerrainType } from './utils/map'
import { IGuiElem } from './IGuiElem';
import { TileClickAction } from '../controller/TileClickEvent';

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
    this.terrain = PIXI.Sprite.from('Assets/Images/Terrain/' + tileData.terrainType.toString() + '.png');
    this.terrain.anchor.set(0.5, 0.5);
    this.slime = PIXI.Sprite.from('Assets/Images/Terrain/Slime.png');
    this.slime.anchor.set(0.5, 0.5);
    this.slime.visible = tileData.slimed;
    this.pixiElem = new PIXI.Container();
    this.pixiElem.addChild(this.terrain);
    this.pixiElem.addChild(this.slime);
    
    const dc = tileData.position.toDisplayCoords();
    this.pixiElem.hitArea = new PIXI.Polygon([-32+0, -32+15, -32+0, -32+64, -32+30, -32+79, -32+33, -32+79, -32+63, -32+64, -32+63, -32+15, -32+33, -32+0, -32+30, -32+0]);
    this.pixiElem.position.set(dc.x, dc.y);
    this.pixiElem.interactive = true;
    this.pixiElem.on('click', () => {
      new TileClickAction(tileData.position).doExecute();
    });
  }
}
