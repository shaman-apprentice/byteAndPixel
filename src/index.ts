import * as PIXI from 'pixi.js';

import { Game } from './gameState';

const pixiApp = new PIXI.Application({
  backgroundColor: 0x1099bb,
  width: 80 * 8,
  height: 64 * 8,
});

document.body.appendChild(pixiApp.view);

let container = Game.state.boardContainer
Game.state.boardData.board.forEach(row =>
  row.forEach(terrain => container.addChild(terrain.sprite))
);
container.addChild(Game.state.dummymon.sprite);
pixiApp.stage.addChild(container);


pixiApp.ticker.add(() => {
  // game loop / should be 60 frames/s
});
