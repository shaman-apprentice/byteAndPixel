import { Application } from 'pixi.js';
import { Ui } from './view/ui';

const app = new Application({
  backgroundColor: 0x1099bb
});

document.body.appendChild(app.view);

const ui = new Ui();

app.stage.addChild(ui.boardContainer);
// app.stage.addChild(ui.guiContainer);
