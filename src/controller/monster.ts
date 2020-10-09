import { HashMap } from "utils/HashMap";
import { Spider } from "model/enemy/spider";
import { Cave } from "model/enemy/cave";
import { Tile } from "model/Tile";
import { TilePosition } from "model/TilePosition";
import { Monster, MonsterStats } from "model/Monster";
import { GameState } from "GameState";
import { Element, ElementSignature } from "model/Element";
import { ViewState } from "ViewState";

export class Monsters extends HashMap<number, Monster> {
  constructor() {
    super((id => id.toString()));
  }

  deepClone() {
    const clone : Monsters = new Monsters();
    this.getEntries().forEach(monster => clone.set(monster.key, monster.value.deepClone()));
    return clone;
  }
}

export const getInitialMonsters = (): Monsters => {
  const appleman = Monster.fromStats('appleman', new TilePosition(2, 2), applemanStats);
  const flammie = Monster.fromStats('flammie', new TilePosition(4, 1), flammieStats);
  const penguin = Monster.fromStats('penguin', new TilePosition(1, 1), penguinStats);
  const watchhog = Monster.fromStats('watchhog', new TilePosition(1, 4), watchhogStats);
  const danjii = Monster.fromStats('danjii', new TilePosition(2, 3), danjiiStats);
  const blorb = Monster.fromStats('blorb', new TilePosition(5, 3), blorbStats);
  const snorx = Monster.fromStats('snorx', new TilePosition(5, 2), snorxStats);
  const leefa = Monster.fromStats('leefa', new TilePosition(0, 0), leefaStats);
  const coffy = Monster.fromStats('coffy', new TilePosition(0, 3), coffyStats);
  const spider = Spider.fromStats('spider', new TilePosition(6, 5), spiderStats);
  const kyromon = Monster.fromStats('kyromon', new TilePosition(0, 1), kyromonStats);
  const cave = Cave.fromStats('cave', new TilePosition(6, 6), caveStats);
  const cave2 = Cave.fromStats('cave', new TilePosition(11, 6), caveStats);
  const cave3 = Cave.fromStats('cave', new TilePosition(6, 11), caveStats);
  const monsters = [appleman, flammie, penguin, watchhog, spider, cave, cave2, cave3];
  const map = new Monsters();
  monsters.forEach(monster => map.set(monster.id, monster));
  return map;
}

export const monsterAtMousePosition = (): Monster => {
  const position = ViewState.mousePosition;
  if (!position) {
    return undefined;
  }
  return monsterAtPosition(position);
}

export const monsterAtPosition = (position: TilePosition): Monster | undefined => {
  const monsterAtPosition = GameState.monsters.getEntries().find(entry => position.isEqual(entry.value.position));
  return monsterAtPosition?.value;
}

export const tileAtPosition = (position: TilePosition): Tile => {
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