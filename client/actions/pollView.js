import io from 'socket.io-client';
import store from '../store';
import fetch from 'isomorphic-unfetch';

// Actions for View Poll page
export const GET_POLL_INFO = 'GET_POLL_INFO';

export function getPollInfo(option) {
  return {
    type: GET_POLL_INFO,
    option,
  };
}

export function getPollInfoAsync(pollID) {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:5000/poll/${pollID}`, {
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
    });
    const json = await response.json();
    dispatch(getPollInfo(json));
  };
}

export function intiateSocket() {
  console.log('Socket Initializing');
  return (dispatch, getState) => {
    const socket = io('http://localhost:5000');
    const room = getState().PollView.pollInfo[0].result.pollID;
    socket.on('connect', (socket) => {
      socket.emit('room', room);
      socket.emit('pollid', room);
    });
  };
}
