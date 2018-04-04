import React from 'react';
import { Button, Form, Grid, Segment, Message, Checkbox, Icon } from 'semantic-ui-react';

const uuidv4 = require('uuid/v4');

let uniqueKey1;

const PollList = (props) => {
  const optionList = props.pollInfo.result.options.map((item, i) => {
    uniqueKey1 = uuidv4();
    return (
      <Grid key={uniqueKey1} columns={3}>
        <Grid.Column width={11} align="left">
          <Message>
            <Message.Header>Option {i + 1}</Message.Header>
            <p>{item.option}</p>
          </Message>
        </Grid.Column>
        <Grid.Column width={2} verticalAlign="middle">
          {/* <Button circular icon="checkmark box" color="green" /> */}
          <Checkbox />
        </Grid.Column>
        <Grid.Column width={2} verticalAlign="middle">
          <Button circular icon="talk" color="blue" />
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
};

export default PollList;
