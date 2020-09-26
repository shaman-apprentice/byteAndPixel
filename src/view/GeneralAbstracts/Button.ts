import * as PIXI from 'pixi.js';

import { GuiElemBg } from './GuiElemBg';

export abstract class Button extends GuiElemBg {

    button: PIXI.Text;

    constructor({path,width,height} : {path:string,width:number,height:number},{xpos,ypos} : {xpos:number,ypos:number}) {
        super({path: path, width: width, height: height});
        this.button = this.createButton();
        this.pixiElem.addChild(this.button);
        this.pixiElem.position.set(xpos, ypos);
    }

    private createButton() {
        const button = new PIXI.Text('');
        button.interactive = true;
        button.buttonMode = true;
        button.on("click", () => this.reaction())
        button.anchor.set(0.5,0.5);
        return button;
    }

    
    protected abstract reaction(): void


}