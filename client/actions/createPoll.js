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

export function addPollName(option) {
  return {
    type: ADD_POLL_OPTION,
    option,
  };
}

export async function createPoll(pollOptions, pollName) {
  const dataToPass = { pollOptions, pollName };
  const pollID = await fetch('http://localhost:5000/createPoll', {
    method: 'POST',
    body: JSON.stringify(dataToPass),
  });
  return {
    type: CREATE_POLL,
    pollID,
  };
}
