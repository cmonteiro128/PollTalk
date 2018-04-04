import io from 'socket.io-client';
import fetch from 'isomorphic-unfetch';

// Actions for View Poll page
export const GET_POLL_INFO = 'GET_POLL_INFO';

export function getPollInfo(option) {
  console.log(option);
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
    console.log(json);
  };
}

export function intiateSocket() {
  return (dispatch, getState) => {
    console.log('Socket Initializing');
    const socket = io('http://localhost:5000');
    const room = getState().PollView.pollInfo[0].result.pollID;
    socket.on('connect', () => {
      socket.emit('join', { room, message: 'Test' });
      socket.emit('pollid', room);
      socket.on('new_Data', (data) => {
        dispatch(getPollInfo(data));
        console.log(data);
      });
    });
  };
}
