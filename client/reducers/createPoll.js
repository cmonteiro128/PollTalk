import { combineReducers } from 'redux';
import { ADD_POLL_OPTION } from '../actions/createPoll';

function pollOptions(state = [], action) {
  switch (action.type) {
    case ADD_POLL_OPTION:
      return [...state, action.option];
    default:
      return state;
  }
}

const CreatePoll = combineReducers({
  pollOptions,
});

export default CreatePoll;
