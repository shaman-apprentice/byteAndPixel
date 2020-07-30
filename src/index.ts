import * as PIXI from 'pixi.js'

import { Application } from 'pixi.js';
import { Ui } from './viewModel/ui/ui';
import { handleKeyPress } from 'viewModel/utils/HotKeyManager';
import { GameState } from 'GameState';

export const width = 800;
export const height = 600;

const loader = PIXI.Loader.shared;

loader.add("brownButton", "Assets/Images/brownButton.png").add("BgBox", "Assets/Images/bgbox.png").add("hideButton", "Assets/Images/hideButton.png");

const app = new Application({
  backgroundColor: 0x1099bb,
  width: width,
  height: height
});

document.body.appendChild(app.view);
app.view.addEventListener('contextmenu', event => {
  event.preventDefault();
}, false);

document.addEventListener('keydown', (event) => { handleKeyPress(event.key) });


app.renderer.plugins.interaction.autoPreventDefault = true;

loader.load();
loader.onComplete.add(() => {
  const ui = new Ui();
  app.stage.addChild(ui.boardContainer);
  app.stage.addChild(ui.middleGroundContainer);
  app.stage.addChild(ui.statusContainer);

  GameState.selectedMonster = GameState.monsters.getValues()[0];
})


