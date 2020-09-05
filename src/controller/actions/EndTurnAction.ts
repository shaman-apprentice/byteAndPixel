import { Action } from './Action';
import { AiAction } from './AiAction';
import { StartTurnAction } from './StartTurnAction';
export class EndTurnAction extends Action {

  protected async doAction() {
    await new AiAction().execute();
    await new StartTurnAction().execute();
  }

}