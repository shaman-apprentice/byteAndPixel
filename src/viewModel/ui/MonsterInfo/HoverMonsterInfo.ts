import { MonsterInfoBox } from './MonsterInfoBox';
import { GameState } from 'GameState';
import { StateChangeEvent } from 'controller/events/StateChangeEvent';
import { MouseHoverEvent } from 'controller/events/MouseHoverEvent';
import { monsterAtMousePosition } from 'viewModel/utils/monster';
import { InfoHideEvent } from 'controller/events/InfoHideEvent';
export class HoverMonsterInfo extends MonsterInfoBox {

    textBox: PIXI.Text;

    constructor() {
        super();
        this.pixiElem.visible = false;
        this.setInfo(undefined);
        GameState.emitter.addEventListener(InfoHideEvent.type, () => {
            this.isHidden = !this.isHidden;
        });
        GameState.emitter.addEventListener(MouseHoverEvent.type, () => {
            const hoveredMonster = monsterAtMousePosition();
            if (!this.isHidden && hoveredMonster) {
                this.setInfo(monsterAtMousePosition());
                this.pixiElem.visible = true;
            }
            else
                this.pixiElem.visible = false;
        })
    }
}
