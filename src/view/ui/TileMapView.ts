import * as PIXI from 'pixi.js'

import { TileMap } from 'model/TileMap';
import { GuiElem } from 'view/GeneralAbstracts/GuiElem';
import { HashMap } from 'utils/HashMap';
import { TileView } from './TileView';
import { TilePosition } from 'model/TilePosition';

export class TileMapView extends GuiElem {
    
    pixiElem: PIXI.Container;
    views: HashMap<TilePosition, TileView>;
    model: TileMap;

    constructor(model: TileMap) {
        super();

        this.pixiElem = new PIXI.Container();
        this.model = model;
        this.views = new HashMap<TilePosition, TileView>(TilePosition.toString);

        model.tiles.getValues().forEach(tile => {
            const view: TileView = new TileView(tile);
            this.pixiElem.addChild(view.pixiElem);
            this.views.set(tile.position, view);
        })
        
    }

}