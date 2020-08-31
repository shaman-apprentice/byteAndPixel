import { Action } from './Action';
import { AiAction } from './AiAction';
import { StartTurnAction } from './StartTurnAction';
export class EndTurnAction extends Action {

  protected doAction() {
    new AiAction().execute();
    new StartTurnAction().execute();
  }

}