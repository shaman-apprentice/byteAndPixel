import { GlowFilter } from "@pixi/filter-glow";

const glowFilter = (friendly: boolean, selected: boolean) => {

    return friendly ? selected ? greenSelected : greenHover : selected ? redSelected : redHover;
}

const greenSelected = new GlowFilter({ distance: 10, outerStrength: 3, innerStrength: 1, color: 0x99ff99, quality: 0.2 });
const greenHover = new GlowFilter({ distance: 10, outerStrength: 1, innerStrength: 1, color: 0x99ff99, quality: 0.2 });
const redSelected = new GlowFilter({ distance: 10, outerStrength: 3, innerStrength: 1, color: 0xff0000, quality: 0.2 });
const redHover = new GlowFilter({ distance: 10, outerStrength: 1, innerStrength: 1, color: 0xff0000, quality: 0.2 });

export const addFilter = (filters: Array<PIXI.Filter>, friendly: boolean, selected: boolean) => {
    filters.push(glowFilter(friendly, selected));
}

export const removeFilter = (filters: Array<PIXI.Filter>, friendly: boolean, selected: boolean) => {
    return filters.filter((a) => a !== glowFilter(friendly, selected));
}