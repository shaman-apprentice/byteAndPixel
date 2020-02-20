import { Monster } from "../Monster";
import { Position } from "../Position";

export const getInitialMonsters = (): MonsterDict => {
  const appleman = new Monster('appleman', new Position(2, 2));
  const pixeldeer = new Monster('Pixeldeer', new Position(4, 1));
  return {
    [appleman.id]: appleman,
    [pixeldeer.id]: pixeldeer,
  };
}

export type MonsterDict = {[key: number]: Monster};