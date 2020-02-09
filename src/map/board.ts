import {
  Terrain,
  Type as TerrainType,
  terrainWidth,
  terrainHeight
} from './terrain';

export class Board {
  public board: Terrain[][];

  constructor() {
    this.board = createBoard(8);
  }
}

const createBoard = (size: number) => {
  const board: Terrain[][] = [];
  let yOffset = 0;

  for (let y = 0; y < size; y++) {
    const row: Terrain[] = [];

    const xOffset = y % 2 === 0 ? terrainWidth / 2 : 0;
    const yPosi = y * terrainHeight + yOffset;

    for (let x = 0; x < size; x++) {
      const xPosi = x * terrainWidth + xOffset;
      row.push(new Terrain(randomTerrainType(), xPosi, yPosi));
    }

    board.push(row);
    yOffset -= 15;
  }

  return board;
};

const randomTerrainType = (): TerrainType => {
  const terrainTypes = Object.keys(TerrainType);
  const index = Math.floor(Math.random() * terrainTypes.length);
  return terrainTypes[index] as TerrainType;
};
