import { combineReducers } from 'redux';
import { GET_POLL_INFO, SET_OPEN_ROOMS } from '../actions/pollView';

function pollInfo(state = [], action) {
  switch (action.type) {
    case GET_POLL_INFO:
      return [action.option];
    default:
      return state;
  }
}

function openRooms(state = [], action) {
  switch (action.type) {
    case SET_OPEN_ROOMS:
      if (state.includes(action.rooms)) {
        return [
          ...state.slice(0, state.indexOf(action.rooms)),
          ...state.slice(state.indexOf(action.rooms) + 1),
        ];
      }
      return [...state, action.rooms];
    default:
      return state;
  }
}

const PollView = combineReducers({
  pollInfo,
  openRooms,
});

export default PollView;
