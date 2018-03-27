// Actions for Create Poll page
export const ADD_POLL_OPTION = 'ADD_POLL_OPTION';

// Adds poll options to option list
export function addPollOption(option) {
  return {
    type: ADD_POLL_OPTION,
    option,
  };
}
