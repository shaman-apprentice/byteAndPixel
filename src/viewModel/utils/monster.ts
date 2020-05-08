import { Monster } from "../Monster";
import { Position } from "../Position";
import { GameState } from "../../GameState";
import { PMap } from "@shaman-apprentice/pack-mule";

export const getInitialMonsters = (): PMap<number, Monster> => {
  const appleman = new Monster('appleman', new Position(2, 2));
  const flammie = new Monster('flammie', new Position(4, 1));
  const enemy = new Monster('Dummymon', new Position(6, 6), false);
  const monsters = [appleman, flammie, enemy];
  const map = new PMap<number, Monster>();
  monsters.forEach(monster => map.set(monster.id, monster));
  return map;
}

export const monsterAtPosition = (position: Position): number => {
  const monsterAtPosition = GameState.monsters.toList().find(entry => position.isEqual(entry.value.position));
  return monsterAtPosition?.key ?? -1;
}