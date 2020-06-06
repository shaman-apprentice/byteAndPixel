import { MonsterInfoBox } from './MonsterInfoBox';
import { GameState } from 'GameState';
import { MonsterHoverEvent } from 'controller/events/MonsterHoverEvent';
export class HoverMonsterInfo extends MonsterInfoBox {
    pixiElem: PIXI.Container;
    textBox: PIXI.Text;
    constructor() {
        super();
        this.pixiElem.position.set(665, 505);
        this.setInfo(undefined);
        GameState.emitter.addEventListener(MonsterHoverEvent.type, (event : CustomEvent) => {
            this.setInfo(GameState.monsters.get(event.detail));
        })
    }
}
