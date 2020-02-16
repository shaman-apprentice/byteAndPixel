import * as PIXI from 'pixi.js'

import { store } from '../store/store'
import { createOnTileClickAction } from '../store/actions/mapAction';

export class MapView {
  tiles: PIXI.Sprite[][];

  constructor() {
    const mapData = store.getState().map;
    this.tiles = [];
    for (let rowData of mapData) {
      const rowSprite = [];
      for (let tileData of rowData) {
        const sprite = PIXI.Sprite.from('Assets/Images/Terrain/' + tileData.terrainType.toString() + '.png')
        sprite.anchor.set(0.5, 0.5);
        //hitarea und anchor arbeiten nicht gut zusammen
        sprite.hitArea = new PIXI.Polygon([-32+0, -40+15, -32+0, -40+64, -32+30, -40+79, -32+33, -40+79, -32+63, -40+64, -32+63, -40+15, -32+33, -40+0, -32+30, -40+0]);
        const dc = tileData.position.toDisplayCoords();
        sprite.position.set(dc.x, dc.y);
        sprite.interactive = true;
        sprite.on('click', () => {
          store.dispatch(createOnTileClickAction(tileData.position));
        });
        rowSprite.push(sprite);
      }
      this.tiles.push(rowSprite);
    }
  }
}