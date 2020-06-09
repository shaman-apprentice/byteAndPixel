import { MonsterInfoBox } from './MonsterInfoBox';
import { GameState } from 'GameState';
import { StateChangeEvent } from 'controller/events/StateChangeEvent';
import { MouseHoverEvent } from 'controller/events/MouseHoverEvent';
import { monsterAtMousePosition } from 'viewModel/utils/monster';
export class HoverMonsterInfo extends MonsterInfoBox {
    pixiElem: PIXI.Container;
    textBox: PIXI.Text;
    constructor() {
        super();
        this.pixiElem.position.set(665, 505);
        this.setInfo(undefined);
        GameState.emitter.addEventListener(MouseHoverEvent.type, () => {
            this.setInfo(monsterAtMousePosition());
        })
        GameState.emitter.addEventListener(StateChangeEvent.type, (event : CustomEvent) => {
            this.setInfo(monsterAtMousePosition());
        })
    }
}
