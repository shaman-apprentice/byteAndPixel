import { GameState as GameState } from "../model/gameState";
import { TileMap } from "../model/map";
import { Monster } from "../model/monster";
import { Tile, TerrainType } from "../model/tile";
import { Point } from '../model/position';


export class GameController {
    initialState(): GameState {
        let tiles = this.generateTiles(8);
        let map = new TileMap(tiles)
        let monster = new Monster("appleman", new Point(2, 2))
        let monsters: Monster[] = [monster]
        return new GameState(map, monsters);
    }

    generateTiles(size: number): Tile[][] {
        let tiles: Tile[][] = [];
        for (let x = 0; x < size; x++) {
            const row = []
            for (let y = 0; y < size; y++) {
                row.push(new Tile(this.randomTerrainType(), new Point(x, y)))
            }
            tiles.push(row)
        }
        return tiles;
    }

    randomTerrainType(): TerrainType {
        const terrainTypes = Object.keys(TerrainType);
        const index = Math.floor(Math.random() * terrainTypes.length);
        return terrainTypes[index] as TerrainType;
    }
}