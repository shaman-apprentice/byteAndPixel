import { HashMap } from "utils/HashMap";
import { Spider } from "model/enemy/spider";
import { Cave } from "model/enemy/cave";
import { Tile } from "model/Tile";
import { TilePosition } from "model/TilePosition";
import { Monster } from "model/Monster";
import { GameState } from "GameState";
import { Element, ElementSignature } from "model/Element";
import { ViewState } from "ViewState";
import { BaseStats } from "model/modifiers";

export class Monsters extends HashMap<number, Monster> {
  constructor() {
    super((id => id.toString()));
  }

  deepClone() {
    const clone: Monsters = new Monsters();
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
  monsters.forEach(monster => {
    // we want hitpoints and energy to be full at the start of the game but they are subject to modifiers
    monster.onStateChange();
    monster.hitPoints.setToMax();
    monster.energy.setToMax();
  })
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

const danjiiStats: BaseStats = new BaseStats(ElementSignature.build(Element.Nature, 2), 5, 3, 7,);
const blorbStats: BaseStats = new BaseStats(ElementSignature.build(Element.Nature, 2), 3, 5, 7);
const snorxStats: BaseStats = new BaseStats(ElementSignature.build(Element.Ice, 2), 3, 7, 5);
const leefaStats: BaseStats = new BaseStats(ElementSignature.build(Element.Nature, 3), 5, 5, 5);
const coffyStats: BaseStats = new BaseStats(ElementSignature.build(Element.Metal), 3, 4, 8);
const kyromonStats: BaseStats = new BaseStats(ElementSignature.build(Element.Ice, 2), 4, 6, 6);
const applemanStats: BaseStats = new BaseStats(ElementSignature.build(Element.Nature), 4, 4, 6);
const flammieStats: BaseStats = new BaseStats(ElementSignature.build(Element.Fire), 3, 8, 4);
const penguinStats: BaseStats = new BaseStats(ElementSignature.build(Element.Ice), 6, 4, 5);
const watchhogStats: BaseStats = new BaseStats(ElementSignature.build(Element.Earth), 8, 3, 4);

export const spiderStats: BaseStats = new BaseStats(ElementSignature.buildNeutral(), 2, 2, 2, 1, 1, 10, 2, 1);
const caveStats: BaseStats = new BaseStats(ElementSignature.buildNeutral(), 5, 5, 5, 12, 0, 50, 0, 1);