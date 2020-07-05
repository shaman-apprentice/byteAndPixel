import { Monster } from "viewModel/Monster";

import { Position } from "../../viewModel/Position";

export interface Effect {
    applyEffect(monster: Monster, target: Position);
}