 import { createStore, compose } from 'redux';

 import { GameState } from '../model/gameState'
 import { createMap } from '../model/map';
 import { Monster } from '../model/monster';

import { onTileClickReducer } from './reducers/mapReducer';
import { Position } from '../model/position';

const initialState: GameState = {
  map: createMap(8),
  monsters: getInitialMonsters(),
  selectedMonster: 0,
}
const initStateReducer = (state = initialState) => state

export const store = createStore(compose(
  initStateReducer,
  onTileClickReducer,
));

export const getSelectedMonster = (): Monster => {
  const state = store.getState();
  return state.monsters[state.selectedMonster];
}

function getInitialMonsters() {
  const appleman = new Monster('appleman', new Position(2, 2), 2);
  const pixeldeer = new Monster('Pixeldeer', new Position(4, 1), 2);
  return {
    [appleman.id]: appleman,
    [pixeldeer.id]: pixeldeer,
  };
}
