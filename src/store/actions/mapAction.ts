import { Position } from '../../model/position'

export const TILE_CLICK = "TILE_CLICK";

export const createOnTileClickAction = (position: Position) => ({
  type: TILE_CLICK,
  position,
});
