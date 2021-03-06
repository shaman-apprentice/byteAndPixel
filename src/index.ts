import * as PIXI from 'pixi.js'
import * as Sound from 'pixi-sound'

import { Application } from 'pixi.js';
import { Ui } from './view/ui/ui';
import { handleKeyPress } from 'controller/HotKeyManager';
import { GameState } from 'GameState';

export const width = 800;
export const height = 600;

const loader = PIXI.Loader.shared;

loader.add("brownButton", "Assets/Images/brownButton.png").add("BgBox", "Assets/Images/bgbox.png").add("hideButton", "Assets/Images/hideButton.png");
Sound.default.add("step", "Assets/Sound/step.wav")
Sound.default.add("swing", "Assets/Sound/swing.wav")
Sound.default.add("impact", "Assets/Sound/impact.wav")

const app = new Application({
  backgroundColor: 0x1099bb,
  width: width,
  height: height
});

document.body.appendChild(app.view);
app.view.addEventListener('contextmenu', event => {
  event.preventDefault();
}, false);

//tell the window to ignore certain keys
window.addEventListener("keydown", function(e) {
  //arrow keys
  if(["ArrowUp", "ArrowLeft", "ArrowRight", "ArrowDown"].indexOf(e.key) > -1) {
      e.preventDefault();
  }
}, false);

document.addEventListener('keydown', (event) => { handleKeyPress(event.key, event.shiftKey, event.ctrlKey) });


app.renderer.plugins.interaction.autoPreventDefault = true;

loader.load();
loader.onComplete.add(() => {
  Ui.build();
  app.stage.addChild(Ui.boardContainer);
  app.stage.addChild(Ui.middleGroundContainer);
  app.stage.addChild(Ui.statusContainer);

  GameState.selectedMonster = GameState.monsters.getValues()[0];
})