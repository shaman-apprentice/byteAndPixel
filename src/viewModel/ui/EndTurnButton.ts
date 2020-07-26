// import * as PIXI from 'pixi.js';

// import { EndTurnAction } from '../../controller/actions/EndTurnAction';
// import { GameState } from '../../GameState';
// import { StateChangeEvent } from '../../controller/events/StateChangeEvent';
// import { Button } from '../GeneralAbstracts/Button';

// export class EndTurnButton extends Button {
//   pixiElem: PIXI.Container;
//   pixiElemBg: PIXI.DisplayObject;
//   button: PIXI.Text;

//   constructor() {
//     super({path: "brownButton"});
//     GameState.emitter.addEventListener(StateChangeEvent.type, () => this.update())
//   }

//   protected update() {
//     this.button.text = "End Turn " + GameState.turn;
//   }


// }