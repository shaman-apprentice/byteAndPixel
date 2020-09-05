import { Monster } from "model/Monster";
import { TilePosition } from "model/TilePosition";


export interface Effect {
    applyEffect(monster: Monster, target: TilePosition);
}