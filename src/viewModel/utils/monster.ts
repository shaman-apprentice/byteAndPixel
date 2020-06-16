import { Monster, MonsterStats } from "../Monster";
import { Position } from "../Position";
import { GameState } from "../../GameState";
import { HashMap } from "utils/HashMap";
import { ElementSignature } from "./Element";
import { Spider } from "viewModel/enemy/spider";
import { Cave } from "viewModel/enemy/cave";

export const monsterMap = (): HashMap<number, Monster> => {
  const map = new HashMap<number, Monster>(k => String(k));
  return map;
}

export const getInitialMonsters = (): HashMap<number, Monster> => {
  const appleman = new Monster('appleman', new Position(2, 2), applemanStats);
  const flammie = new Monster('flammie', new Position(4, 1), flammieStats);
  const penguin = new Monster('penguin', new Position(1, 1), penguinStats);
  const watchhog = new Monster('watchhog', new Position(1, 4), watchhogStats);
  const danjii = new Monster('danjii', new Position(2,3), danjiiStats);
  const leefa = new Monster('leefa', new Position(0,0),leefaStats);
  const coffy = new Monster('coffy',new Position(0,3),coffyStats);
  const spider = new Spider('spider', new Position(6, 5), spiderStats);
  const kyromon = new Monster('kyromon', new Position(0,1), kyromonStats);
  const cave = new Cave('cave', new Position(6, 6), caveStats);
  const cave2 = new Cave('cave', new Position(11, 6), caveStats);
  const cave3 = new Cave('cave', new Position(6, 11), caveStats);
  const monsters = [appleman, flammie, penguin, watchhog, spider, cave, cave2, cave3];
  const map = new HashMap<number, Monster>(k => String(k));
  monsters.forEach(monster => map.set(monster.id, monster));
  return map;
}

export const monsterAtMousePosition = (): Monster => {
  const position = GameState.mousePosition;
  if (!position) {
    return undefined;
  }
  return monsterAtPosition(position);
}

export const monsterAtPosition = (position: Position): Monster => {
  const monsterAtPosition = GameState.monsters.getEntries().find(entry => position.isEqual(entry.value.position));
  return monsterAtPosition?.value;
}

export const monsterIdAtPosition = (position: Position): number => {
  return monsterAtPosition(position)?.id ?? -1;
}

const applemanStats: MonsterStats = new MonsterStats(new ElementSignature(0,0,0,1,0), 8, 2);
const flammieStats: MonsterStats = new MonsterStats(new ElementSignature(0,1,0,0,0), 6, 2);
const penguinStats: MonsterStats = new MonsterStats(new ElementSignature(0,0,1,0,0), 7, 2);
const watchhogStats: MonsterStats = new MonsterStats(new ElementSignature(1,0,0,0,0), 10, 1);
const danjiiStats: MonsterStats = new MonsterStats(new ElementSignature(0,0,0,2,0), 8, 2);
const leefaStats: MonsterStats = new MonsterStats(new ElementSignature(0,0,0,3,0),1,3);
const coffyStats: MonsterStats = new MonsterStats(new ElementSignature(0,0,0,0,1), 8,2);
const kyromonStats: MonsterStats = new MonsterStats(new ElementSignature(0,0,2,0,0), 3, 3);
export const spiderStats: MonsterStats = new MonsterStats(new ElementSignature(0,0,0,0,0), 3, 1);
const caveStats: MonsterStats = new MonsterStats(new ElementSignature(0,0,0,0,0), 10, 1);