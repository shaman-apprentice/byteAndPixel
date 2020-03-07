import { monsterAtPosition } from "../viewModel/utils/monster";
import { GameState } from "../GameState";
import { SelectedMonsterChangeAction } from "./SelectedMonsterChangeAction";
import { AttackAction } from "./AttackAction";
import { isAdjacent } from "../viewModel/utils/map";
import { ChangeTileSlimeAction } from "./ChangeTileSlimeAction";
import { MoveAction } from "./MoveAction";
import { Position } from "../viewModel/Position";

export const tileClicked = (position: Position) => {
    
        const clickedMonsterId = monsterAtPosition(position);
        if (clickedMonsterId !== -1) {
          const clickedMonster = GameState.monsters[clickedMonsterId];
          if (clickedMonster.friendly) {
            new SelectedMonsterChangeAction(clickedMonsterId).execute();
          } else {
            new AttackAction(GameState.selectedMonster, position).execute();
          }
          return;
        }
            
        const selectedMonster = GameState.monsters[GameState.selectedMonster];
        const selectedTile = GameState.map.tiles[position.x][position.y];
        if (isAdjacent(position, selectedMonster.position) && selectedTile.slimed) {
          new ChangeTileSlimeAction(GameState.selectedMonster, position, false).execute();
        } else {
          new MoveAction(selectedMonster.id, position).execute();
        }
    
}