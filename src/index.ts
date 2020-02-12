import { Application } from 'pixi.js';
import { GameController } from './controller/gameController'
import { Ui } from './view/ui';

const app = new Application({
  backgroundColor: 0x1099bb
});

document.body.appendChild(app.view);

let gameController = new GameController();
let gameState = gameController.initialState();
let ui = Ui.createUi(gameState);

app.stage.addChild(ui.boardContainer);
