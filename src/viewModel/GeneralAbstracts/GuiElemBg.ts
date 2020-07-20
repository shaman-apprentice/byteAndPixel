import * as PIXI from 'pixi.js';
import { GuiElem } from "./GuiElem";

export abstract class GuiElemBg extends GuiElem {
  pixiElem: PIXI.Container;
  pixiElemBg: PIXI.DisplayObject;

  constructor({path, width, height}: { path: string; width: number; height: number; }) {
    super();
    this.pixiElem = new PIXI.Container();
    this.pixiElemBg = this.pixiElem.addChild(this.createBackground({path: path, width: width, height: height}))

  }

  private createBackground({ path, width, height }: { path: string; width: number; height: number; }) {
    const sprite = PIXI.Sprite.from(path);
    sprite.anchor.set(0.5,0.5);
    this.scale({ sprite, width, height })
    return sprite;
  }

  private scale({ sprite, width, height }: { sprite: PIXI.Sprite; width: number; height: number; }) {
    sprite.scale.x = width / sprite.width;
    sprite.scale.y = height / sprite.height;
  }
}