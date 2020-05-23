import { Monster } from "../Monster";
import { Position } from "../Position";
import { GameState } from "../../GameState";
import { HashMap } from "utils/HashMap";
import { ElementSignature } from "./Element";

export const getInitialMonsters = (): HashMap<number, Monster> => {
  const appleman = new Monster('appleman', new Position(2, 2), new ElementSignature(0,0,0,1,0));
  const flammie = new Monster('flammie', new Position(4, 1), new ElementSignature(0,1,0,0,0));
  const enemy = new Monster('spider', new Position(6, 6), new ElementSignature(0,0,0,0,0), false);
  const monsters = [appleman, flammie, enemy];
  const map = new HashMap<number, Monster>(k => String(k));
  monsters.forEach(monster => map.set(monster.id, monster));
  return map;
}

export const monsterAtPosition = (position: Position): number => {
  const monsterAtPosition = GameState.monsters.getEntries().find(entry => position.isEqual(entry.value.position));
  return monsterAtPosition?.key ?? -1;
}