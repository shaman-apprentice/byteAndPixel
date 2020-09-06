import { GameState } from '../../GameState'
import { Action } from './Action';
import { Monster } from 'viewModel/Monster';
import { Skills } from 'viewModel/utils/skills';
import { SkillAction } from './SkillAction';
import { SkillType } from 'controller/skills/Skill';

export class StartTurnAction extends Action {

  protected async doAction() {
    GameState.turn += 1;

    for (let monster of GameState.monsters.getValues()) {

      //use up remaining action points for rest action
      await new SkillAction(monster, monster.position, monster.skillByType(SkillType.REST)).execute()

      if (GameState.turn - monster.lastFight > 2) {
        monster.hitPoints.add(1);
      }

      monster.actionPoints.setToMax();
      monster.energy.current += 2;

      if (monster.friendly) {
        this.handlehappiness(monster);
        this.handleexperiencePoints(monster);
      }
    };
  }

  private handleexperiencePoints(monster: Monster) {
    if (monster.experiencePoints.current == monster.experiencePoints.max) {
      monster.experiencePoints.current = 0;
      const skills = Skills.skillsByElement.get(monster.elements.getElement());
      skills.find(skill => monster.learnSkill(skill));
    } else {
      monster.experiencePoints.current += 1;
    }
  }

  private handlehappiness(monster: Monster) {
    const elementalNeighborhood = GameState.map.getElementsInNeighborhood(monster.position);
    const unsatisfied = monster.elements.sub(elementalNeighborhood).magnitude()
    if (unsatisfied > 0) {
      monster.happiness.current -= unsatisfied;
    } else {
      monster.happiness.current += 2;
    }
  }

}