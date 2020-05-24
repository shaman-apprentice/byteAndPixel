import { Enemy } from "./enemy";
import { GameState } from "GameState";
import { neighbors } from "viewModel/utils/map";
import { Spider } from "./spider";

export class Cave extends Enemy {
    cooldown = 0;


    aiAction: () => void = () => {
        this.cooldown = ((this.cooldown + 1) % 3)
        if (this.cooldown == 0) {
            this.spawnAction();
        }
        this.actionPoints.current = 0;
    }

    spawnAction() {
        const tiles = GameState.map.tiles;
        const monsters = GameState.monsters;
        const takenPositions = monsters.getValues().map(monster => monster.position)
        const spawnPosition = neighbors(this.position).filter(position => tiles.has(position)).find(position => !takenPositions.find(pos => position.isEqual(pos)));
        Spider.spawn(spawnPosition);
    }
}