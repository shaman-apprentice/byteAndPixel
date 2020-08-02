import { GameState } from '../../GameState'
import { Action } from './Action';
import { Monster } from 'viewModel/Monster';
import { Skills } from 'viewModel/utils/skills';
import { SkillAction } from './SkillAction';
import { SkillType } from 'controller/skills/Skill';

export class StartTurnAction extends Action {

  protected doAction() {
    GameState.turn += 1;

    GameState.monsters.getValues().forEach(monster => {
      //use up remaining action points for rest action
      new SkillAction(monster, monster.position, monster.skillByType(SkillType.REST)).execute()
      
      if (GameState.turn - monster.lastFight > 2) {
        monster.hitPoints.add(1);
      }

      monster.actionPoints.setToMax();
      monster.energy.current += 2;
      
      if (monster.friendly) {
        this.handlehappiness(monster);
  
        this.handleexperiencePoints(monster);
      }
    });
  }

  private handleexperiencePoints(monster: Monster) {
    if (monster.experiencePoints.current == monster.experiencePoints.max) {
      monster.experiencePoints.current = 0;
      monster.learnSkill(Skills.baseSkills.get(monster.elements.getElement()));

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