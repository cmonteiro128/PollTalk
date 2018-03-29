// Actions for View Poll page
export const GET_POLL_INFO = 'GET_POLL_INFO';

export function getPollInfo(option) {
  return {
    type: GET_POLL_INFO,
    option,
  };
}

export function getPollInfoAsync(pollID) {
  return (dispatch) => {
    fetch(`http://localhost:5000/poll/${pollID}`, {
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((json) => {
        const pollInfo = json;
        console.log('this has run');
        dispatch(getPollInfo(pollInfo));
      });
  };
}
