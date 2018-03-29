/* eslint no-underscore-dangle: ["error", { "allow": ["__NEXT_DATA__"] }] */
/* global window */

import React from 'react';
// import { Button, Form, Grid, Header, Segment, Input, Message } from 'semantic-ui-react';
// import { css } from 'emotion';
import { hydrate } from 'react-emotion';
import withRedux from 'next-redux-wrapper';
// import { bindActionCreators } from 'redux';
import Head from '../components/head';
import globalStore from '../store';
import fetch from 'isomorphic-unfetch';

import { getPollInfoAsync } from '../actions/pollView';
import PollList from '../components/PollList';

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids);
}

const getPollInfo = (pollID) => {
  const test = fetch(`http://localhost:5000/poll/${pollID}`, {
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(response => response.json())
    .then((json) => {
      const pollInfo = json;
      // dispatch(getPollInfo(pollInfo));
      return pollInfo;
    });
  return test;
};

class CreatePoll extends React.Component {
  static async getInitialProps({ store, query }) {
    // store.dispatch(getPollInfoAsync(query.id));
    const test = await getPollInfo(query.id);
    return { pollInfo: test };
  }

  constructor(props) {
    super(props);
    // this.state = { pollID: props.url.query.id };

    console.log(props.url.query.id);
  }

  render() {
    // Dispatchers
    const { getPollInfoAsync } = this.props;

    // State
    const { pollInfo } = this.props;

    return (
      <div>
        <Head title="PollTalk | View Poll" />
        <p>Poll View</p>
        <p>{JSON.stringify(this.props.pollInfo)}</p>
        {console.log(this.props.pollInfo)}
        <PollList />
      </div>
    );
  }
}
/* const mapStateToProps = state => ({
  pollInfo: state.ViewPoll.pollInfo,
}); */

// const mapDispatchToProps = dispatch => bindActionCreators({ getPollInfoAsync }, dispatch);

export default withRedux(globalStore)(CreatePoll);
