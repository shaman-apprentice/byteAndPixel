import { GameState } from '../../GameState'
import { Action } from './Action';
import { Monster } from 'viewModel/Monster';
import { Enemy } from 'viewModel/enemy/enemy';
import { Position } from "../../viewModel/Position";
import { ActionScheduler } from './ActionScheduler';
import { AiAction } from './AiAction';
import { StartTurnAction } from './StartTurnAction';
export class EndTurnAction extends Action {

  protected doAction() {
    ActionScheduler.schedule(new AiAction());
    ActionScheduler.schedule(new StartTurnAction());
  }

}