import * as PIXI from 'pixi.js';
import { Monster } from "../model/monster";
import { Ui } from "./ui";

export class MonsterView {
    sprite: PIXI.Sprite;
    data: Monster;

    // todo: nasty side effect to container, which Monster shouldn't know about
    constructor(monster: Monster, container: PIXI.Container) {
        this.data = monster;
        this.sprite = PIXI.Sprite.from("Assets/Images/Monster/" + monster.name + ".png");
        let x = monster.position.x;
        let y = monster.position.y;
        let dc = Ui.toDisplayCoords(x, y);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.position.set(dc.x, dc.y);
        container.addChild(this.sprite);
    }

    update(monster: Monster) {
        // todo maybe there is a better place for this optimization
        if (monster === this.data) return;
        let texture = PIXI.Texture.from("Assets/Images/Monster/" + monster.name + ".png")
        this.sprite.texture = texture;

        let x = monster.position.x;
        let y = monster.position.y;
        let dc = Ui.toDisplayCoords(x, y);
        // this updates the container, where the container came from and goes to :/
        this.sprite.position.set(dc.x, dc.y);
    }

}