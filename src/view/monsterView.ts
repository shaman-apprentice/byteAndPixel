import * as PIXI from 'pixi.js';
import { Monster } from "../model/monster";
import { Ui } from "./ui";

export class MonsterView {
    sprite: PIXI.Sprite;
    data: Monster;

    constructor(monster: Monster, container: PIXI.Container) {
        this.data = monster;
        this.sprite = PIXI.Sprite.from("Assets/Images/Monster/" + monster._name + ".png");
        let x = monster._position.x;
        let y = monster._position.y;
        let dc = Ui.toDisplayCoords(x, y);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position.set(dc.x, dc.y);
        container.addChild(this.sprite);
    }

    update(monster: Monster) {
        if (monster === this.data) return;
        let texure = PIXI.Texture.from("Assets/Images/Monster/" + monster._name + ".png")
        this.sprite.texture = texure;

        let x = monster._position.x;
        let y = monster._position.y;
        let dc = Ui.toDisplayCoords(x, y);
        this.sprite.position.set(dc.x, dc.y);
    }

}