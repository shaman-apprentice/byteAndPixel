import { GlowFilter } from "@pixi/filter-glow";

export const selectionGlow = () => {
    return whiteSelection;
}

export const hoverGlow = () => {
    return whiteHover;
}

export const actionGlow = (friendly: boolean) => {
    return friendly ? greenHover : redHover;
}

const whiteSelection = new GlowFilter({ distance: 10, outerStrength: 2, innerStrength: 0, color: 0xffffff, quality: 0.2 });
const whiteHover = new GlowFilter({ distance: 10, outerStrength: 1, innerStrength: 0, color: 0xffffff, quality: 0.2 });
const greenHover = new GlowFilter({ distance: 10, outerStrength: 2, innerStrength: 0, color: 0x99ff99, quality: 0.2 });
const redHover = new GlowFilter({ distance: 10, outerStrength: 2, innerStrength: 0, color: 0xff0000, quality: 0.2 });