import { Monster, MonsterStats } from "../Monster";
import { Position } from "../Position";
import { GameState } from "../../GameState";
import { HashMap } from "utils/HashMap";
import { ElementSignature } from "./Element";

export const getInitialMonsters = (): HashMap<number, Monster> => {
  const appleman = new Monster('appleman', new Position(2, 2), applemanStats);
  const flammie = new Monster('flammie', new Position(4, 1), flammieStats);
  const spider = new Monster('spider', new Position(6, 6), spiderStats, false);
  const monsters = [appleman, flammie, spider];
  const map = new HashMap<number, Monster>(k => String(k));
  monsters.forEach(monster => map.set(monster.id, monster));
  return map;
}

export const monsterAtPosition = (position: Position): number => {
  const monsterAtPosition = GameState.monsters.getEntries().find(entry => position.isEqual(entry.value.position));
  return monsterAtPosition?.key ?? -1;
}

const applemanStats: MonsterStats = new MonsterStats(new ElementSignature(0,0,0,1,0), 8, 2);
const flammieStats: MonsterStats = new MonsterStats(new ElementSignature(0,1,0,0,0), 6, 2);
const spiderStats: MonsterStats = new MonsterStats(new ElementSignature(0,0,0,0,0), 5, 1);