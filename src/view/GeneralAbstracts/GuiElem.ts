import * as PIXI from 'pixi.js';

export abstract class GuiElem {
  abstract pixiElem: PIXI.Container;

      addFilter(filter: PIXI.Filter) {
        if (!this.pixiElem.filters?.includes(filter)) {
            this.pixiElem.filters.push(filter);
        }
    }

    removeFilter(filter: PIXI.Filter) {
        this.pixiElem.filters = this.pixiElem.filters?.filter((a) => a !== filter);
    }
}