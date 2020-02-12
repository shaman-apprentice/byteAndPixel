import * as PIXI from 'pixi.js';
import { Monster } from "../model/monster";
import { Ui } from "./ui";

export class MonsterView {
    sprite: PIXI.Sprite;

    constructor(monster: Monster, container: PIXI.Container) {
        let x = monster.position.x;
        let y = monster.position.y;
        this.sprite = PIXI.Sprite.from("Assets/Images/Monster/" + monster.name + ".png");
        let dc = Ui.toDisplayCoords(x, y);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position.set(dc.x, dc.y);
        container.addChild(this.sprite);
    }

}