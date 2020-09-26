import * as PIXI from 'pixi.js';

import { Button } from '../../GeneralAbstracts/Button';
import { InfoHideEvent } from 'controller/events/InfoHideEvent';
import { width } from '../../../index';

export class HideButton extends Button {

  constructor() {
    super({ path: "hideButton", width: 25, height: 150 }, { xpos: width - 25 / 2, ypos: 525 });
    this.pixiElem.angle = 180;
  }

  protected reaction() {
    InfoHideEvent.dispatch();
    this.pixiElem.angle += 180;
  }

}