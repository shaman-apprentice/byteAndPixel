import { Monster, MonsterStats } from "../Monster";
import { Position } from "../Position";
import { GameState } from "../../GameState";
import { HashMap } from "utils/HashMap";
import { Element, ElementSignature } from "./Element";
import { Spider } from "viewModel/enemy/spider";
import { Cave } from "viewModel/enemy/cave";
import { Tile } from "viewModel/Tile";

export const monsterMap = (): HashMap<number, Monster> => {
  const map = new HashMap<number, Monster>(k => String(k));
  return map;
}

export const getInitialMonsters = (): HashMap<number, Monster> => {
  const appleman = new Monster('appleman', new Position(2, 2), applemanStats);
  const flammie = new Monster('flammie', new Position(4, 1), flammieStats);
  const penguin = new Monster('penguin', new Position(1, 1), penguinStats);
  const watchhog = new Monster('watchhog', new Position(1, 4), watchhogStats);
  const danjii = new Monster('danjii', new Position(2, 3), danjiiStats);
  const blorb = new Monster('blorb', new Position(5, 3), blorbStats);
  const snorx = new Monster('snorx', new Position(5, 2), snorxStats);
  const leefa = new Monster('leefa', new Position(0, 0), leefaStats);
  const coffy = new Monster('coffy', new Position(0, 3), coffyStats);
  const spider = new Spider('spider', new Position(6, 5), spiderStats);
  const kyromon = new Monster('kyromon', new Position(0, 1), kyromonStats);
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

export const tileAtPosition = (position: Position): Tile => {
  return GameState.map.tiles.get(position);
}

const danjiiStats: MonsterStats = new MonsterStats(ElementSignature.build(Element.Nature, 2), 8, 85, 2);
const blorbStats: MonsterStats = new MonsterStats(ElementSignature.build(Element.Nature, 2), 10, 65, 2);
const snorxStats: MonsterStats = new MonsterStats(ElementSignature.build(Element.Ice, 2), 6, 55, 2);
const leefaStats: MonsterStats = new MonsterStats(ElementSignature.build(Element.Nature, 3), 3, 45, 3);
const coffyStats: MonsterStats = new MonsterStats(ElementSignature.build(Element.Metal), 8, 100, 2);
const kyromonStats: MonsterStats = new MonsterStats(ElementSignature.build(Element.Ice, 2), 10, 60, 2);
const applemanStats: MonsterStats = new MonsterStats(ElementSignature.build(Element.Nature), 8, 50, 2);
const flammieStats: MonsterStats = new MonsterStats(ElementSignature.build(Element.Fire), 6, 55, 2);
const penguinStats: MonsterStats = new MonsterStats(ElementSignature.build(Element.Ice), 7, 60, 2);
const watchhogStats: MonsterStats = new MonsterStats(ElementSignature.build(Element.Earth), 10, 120, 1);

export const spiderStats: MonsterStats = new MonsterStats(ElementSignature.buildNeutral(), 3, 100, 1);
const caveStats: MonsterStats = new MonsterStats(ElementSignature.buildNeutral(), 10, 100, 1);