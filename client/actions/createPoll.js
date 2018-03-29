import Router from 'next/router';

// Actions for Create Poll page
export const ADD_POLL_OPTION = 'ADD_POLL_OPTION';
export const ADD_POLL_NAME = 'ADD_POLL_NAME';
export const CREATE_POLL = 'CREATE_POLL';

// Adds poll options to option list
export function addPollOption(option) {
  return {
    type: ADD_POLL_OPTION,
    option,
  };
}

export function pushToPollView(pollID) {
  return () => {
    Router.push({
      pathname: '/poll',
      query: { id: pollID },
    });
  };
}

function createPoll(pollID) {
  return {
    type: CREATE_POLL,
    pollID,
  };
}

export function createPollAsync(pollOptions, pollName) {
  const dataToPass = { pollOptions, pollName };
  return (dispatch) => {
    fetch('http://localhost:5000/createPoll', {
      method: 'POST',
      body: JSON.stringify(dataToPass),
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((json) => {
        const { pollID } = json.result;
        dispatch(createPoll(pollID));
        dispatch(pushToPollView(pollID));
      });
  };
}
