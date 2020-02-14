import * as PIXI from 'pixi.js';
import { GameState } from "../model/gameState";
import { Monster } from '../model/monster';

export class DetailView {
    textBox: PIXI.Text;

    constructor(state: GameState, container: PIXI.Container) {
        let selectedMonster = state.monsters[state.currentMonster];
        this.createText(container);
        this.updateText(selectedMonster);
    }

    createText(container: PIXI.Container) {
        this.textBox = new PIXI.Text("Hallo Welt");
        this.textBox.position.set(20, 500);
        container.addChild(this.textBox);

    }

    updateText(monster: Monster) {
        this.textBox.text = this.getMonsterInformation(monster);
    }

    private getMonsterInformation(monster: Monster): string {
        return "name: " + monster.name + "\n" + "actionPoints: " + monster.actionPoints + "/2";
    }

    update(state: GameState) {
        let selectedMonster = state.monsters[state.currentMonster];
        this.updateText(selectedMonster);
    }
}