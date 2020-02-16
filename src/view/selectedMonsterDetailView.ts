import * as PIXI from 'pixi.js';

import { store, getSelectedMonster } from '../store/store';

export class SelectedMonsterDetailView {
  textBox: PIXI.Text;

  constructor() {
    this.textBox = this.createTextBox();
    this.setInfo();
    store.subscribe(() => {
      this.setInfo();
    })
  }

  private createTextBox() {
    const textBox = new PIXI.Text('');
    textBox.position.set(20, 500);
    return textBox;
  }

  private setInfo() {
    const sm = getSelectedMonster();
    this.textBox.text = `name: ${sm.name} \naction-points: ${sm.actionPoints}/2`;
  }
}