const terrainWidth = 64;
const terrainHeight = 80;

export const yIndex2YPosi = (y: number) =>
  y * terrainHeight + (y === 0 ? 0 : -15 * y);
export const xIndex2XPosi = (x: number, y: number) =>
  x * terrainWidth + (y % 2 === 0 ? terrainWidth / 2 : 0);
 
export const isAdjacent = (
  x1: number, y1: number, x2: number, y2: number
) => {
  const neighbors =  y1 % 2 === 1 
    ? [
      [x1 - 1, y1 - 1],
      [x1, y1 - 1],
      [x1 + 1, y1],
      [x1, y1 + 1],
      [x1 - 1 , y1 + 1],
      [x1 - 1, y1],
    ]
    : [
      [x1, y1 - 1],
      [x1 + 1, y1 - 1],
      [x1 + 1, y1],
      [x1 + 1, y1 + 1],
      [x1, y1 + 1],
      [x1 - 1, y1],
    ];
  const neighbor = neighbors.find(([x, y]) => x === x2 && y === y2);
  return Boolean(neighbor);
};