import { Monster } from "viewModel/Monster";
import { Position } from "../../viewModel/Position";

export interface SkillAnimation {
    animate(monster: Monster, target: Position, progress: number);
}

export class MoveAnimation implements SkillAnimation {
    animate(monster: Monster, target: Position, p: number) {
        const {x: fromX, y: fromY} = monster.position.toDisplayCoords();
        const {x: toX, y: toY} = target.toDisplayCoords();
        const q = 1-p;
        const deltaX = fromX * q + toX * p;
        const deltaY = fromY * q + toY * p;

        monster.moveImage(deltaX, deltaY);
    }
}