import * as Sound from 'pixi-sound'

import { monsterAtPosition } from "viewModel/utils/monster";
import { wait } from 'utils/time';
import { TilePosition } from 'model/TilePosition';
import { Monster } from 'model/Monster';
import { Ui } from 'viewModel/ui/ui';

export interface SkillAnimation {
    frames: number;
    animate: (monster: Monster, target: TilePosition) => Promise<void>;
}

export class MoveAnimation implements SkillAnimation {
    frames = 10;
    async animate(monster: Monster, target: TilePosition) {
        const monsterView = Ui.getMonsterView(monster);
        for (let frame = 1; frame <= this.frames; frame++) {
            await wait();

            if (frame == 1) {
                playSound("step");
            }
            const { x, y } = interpolate(monster.position.toDisplayCoords(), target.toDisplayCoords(), frame / this.frames)
            monsterView.moveImage(x, y);
            if (frame == frame - 1) {
                monsterView.resetImage();
            }
        }
    }
}

export class AttackAnimation implements SkillAnimation {
    frames = 14;
    halfFrames = Math.floor(this.frames / 2);
    async animate(monster: Monster, target: TilePosition) {
        const targetMonster = monsterAtPosition(target);
        const monsterView = Ui.getMonsterView(monster);
        const targetView = Ui.getMonsterView(targetMonster);
        for (let frame = 1; frame <= this.frames; frame++) {
            await wait();

            if (frame == 1) {
                playSound("swing");
            }
            const { x, y } = interpolate(monster.position.toDisplayCoords(), target.toDisplayCoords(), ((- Math.abs((frame - this.halfFrames) / this.frames)) + 0.5) * 0.2);
            monsterView.moveImage(x, y);
            if (frame == this.halfFrames) {
                playSound("impact");
            }
            if (frame > this.halfFrames) {
                const { x, y } = targetMonster.position.toDisplayCoords();
                const shake = Math.random() * 10;
                targetView.moveImage(x + shake, y);
            }
            if (frame == this.frames) {
                monsterView.resetImage();
                targetView.resetImage();
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