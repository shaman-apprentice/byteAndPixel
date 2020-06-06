import { Application } from 'pixi.js';
import { Ui } from './viewModel/ui/ui';
import { MapMoveEvent } from 'controller/events/MapMoveEvent';

export const width = 800;
export const height = 600;

const app = new Application({
  backgroundColor: 0x1099bb,
  width: width,
  height: height
});

document.body.appendChild(app.view);
app.view.addEventListener('contextmenu', event => { 
  event.preventDefault();
}, false);

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case "ArrowLeft": MapMoveEvent.dispatch({x:40,y:0}); break;
    case "ArrowRight": MapMoveEvent.dispatch({x:-40,y:0}); break;
    case "ArrowUp": MapMoveEvent.dispatch({x:0,y:40}); break;
    case "ArrowDown": MapMoveEvent.dispatch({x:0,y:-40}); break;
  }});
  

app.renderer.plugins.interaction.autoPreventDefault = true;
const ui = new Ui();

app.stage.addChild(ui.boardContainer);
app.stage.addChild(ui.middleGroundContainer);
app.stage.addChild(ui.statusContainer);

