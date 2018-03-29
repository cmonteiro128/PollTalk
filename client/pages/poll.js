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

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids);
}

class CreatePoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // Dispatchers

    // State

    return (
      <div>
        <Head title="PollTalk | View Poll" />
        <p>Poll View</p>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  pollOptions: state.CreatePoll.pollOptions,
});

// const mapDispatchToProps = dispatch => bindActionCreators({ addPollOption }, dispatch);

export default withRedux(globalStore, mapStateToProps)(CreatePoll);
