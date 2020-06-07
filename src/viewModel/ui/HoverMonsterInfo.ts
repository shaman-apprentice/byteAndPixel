import { MonsterInfoBox } from './MonsterInfoBox';
import { GameState } from 'GameState';
import { MonsterHoverEvent } from 'controller/events/MonsterHoverEvent';
import { Monster } from 'viewModel/Monster';
import { StateChangeEvent } from 'controller/events/StateChangeEvent';
export class HoverMonsterInfo extends MonsterInfoBox {
    pixiElem: PIXI.Container;
    textBox: PIXI.Text;
    private current: Monster = undefined;
    constructor() {
        super();
        this.pixiElem.position.set(665, 505);
        this.setInfo(undefined);
        GameState.emitter.addEventListener(MonsterHoverEvent.type, (event : CustomEvent) => {
            this.current = GameState.monsters.get(event.detail)
            this.setInfo(this.current);
        })
        GameState.emitter.addEventListener(StateChangeEvent.type, (event : CustomEvent) => {
            this.setInfo(this.current);
        })
    }
}
