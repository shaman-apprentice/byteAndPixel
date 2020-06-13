import * as PIXI from 'pixi.js'

import { Application } from 'pixi.js';
import { Ui } from './viewModel/ui/ui';
import { MapMoveEvent } from 'controller/events/MapMoveEvent';

export const width = 800;
export const height = 600;

const loader = PIXI.Loader.shared;

loader.add("brownButton", "Assets/Images/brownButton.png").add("StatusBackground", "Assets/Images/StatusBackground.png")
.add("baum1", "Assets/Images/Terrain/Nature-features/baum1.png")
.add("baum2", "Assets/Images/Terrain/Nature-features/baum2.png")
.add("baum3", "Assets/Images/Terrain/Nature-features/baum3.png")
.add("baum4", "Assets/Images/Terrain/Nature-features/baum4.png")
.add("baum5", "Assets/Images/Terrain/Nature-features/baum5.png")
.add("baum6", "Assets/Images/Terrain/Nature-features/baum6.png")
.add("nature", "Assets/Images/Terrain/Nature.png")

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

loader.load();
loader.onComplete.add(() => {
  download_sprite_as_png(app.renderer, createForest(), `nature${randomInt(1000)}.png`)
  const ui = new Ui();
  app.stage.addChild(ui.boardContainer);
  app.stage.addChild(ui.middleGroundContainer);
  app.stage.addChild(ui.statusContainer);
})

function createForest() {

  const treeNumber = 100;
  const leftMargin = 10;
  const rightMargin = 4;
  const topMargin = 20;
  const bottomMargin = 4;

  const container = new PIXI.Container();
  container.addChild(PIXI.Sprite.from("nature"));
  const hexagon = new PIXI.Polygon([0, 15, 0, 64, 30, 79, 33, 79, 63, 64, 63, 15, 33, 0, 30, 0]);
  const textures = ["baum1", "baum2", "baum3", "baum4", "baum5", "baum6"].map((string) => PIXI.Texture.from(string));

  var coords = [];
  for (var i = 0; i < treeNumber; i++) {
    coords.push({x: randomInt(64), y: randomInt(64)});
  }

  coords = coords.filter((pos) => hexagon.contains(pos.x - rightMargin, pos.y - bottomMargin) && hexagon.contains(pos.x + leftMargin, pos.y + topMargin));

  coords.sort((a,b) => b.y - a.y);

  coords.forEach(coord => {
    const sprite = PIXI.Sprite.from(textures[randomInt(textures.length)]);
    sprite.position.set(-coord.x, -coord.y);
    container.addChild(sprite);
  })

  return container;
}

function randomInt(to: number): number {
  return Math.floor(Math.random() * to);
}

function download_sprite_as_png(renderer, sprite, fileName) {
	renderer.extract.canvas(sprite).toBlob(function(b){
		var a = document.createElement('a');
		document.body.append(a);
		a.download = fileName;
		a.href = URL.createObjectURL(b);
		a.click();
		a.remove();
	}, 'image/png');
}


