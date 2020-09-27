import { StateChangeEvent } from 'controller/events/StateChangeEvent';
import { tileClicked, tileHover, tileSelected } from 'controller/Input';
import { GameState } from 'GameState';
import { tileSize } from 'model/TilePosition';
import * as PIXI from 'pixi.js'

import { GuiElem } from 'view/GeneralAbstracts/GuiElem';
import { Tile } from 'model/Tile';

export class TileView extends GuiElem {

    private model: Tile;

    pixiElem: PIXI.Container;
    private terrain: PIXI.Sprite;
    private slime: PIXI.Sprite;

    constructor(model: Tile) {
        super();

        this.model = model;

        //TODO: this can be improved by only listening to changes to the model
        GameState.emitter.addEventListener(StateChangeEvent.type, () => this.changeSlimeState());

        this.terrain = PIXI.Sprite.from('Assets/Images/Terrain/' + model.terrainName + '.png');
        this.terrain.anchor.set(0.5, 0.5);
        this.slime = PIXI.Sprite.from('Assets/Images/Terrain/Slime.png');
        this.slime.anchor.set(0.5, 0.5);
        this.slime.visible = model.slimed;
        this.pixiElem = new PIXI.Container();
        this.pixiElem.addChild(this.terrain);
        this.pixiElem.addChild(this.slime);

        const dc = model.position.toDisplayCoords();
        const ht = tileSize / 2
        this.pixiElem.hitArea = new PIXI.Polygon([-ht + 0, -ht + 15, -ht + 0, -ht + 64, -ht + 30, -ht + 79, -ht + 33, -ht + 79, -ht + 63, -ht + 64, -ht + 63, -ht + 15, -ht + 33, -ht + 0, -ht + 30, -ht + 0]);
        this.pixiElem.position.set(dc.x, dc.y);
        this.pixiElem.interactive = true;
        this.pixiElem.on('click', () => {
            tileSelected(model.position);
        });
        this.pixiElem.on('rightclick', () => {
            tileClicked(model.position);
        });
        this.pixiElem.on('mouseover', () => {
            tileHover(model.position);
        })
    }

    changeSlimeState() {
        this.slime.visible = this.model.slimed;
    }


}