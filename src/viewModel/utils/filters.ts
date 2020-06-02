import { GlowFilter } from "@pixi/filter-glow";

export const selectionGlow = (friendly: boolean) => {
    return friendly ? greenSelected : redSelected;
}

export const hoverGlow = (friendly: boolean, ActionPoints: Number) => {
    if (ActionPoints > 0)
    return friendly ? greenHover : redHover;
    else
    return friendly ? HoverNoActionPoints : redHover;
}

const greenSelected = new GlowFilter({ distance: 10, outerStrength: 3, innerStrength: 1, color: 0x99ff99, quality: 0.2 });
const greenHover = new GlowFilter({ distance: 10, outerStrength: 1, innerStrength: 1, color: 0x99ff99, quality: 0.2 });
const redSelected = new GlowFilter({ distance: 10, outerStrength: 3, innerStrength: 1, color: 0xff0000, quality: 0.2 });
const redHover = new GlowFilter({ distance: 10, outerStrength: 1, innerStrength: 1, color: 0xff0000, quality: 0.2 });
const HoverNoActionPoints = new GlowFilter({distance: 10, outerStrength: 0, innerStrength: 0.5, color: 0xffff00, quality: 0.2});
const SelectedNoActionPoints = new GlowFilter({distance: 10, outerStrength: 1.5, innerStrength: 0.5, color: 0xffff00,quality: 0.2});