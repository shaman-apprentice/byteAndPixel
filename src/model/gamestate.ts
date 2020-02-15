import { Map } from './map'
import { Monster } from './monster'

export interface GameState {
    map: Map;
    monsters: { [key: number]: Monster };
    selectedMonster: number;
}