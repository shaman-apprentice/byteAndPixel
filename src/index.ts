import * as PIXI from 'pixi.js';

import { gameState } from './gameState';

const pixiApp = new PIXI.Application({
  backgroundColor: 0x1099bb,
  width: 80 * 8,
  height: 64 * 8,
});

document.body.appendChild(pixiApp.view);

gameState.board.board.forEach(row =>
  row.forEach(terrain => pixiApp.stage.addChild(terrain.sprite))
);
pixiApp.stage.addChild(gameState.dummymon.sprite);

pixiApp.ticker.add(() => {
  // game loop / should be 60 frames/s
});
