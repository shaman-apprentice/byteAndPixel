import { GameState } from '../GameState'

export class EndTurnEvent extends CustomEvent<{turn: number}> {
  static type = "EndTurnEventType";

  static dispatch() {
    GameState.turn += 1;

    let monsters = GameState.monsters;
    for (let monster of Object.values(monsters)) {
      monster.actionPoints = 2;
    }

    GameState.emitter.dispatchEvent(new EndTurnEvent(GameState.turn));
  }

  constructor(turn: number) {
    super(EndTurnEvent.type,  {detail : {
      turn: turn
    }})
  }

}