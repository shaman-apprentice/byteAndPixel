import * as PIXI from 'pixi.js';
import { Tile } from "../model/tile";
import { Ui } from "./ui";
import { Point } from '../model/position';
import { StateController } from '../controller/stateController';
import { createMoveAction } from '../model/action/action';

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
        this.sprite.hitArea = new PIXI.Polygon([0, 15, 0, 64, 30, 79, 33, 79, 63, 64, 63, 15, 33, 0, 30, 0]);
        this.sprite.on('click', (() => this.onClick(x, y)).bind(this));
        container.addChild(this.sprite);
    }

    onClick(x:number ,y: number) {
        StateController.getInstance().store.dispatch(createMoveAction(new Point(x, y)))
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