import React from 'react';
import { Button, Form, Grid, Header, Segment, Message, Checkbox } from 'semantic-ui-react';

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
          <Button circular icon="talk" color="blue" onClick={props.handleOptionChatSelect} />
        </Grid.Column>
      </Grid>
    );
  });

  return (
    <React.Fragment>
      <Form size="large">
        <Segment>{optionList}</Segment>
      </Form>
    </React.Fragment>
  );
};

export default PollList;
