import * as PIXI from 'pixi.js'

import { Application } from 'pixi.js';
import { Ui } from './viewModel/ui/ui';
import { MapMoveEvent } from 'controller/events/MapMoveEvent';

export const width = 800;
export const height = 600;

<<<<<<< HEAD
=======
const loader = PIXI.Loader.shared;

loader.add("brownButton", "Assets/Images/brownButton.png").add("parchment", "Assets/Images/parchment.png");

>>>>>>> 5bbe0c47bf57c72d9cb631ec0718a3e38e39754b
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
    case "ArrowLeft": MapMoveEvent.dispatch({ x: 40, y: 0 }); break;
    case "ArrowRight": MapMoveEvent.dispatch({ x: -40, y: 0 }); break;
    case "ArrowUp": MapMoveEvent.dispatch({ x: 0, y: 40 }); break;
    case "ArrowDown": MapMoveEvent.dispatch({ x: 0, y: -40 }); break;
  }
});


app.renderer.plugins.interaction.autoPreventDefault = true;

<<<<<<< HEAD
app.stage.addChild(ui.boardContainer);
app.stage.addChild(ui.middleGroundContainer);
app.stage.addChild(ui.statusContainer);
=======
loader.load();
loader.onComplete.add(() => {
  const ui = new Ui();
  app.stage.addChild(ui.boardContainer);
  app.stage.addChild(ui.middleGroundContainer);
  app.stage.addChild(ui.statusContainer);
})

>>>>>>> 5bbe0c47bf57c72d9cb631ec0718a3e38e39754b

