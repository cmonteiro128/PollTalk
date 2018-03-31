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

import { getPollInfoAsync, getPollInfo } from '../actions/pollView';
import PollList from '../components/PollList';
import { Grid } from 'semantic-ui-react';
import { css } from 'emotion';

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids);
}

class CreatePoll extends React.Component {
  static async getInitialProps({ store, query }) {
    const pollData = await getPollInfoAsync(query.id);
    await store.dispatch(getPollInfo(pollData));
    const pollDataFromState = store.getState().PollView.pollInfo[0];
    return { pollInfo: pollDataFromState };
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
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column
            className={css`
              max-width: 450px;
            `}
          >
            <PollList pollInfo={this.props.pollInfo} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
/* const mapStateToProps = state => ({
  pollInfo: state.ViewPoll.pollInfo,
}); */

// const mapDispatchToProps = dispatch => bindActionCreators({ getPollInfoAsync }, dispatch);

export default withRedux(globalStore)(CreatePoll);
