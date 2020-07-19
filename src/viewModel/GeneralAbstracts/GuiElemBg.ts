import * as PIXI from 'pixi.js';
import { GuiElem } from "./GuiElem";

export abstract class GuiElemBg extends GuiElem {
  abstract pixiElem: PIXI.Container;
  abstract pixiElemBg: PIXI.DisplayObject;

  protected createBackground({ path, width, height }: { path: string; width: number; height: number; }) {
    const sprite = PIXI.Sprite.from(path);
    sprite.anchor.set(0.5,0.5);
    this.scale({ sprite, width, height })
    return sprite;
  }

  protected scale({ sprite, width, height }: { sprite: PIXI.Sprite; width: number; height: number; }) {
    sprite.scale.x = width / sprite.width;
    sprite.scale.y = height / sprite.height;
  }
}