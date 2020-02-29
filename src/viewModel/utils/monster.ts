import { Monster } from "../Monster";
import { Position } from "../Position";
import { GameState } from "../../GameState";

export const getInitialMonsters = (): MonsterDict => {
  const appleman = new Monster('appleman', new Position(2, 2));
  const pixeldeer = new Monster('Pixeldeer', new Position(4, 1));
  return {
    [appleman.id]: appleman,
    [pixeldeer.id]: pixeldeer,
  };
}

export type MonsterDict = { [key: number]: Monster };

export const monsterAtPosition = (position: Position): number => {
  for (let [monsterId, monster] of Object.entries(GameState.monsters)) {
    if (position.isEqual(monster.position)) {
      return parseInt(monsterId);
    }
  }

  return -1;
}