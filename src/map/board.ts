import { Terrain, Type as TerrainType } from './terrain';

export class Board {
  public board: Terrain[][];

  constructor() {
    this.board = createBoard(8);
  }
}

const createBoard = (size: number) => {
  const board: Terrain[][] = [];

  for (let y = 0; y < size; y++) {
    const row: Terrain[] = [];
    for (let x = 0; x < size; x++) {
      row.push(new Terrain(randomTerrainType(), x, y));
    }

    board.push(row);
  }

  return board;
};

const randomTerrainType = (): TerrainType => {
  const terrainTypes = Object.keys(TerrainType);
  const index = Math.floor(Math.random() * terrainTypes.length);
  return terrainTypes[index] as TerrainType;
};
