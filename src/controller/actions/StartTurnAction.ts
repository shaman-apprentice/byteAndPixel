import { GameState } from '../../GameState'
import { Action } from './Action';
import { Skills } from 'controller/skills';
import { SkillAction } from './SkillAction';
import { SkillType } from 'controller/skills/Skill';
import { Monster } from 'model/Monster';

export class StartTurnAction extends Action {

  protected async doAction() {
    GameState.turn += 1;

    for (let monster of GameState.monsters.getValues()) {

      //use up remaining action points for rest action
      await new SkillAction(monster, monster.position, monster.skillByType(SkillType.REST)).execute();

      monster.onTurnStart();

    };
  }
}