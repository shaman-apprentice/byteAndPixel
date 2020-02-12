import * as PIXI from 'pixi.js';
import { Tile } from "../model/tile";
import { Ui } from "./ui";

export class TileView {
    sprite: PIXI.Sprite;

    constructor(tile: Tile, container: PIXI.Container) {
        let x = tile.position.x;
        let y = tile.position.y;
        this.sprite = PIXI.Sprite.from("Assets/Images/Terrain/" + tile.terrainType.toString() + ".png");
        let dc = Ui.toDisplayCoords(x, y);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.angle = 90;
        this.sprite.position.set(dc.x, dc.y);
        container.addChild(this.sprite);
    }

}