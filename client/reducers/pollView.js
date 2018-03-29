import { combineReducers } from 'redux';
import { GET_POLL_INFO } from '../actions/pollView';

function pollInfo(state = [], action) {
  switch (action.type) {
    case GET_POLL_INFO:
      return [...state, action.option];
    default:
      return state;
  }
}

const PollView = combineReducers({
  pollInfo,
});

export default PollView;
