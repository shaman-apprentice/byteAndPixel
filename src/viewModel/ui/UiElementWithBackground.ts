import * as PIXI from 'pixi.js';

import { GuiElem } from "./GuiElem";

export class UiElementWithBackground extends GuiElem {
    pixiElem: PIXI.Container;

    constructor(pathToSprite: string, width: number, height: number) {
        super();
        this.pixiElem = new PIXI.Container();
        this.pixiElem.addChild(this.createBackground(pathToSprite, width, height));
        
    }

    private createBackground(path: string, width: number, height: number) {
        const sprite = PIXI.Sprite.from(path);
        sprite.anchor.set(0.5,0.5);
        sprite.texture.addListener("update", () => this.scale(sprite, width, height));
        return sprite;
    }

    private scale(sprite: PIXI.Sprite, width: number, height: number) {
        sprite.scale.x = width / sprite.width;
        sprite.scale.y = height / sprite.height;
        sprite.texture.removeListener("update");
    }

}