import * as Sound from 'pixi-sound'

import { Monster } from "viewModel/Monster";
import { Position } from "../../viewModel/Position";
import { monsterAtPosition } from "viewModel/utils/monster";

export interface SkillAnimation {
    duration: number;
    onStart(monster: Monster, target: Position);
    animate(monster: Monster, target: Position, progress: number);
    onFinish(monster: Monster, target: Position);
}

export class MoveAnimation implements SkillAnimation {
    duration = 10;
    animate(monster: Monster, target: Position, p: number) {
        const { x, y } = interpolate(monster.position.toDisplayCoords(), target.toDisplayCoords(), p)
        monster.moveImage(x, y);
    }
    onStart(monster: Monster, target: Position) {
        playSound("step");
    }
    onFinish(monster: Monster, target: Position) {
        monster.resetImage()
    }
}

export class AttackAnimation implements SkillAnimation {
    hit = false;
    duration = 10;
    animate(monster: Monster, target: Position, p: number) {
        const { x, y } = interpolate(monster.position.toDisplayCoords(), target.toDisplayCoords(), (Math.abs(p - 0.5) - 0.5) * -0.2)
        monster.moveImage(x, y);
        const targetMonster = monsterAtPosition(target);
        if (targetMonster && p > 0.5) {
            const { x, y } = targetMonster.position.toDisplayCoords();
            const shake = Math.random() * 10;
            targetMonster.moveImage(x + shake, y);
            if (!this.hit) {
                this.hit = true;
                playSound("impact");
            }
        }
    }
    onStart(monster: Monster, target: Position) {
        this.hit = false;
        playSound("swing");
    }
    onFinish(monster: Monster, target: Position) {
        monster.resetImage()
        monsterAtPosition(target)?.resetImage();
    }
}

const interpolate = (pos1: { x: number, y: number }, pos2: { x: number, y: number }, p: number) => {
    const q = 1 - p;
    const deltaX = pos1.x * q + pos2.x * p;
    const deltaY = pos1.y * q + pos2.y * p;

    return { x: deltaX, y: deltaY }
}

const playSound = (name: string) => {
    Sound.default.play(name);
}