import io from 'socket.io-client';
import fetch from 'isomorphic-unfetch';

// Actions for View Poll page
export const GET_POLL_INFO = 'GET_POLL_INFO';
export const SET_OPEN_ROOMS = 'SET_OPEN_ROOMS';

export function getPollInfo(option) {
  console.log(option);
  return {
    type: GET_POLL_INFO,
    option,
  };
}

export function setOpenRooms(rooms) {
  console.log(rooms);
  return {
    type: SET_OPEN_ROOMS,
    rooms,
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

const socket = io('http://localhost:5000');

export function intiateSocket() {
  return (dispatch, getState) => {
    console.log('Socket Initializing');
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

export function vote(option) {
  return (dispatch, getState) => {
    const room = getState().PollView.pollInfo[0].result.pollID;
    socket.emit('vote', { room, option });
    console.log({ option, room });
  };
}

export function addChat(option, name, message) {
  return (dispatch, getState) => {
    const room = getState().PollView.pollInfo[0].result.pollID;
    socket.emit('chat', {
      room,
      option,
      name,
      message,
    });
  };
}

export function openCloseChat(index) {
  return (dispatch, getState) => {
    const rooms = getState().PollView.openRooms;
    if (rooms.includes(index)) {
      // rooms.splice(rooms.indexOf(index), 1);
      dispatch(setOpenRooms(index));
    } else {
      // rooms.push(index);
      dispatch(setOpenRooms(index));
    }
  };
}
