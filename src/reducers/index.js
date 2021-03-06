import {combineReducers} from 'redux';
import {counters} from './counters';
import {creatures} from './creatures';
import {stateManagement} from './stateManagement';

export default function (state, action) {
  return stateManagement(state, action, combineReducers({
    counters,
    creatures
  }));
}
