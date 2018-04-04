import React from 'react';
import { Button, Form, Grid, Segment, Message, Checkbox, Icon } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { vote, openCloseChat } from '../actions/pollView';
import globalStore from '../store';

const uuidv4 = require('uuid/v4');

let uniqueKey1;

class PollList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checkedIndex: -1 };
  }

  onCheckboxChange(index) {
    this.setState({ checkedIndex: index });
    this.props.vote(index);
  }

  render() {
    const optionList = this.props.pollInfo.result.options.map((item, i) => {
      uniqueKey1 = uuidv4();
      return (
        <Grid key={uniqueKey1} columns={2} stretched>
          <Grid.Column width={13} align="left">
            <div class="ui segment">
              <h4 style={{margin:0}}>{item.option}</h4>
              {this.state.checkedIndex > -1 ? <p style={{margin:0, opacity:'0.5'}}>{item.count} votes</p> : null}
              {this.state.checkedIndex > -1 ?
                <div class="ui blue bottom attached progress">
                  <div class="bar">
                    <div class="progress"></div>
                  </div>
                </div>
              : null}
            </div>
          </Grid.Column>
          <Grid.Column width={2} verticalAlign="middle" style={{paddingLeft:0, paddingRight:0}}>
            <Button.Group vertical>
              <Button
                disabled={this.state.checkedIndex > -1}
                checked={this.state.checkedIndex == i}
                icon={this.state.checkedIndex == i ? 'check square' : 'square'}
                color="green"
                onClick={() => {
                  this.onCheckboxChange(i);
                }}
              />
              <Button
                icon="talk"
                color="blue"
                onClick={() => {
                  console.log(`Clicked option ${i}`);
                  this.props.openCloseChat(i);
                }}
              />
            </Button.Group>
          </Grid.Column>
        </Grid>
      );
    });

    return (
      <React.Fragment>
        <Form size="large">
          <Segment>{optionList}</Segment>
        </Form>
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
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ vote, openCloseChat }, dispatch);

export default connect(globalStore, mapDispatchToProps)(PollList);
