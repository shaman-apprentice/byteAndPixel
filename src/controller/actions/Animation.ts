import * as Sound from 'pixi-sound'

import { Monster } from "viewModel/Monster";
import { Position } from "../../viewModel/Position";
import { monsterAtPosition } from "viewModel/utils/monster";
import { wait } from 'utils/time';

export interface SkillAnimation {
    frames: number;
    animate: (monster: Monster, target: Position) => Promise<void>;
}

export class MoveAnimation implements SkillAnimation {
    frames = 20;
    async animate(monster: Monster, target: Position) {
        for (let frame = 0; frame < this.frames; frame++) {
            await wait();

            if (frame == 0) {
                playSound("step");
            }
            const { x, y } = interpolate(monster.position.toDisplayCoords(), target.toDisplayCoords(), frame / this.frames)
            monster.moveImage(x, y);
            if (frame == frame - 1) {
                monster.resetImage();
            }
        }
    }
}

export class AttackAnimation implements SkillAnimation {
    frames = 20;
    halfFrames = Math.floor(this.frames / 2);
    async animate(monster: Monster, target: Position) {
        const targetMonster = monsterAtPosition(target);
        for (let frame = 0; frame < this.frames; frame++) {
            await wait();

            if (frame == 0) {
                playSound("swing");
            }
            const { x, y } = interpolate(monster.position.toDisplayCoords(), target.toDisplayCoords(), Math.abs(this.halfFrames - frame) / (5 * this.frames));
            monster.moveImage(x, y);
            if (frame == this.halfFrames) {
                playSound("impact");
            }
            if (frame > this.halfFrames) {
                const { x, y } = targetMonster.position.toDisplayCoords();
                const shake = Math.random() * 10;
                targetMonster.moveImage(x + shake, y);
            }
            if (frame == frame - 1) {
                monster.resetImage();
                monsterAtPosition(target)?.resetImage();
            }
        }
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