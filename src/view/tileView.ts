import * as PIXI from 'pixi.js';
import { Tile } from "../model/tile";
import { Ui } from "./ui";
import { Point } from '../model/position';
import { GameController } from '../controller/gameController';

export class TileView {
    sprite: PIXI.Sprite;
    data: Tile;

    constructor(tile: Tile, container: PIXI.Container) {
        this.data = tile;
        this.sprite = PIXI.Sprite.from("Assets/Images/Terrain/" + tile.terrainType.toString() + ".png");
        let x = tile.position.x;
        let y = tile.position.y;
        let dc = Ui.toDisplayCoords(x, y);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.angle = 90;
        this.sprite.position.set(dc.x, dc.y);
        this.sprite.interactive = true;
        //hitarea und anchor arbeiten nicht gut zusammen
        this.sprite.hitArea = new PIXI.Polygon([-32+0, -32+15, -32+0, 64, -32+30, -32+79, -32+33, -32+79, -32+63, -32+64, -32+63, -32+15, -32+33, -32+0, -32+30, -32+0]);
        this.sprite.on('click', (() => this.onClick(x, y)).bind(this));
        container.addChild(this.sprite);
    }

    onClick(x:number ,y: number) {
        GameController.getInstance().onTileClicked(new Point(x,y));
    }

    update(tile: Tile) {
        if (tile === this.data) return;
        let texure = PIXI.Texture.from("Assets/Images/Terrain/" + tile.terrainType.toString() + ".png")
        this.sprite.texture = texure;
        let x = tile.position.x;
        let y = tile.position.y;
        let dc = Ui.toDisplayCoords(x, y);
        this.sprite.position.set(dc.x, dc.y);
    }


}