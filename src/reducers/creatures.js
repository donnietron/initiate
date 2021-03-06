import {combineReducers} from 'redux';
import _ from 'lodash';

const arrayMove = require('array-move');

const byId = (state = {}, action) => {
  switch(action.type) {
    case 'COUNTER_CREATE': {
      const creature = state[action.counter.creatureId];
      const creatureId = action.counter.creatureId;
      return {
        ...state,
        [creatureId]: {
          ...creature,
          counterIds: [
            ...creature.counterIds,
            action.counter.id
          ]
        }
      };
    }
    case 'COUNTER_DELETE': {
      const creature = state[action.counter.creatureId];
      const creatureId = action.counter.creatureId;
      return {
        ...state,
        [creatureId]: {
          ...creature,
          counterIds: _.difference(creature.counterIds, action.counter.id)
        }
      };
    }
    case 'CREATURE_CREATE': {
      const creature = action.creature;
      return {
        ...state,
        [creature.id]: creature
      };
    }
    case 'CREATURE_DELETE': {
      const creature = action.creature;
      return _.omit(state, creature.id);
    }
    default: {
      return state;
    }
  }
};

const allIds = (state = [], action) => {
  switch(action.type) {
    case 'CREATURE_CREATE': {
      return state.concat(action.creature.id);
    }
    case 'CREATURE_DELETE': {
      return _.remove(state, (creatureId) => {
          return creatureId !== action.creature.id;
        });
    }
    case 'CREATURE_REORDER': {
      const { previousIndex, nextIndex } = action;
      return arrayMove(state, previousIndex, nextIndex);
    }
    default: {
      return state;
    }
  }
};

export const creatures = combineReducers({
  byId,
  allIds
});
