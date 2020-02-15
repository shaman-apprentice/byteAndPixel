import * as PIXI from 'pixi.js';

import { store } from '../store/store'
import { toDisplayCoords } from '../model/map'
import { Monster } from '../model/monster';

export class MonsterView {
    monsters: { [key: number]: PIXI.Sprite };

    constructor() {
        const monsterDict = store.getState().monsters;
        this.monsters = Object.keys(monsterDict).reduce((acc, monsterId) => {
            const monsterData = monsterDict[monsterId] as Monster;
            acc[monsterId] = this.getSprite(monsterData);
            return acc;
        }, {});

        store.subscribe(this.onStoreUpdate.bind(this));
    }

    private getSprite(monsterData: Monster) {
        const sprite = PIXI.Sprite.from("Assets/Images/Monster/" + monsterData.name + ".png");
        sprite.anchor.set(0.5, 0.5);
        const dc = toDisplayCoords(monsterData.posi);
        sprite.position.set(dc.x, dc.y);
        return sprite;
    }

    private onStoreUpdate() {
        const monsterDict = store.getState().monsters;
        Object.entries(monsterDict).forEach(([monsterId, monster]) => {
            const sprite = this.monsters[monsterId];
            const dc = toDisplayCoords(monster.posi);
            sprite.position.set(dc.x, dc.y);
        });
    }
}
