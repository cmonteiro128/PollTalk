import { combineReducers } from 'redux';
import { ADD_POLL_OPTION, CREATE_POLL } from '../actions/createPoll';

function pollOptions(state = [], action) {
  switch (action.type) {
    case ADD_POLL_OPTION:
      return [...state, action.option];
    default:
      return state;
  }
}

function obtainedPollID(state = '', action) {
  switch (action.type) {
    case CREATE_POLL:
      return action.pollID;
    default:
      return state;
  }
}

const CreatePoll = combineReducers({
  pollOptions,
  obtainedPollID,
});

export default CreatePoll;
