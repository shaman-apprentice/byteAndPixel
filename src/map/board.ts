import { Terrain, types as terrainTypes } from './terrain';

export class Board {
  public board: Terrain[][];
  private size = 8;

  constructor() {
    this.board = createBoard(this.size);
  } 
}

const createBoard = (size: number) =>
  new Array(size).fill(0).map((_, y) =>
    new Array(size).fill(0).map((_, x) => new Terrain(randomTerrainType(), x, y))
  );

const randomTerrainType = (): string => {
  const keys = Object.keys(terrainTypes);
  const index = Math.floor(Math.random() * keys.length);
  return terrainTypes[keys[index]] as string;
};
