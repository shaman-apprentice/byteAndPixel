 import { createStore, compose } from 'redux';

 import { GameState } from '../model/gameState'
 import { createMap } from '../model/map';
 import { Monster } from '../model/monster';

import { onTileClickReducer } from './reducers/mapReducer';

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

 function getInitialMonsters() {
  const appleman = new Monster('appleman', {x: 2, y: 2}, 2);
  const pixeldeer = new Monster('Pixeldeer', {x: 4, y: 1}, 2);
  return {
    [appleman.id]: appleman,
    [pixeldeer.id]: pixeldeer,
  };
}
