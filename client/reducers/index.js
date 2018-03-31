import { combineReducers } from 'redux';
import CreatePoll from './createPoll';
import PollView from './pollView';

const rootReducer = combineReducers({
  CreatePoll,
  PollView,
});
export default rootReducer;
