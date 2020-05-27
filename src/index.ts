import { Application } from 'pixi.js';
import { Ui } from './viewModel/ui';

const app = new Application({
  backgroundColor: 0x1099bb,
});

document.body.appendChild(app.view);
app.view.addEventListener('contextmenu', event => { 
  event.preventDefault();
}, false);

const ui = new Ui();

app.stage.addChild(ui.boardContainer);
app.stage.addChild(ui.statusContainer);
