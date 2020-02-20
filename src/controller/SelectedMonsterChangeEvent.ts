import { GameState} from "../GameState"

export class SelectedMonsterChangeEvent extends CustomEvent<number> {
  static type = 'SelectedMonsterChangEventType';

  static dispatch(newSelectedMonsterId: number) {
    GameState.selectedMonster = newSelectedMonsterId;
    GameState.emitter.dispatchEvent(new SelectedMonsterChangeEvent(newSelectedMonsterId));
  }

  constructor(newSelectedMonsterId: number) {
    super(SelectedMonsterChangeEvent.type, {
      detail: newSelectedMonsterId,
    });
  }
}
