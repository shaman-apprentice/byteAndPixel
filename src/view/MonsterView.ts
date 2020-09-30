import * as PIXI from 'pixi.js';
import { GuiElem } from 'view/GeneralAbstracts/GuiElem';
import { GameState } from 'GameState';
import { MouseHoverEvent } from 'controller/events/MouseHoverEvent';
import { StateChangeEvent } from 'controller/events/StateChangeEvent';
import { Monster } from 'model/Monster';
import { hoverGlow, actionGlow } from 'view/utils/filters';
import { ViewState } from 'ViewState';

export class MonsterView extends GuiElem {
    private static displayOffset = -6;

    pixiElem: PIXI.Sprite;
    model: Monster;

    constructor(model: Monster) {
        super();
        this.model = model;
        this.pixiElem = this.createSprite();

        this.resetImage();
        this.checkActionPoints();

        GameState.emitter.addEventListener(MouseHoverEvent.type, () => {
            this.checkHover();
        });
        GameState.emitter.addEventListener(StateChangeEvent.type, () => {
            this.checkActionPoints();
            this.checkHover();
        })
    }

    moveImage(x: number, y: number) {
        // used in animation to temporarly move the image without changing its position
        // this is overwritten by changing the position
        this.pixiElem.position.set(x, y + MonsterView.displayOffset);
    }

    resetImage() {
        const dc = this.model.position.toDisplayCoords();
        this.pixiElem.position.set(dc.x, dc.y + MonsterView.displayOffset);
    }

    private createSprite() {
        const sprite = PIXI.Sprite.from("Assets/Images/Monster/" + this.model.name + ".png");
        sprite.anchor.set(0.5, 0.5);
        sprite.filters = [];
        return sprite;
    }

    private checkHover() {
        if (ViewState.mousePosition.isEqual(this.model.position)) {
            this.onHover();
        } else {
            this.onHoverEnd();
        }
    }

    private onHover() {
        this.addFilter(hoverGlow());
    }

    private onHoverEnd() {
        this.removeFilter(hoverGlow());
    }

    private checkActionPoints() {
        if (this.model.actionPoints.current > 0) {
            this.addFilter(actionGlow(this.model.friendly));
        } else {
            this.removeFilter(actionGlow(this.model.friendly));
        }
    }
}