import { Application } from 'pixi.js';
import { Ui } from './view/ui';
import { StateController } from './controller/stateController';

const app = new Application({
  backgroundColor: 0x1099bb
});

document.body.appendChild(app.view);

let stateController = StateController.getInstance();
let ui = Ui.getInstance();
ui.createUi(stateController.store.getState());

app.stage.addChild(ui.boardContainer);
app.stage.addChild(ui.guiContainer);
