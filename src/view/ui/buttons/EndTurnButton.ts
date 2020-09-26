import { EndTurnAction } from '../../../controller/actions/EndTurnAction';
import { GameState } from '../../../GameState';
import { StateChangeEvent } from '../../../controller/events/StateChangeEvent';
import { Button } from '../../GeneralAbstracts/Button';

export class EndTurnButton extends Button {

  constructor() {
    super({path: "brownButton", width: 200, height: 50},{xpos:680, ypos:40});
    this.button.text = "End Turn 1";
    GameState.emitter.addEventListener(StateChangeEvent.type, () => this.update())
  }

  private update() {
    this.button.text = "End Turn " + GameState.turn;
  }

  protected reaction(){
    new EndTurnAction().execute()
  }


}