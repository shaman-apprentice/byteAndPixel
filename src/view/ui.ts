import * as PIXI from 'pixi.js';
import { GameState } from "../model/gameState";
import { Tile } from "../model/tile";
import { Point } from "../model/position";

const tileSize: number = 64;

export class Ui {
    boardContainer: PIXI.Container
    tiles: PIXI.Sprite[][] = [];


    static createUi(state: GameState): Ui {
        var ui: Ui = new Ui();
        ui.createUi(state);

        return ui;
    }

    private createUi(state: GameState) {
        this.boardContainer = new PIXI.Container();
        let size = state.map.tiles.length;
        this.tiles = [];
        for (let x = 0; x < size; x++) {
            const row = []
            for (let y = 0; y < size; y++) {
                row.push(this.createTile(state.map.tiles[x][y]))
            }
            this.tiles.push(row)
        }
        
        this.boardContainer.position.set(tileSize, tileSize);

    }

    private createTile(tile: Tile): PIXI.Sprite {
        let x = tile.position.x;
        let y = tile.position.y;
        let sprite = PIXI.Sprite.from("Assets/Images/Terrain/" + tile.terrainType.toString() + ".png");
        let dc = this.toDisplayCoords(x, y);
        sprite.anchor.set(0.5, 0.5);
        sprite.angle = 90;
        sprite.position.set(dc.x, dc.y)
        this.boardContainer.addChild(sprite)
        return sprite;
    }

    toDisplayCoords(x: number, y: number): Point {
        return new Point(x * tileSize + y * tileSize / 2, y * tileSize);
    }
}