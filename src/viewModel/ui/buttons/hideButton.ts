import * as PIXI from 'pixi.js';

import { Button } from '../../GeneralAbstracts/Button';
import {width} from 'index';
import { InfoHideEvent } from 'controller/events/InfoHideEvent';

export class hideButton extends Button {
  
    constructor() {
      super({path: "hideButton", width: 25, height: 150},{xpos:width-25/2, ypos:525});
      this.pixiElemBg.angle = 180;
    }
  
    protected reaction(){
      InfoHideEvent.dispatch();
      this.pixiElemBg.angle += 180;
    }

  }