import { Application } from 'pixi.js';
import { Ui } from './viewModel/ui';
import { Position } from './viewModel/Position';

// https://github.com/shaman-apprentice/pack-mule
import { PMap } from '@shaman-apprentice/pack-mule'

const app = new Application({
  backgroundColor: 0x1099bb
});

document.body.appendChild(app.view);

const ui = new Ui();

app.stage.addChild(ui.boardContainer);
app.stage.addChild(ui.statusContainer);

const m = new PMap<Position, number>();
const p = new Position(1, 2);
m.add(p, 9001);
console.log(m.get(p));
