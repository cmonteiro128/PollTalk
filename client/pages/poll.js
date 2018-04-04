/* eslint no-underscore-dangle: ["error", { "allow": ["__NEXT_DATA__"] }] */
/* global window */

import React from 'react';
import { hydrate } from 'react-emotion';
import { bindActionCreators } from 'redux';
import { Container, Grid, Header, Segment, Menu } from 'semantic-ui-react';
import { css } from 'emotion';

import withRedux from 'next-redux-wrapper';
import Head from '../components/head';
import globalStore from '../store';

import { getPollInfoAsync, intiateSocket, vote, addChat } from '../actions/pollView';
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
    const { openRooms } = store.getState().PollView;
    return { pollInfo: pollDataFromState, openRooms };
  }

  constructor(props) {
    super(props);
    // this.state = { pollID: props.url.query.id };
    console.log(props.url.query.id);
  }

  componentDidMount() {
    this.props.intiateSocket();
  }

  handleNewSuggestion = () => {
    // this.props.createPollAsync(this.props.pollOptions, this.state.pollName);
  };

  render() {
    // Dispatchers
    const { vote, addChat } = this.props;

    // State
    const { pollInfo, openRooms } = this.props;

    const ChatRooms = pollInfo.result.options.map((item, i) => (
      <Grid.Column computer={4} mobile={16}>
        <ChatRoom chatIndex={i} pollInfo={pollInfo} openRooms={openRooms} />
      </Grid.Column>
    ));

    return (
      <div align="center">
        <Head title="PollTalk | View Poll" />
        <Menu>
          <Container
            className={css`
              margin-left: 50%;
            `}
          >
            <Menu.Item name="editorials">{pollInfo.result.pollName}</Menu.Item>
          </Container>
        </Menu>
        <Grid
          textAlign="center"
          verticalAlign="middle"
          className={css`
            max-width: 95%;
          `}
        >
          <Grid.Column computer={4} mobile={16}>
            <PollList pollInfo={pollInfo} />
          </Grid.Column>
          {ChatRooms}
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  pollInfo: state.PollView.pollInfo[0],
  openRooms: state.PollView.openRooms,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ intiateSocket, vote, addChat }, dispatch);

export default withRedux(globalStore, mapStateToProps, mapDispatchToProps)(CreatePoll);
