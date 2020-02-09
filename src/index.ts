import * as PIXI from 'pixi.js';

import { Board } from './map/board';
import { Dummymon } from './monsters/dummymon';

const pixiApp = new PIXI.Application({
  backgroundColor: 0x1099bb,
  width: 80 * 8,
  height: 64 * 8,
});

document.body.appendChild(pixiApp.view);

const board = new Board();
board.board.forEach(row =>
  row.forEach(terrain => pixiApp.stage.addChild(terrain.sprite))
);

pixiApp.stage.addChild(new Dummymon(0, 0).sprite);

pixiApp.ticker.add(() => {
  // each frame we spin the bunny around a bit
  // bunny.rotation += 0.01;
});
