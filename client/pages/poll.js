/* eslint no-underscore-dangle: ["error", { "allow": ["__NEXT_DATA__"] }] */
/* global window */

import React from 'react';
import { hydrate } from 'react-emotion';
import { bindActionCreators } from 'redux';
import { Grid, Header, Segment, Button, Icon } from 'semantic-ui-react';
import { css } from 'emotion';

import withRedux from 'next-redux-wrapper';
import Head from '../components/head';
import globalStore from '../store';

import { getPollInfoAsync, intiateSocket } from '../actions/pollView';
import PollList from '../components/PollList';
import ChatRoom from '../components/ChatRoom';

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids);
}

class CreatePoll extends React.Component {
  static async getInitialProps({ store, query }) {
    await store.dispatch(getPollInfoAsync(query.id));
    const pollDataFromState = store.getState().PollView.pollInfo[0];
    return { pollInfo: pollDataFromState };
  }

  constructor(props) {
    super(props);
    // this.state = { pollID: props.url.query.id };

    console.log(props.url.query.id);
  }

  componentDidMount() {
    intiateSocket();
  }

  handleNewSuggestion = () => {
    // this.props.createPollAsync(this.props.pollOptions, this.state.pollName);
  };

  render() {
    // Dispatchers
    // const { getPollInfoAsync } = this.props;

    // State
    const { pollInfo } = this.props;

    return (
      <div align="center">
        <Head title="PollTalk | View Poll" />
        <Segment.Group>
          <Segment>
            <Header
              as="h2"
              color="blue"
              textAlign="center"
              className={css`
                margin-bottom: 50%;
              `}
            >
              {pollInfo.result.pollName}
            </Header>
          </Segment>
          <Segment padded="very">
            <Grid
              textAlign="center"
              verticalAlign="middle"
              columns={2}
              className={css`
                max-width: 50%;
              `}
            >
              <Grid.Column width={8}>
                <PollList pollInfo={pollInfo} />
                <Button
                  icon
                  color="blue"
                  fluid
                  size="large"
                  labelPosition="left"
                  onClick={this.handleNewSuggestion}
                >
                  <Icon name="add" />
                  Suggest New Option
                </Button>
              </Grid.Column>
              <Grid.Column width={8}>
                <ChatRoom pollInfo={pollInfo} />
              </Grid.Column>
            </Grid>
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  pollInfo: state.PollView.pollInfo[0],
});

const mapDispatchToProps = dispatch => bindActionCreators({ intiateSocket }, dispatch);

export default withRedux(globalStore, mapStateToProps, mapDispatchToProps)(CreatePoll);
