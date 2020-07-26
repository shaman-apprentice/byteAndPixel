import * as PIXI from 'pixi.js';

import { Button } from '../../GeneralAbstracts/Button';
import {width,height} from 'index';

export class hideButton extends Button {
    pixiElem: PIXI.Container;
    pixiElemBg: PIXI.DisplayObject;
    button: PIXI.Text;
    hiddenContainer: PIXI.Container;
  
    constructor({otherContainer} : {otherContainer : PIXI.Container}) {
      super({path: "hideButton", width: 25, height: 150},{xpos:width/2-25/2, ypos:0});
      this.hiddenContainer = otherContainer;
    }
  
    protected reaction(){
      this.hiddenContainer.visible = false;
    }

  }