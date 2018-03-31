import React from 'react';
import { Button, Form, Grid, Header, Segment, Input, Message, Checkbox } from 'semantic-ui-react';
import { css } from 'emotion';

const uuidv4 = require('uuid/v4');

const PollList = (props) => {
  const optionList = props.pollInfo.result.options.map((item, i) => (
    <Grid columns={3}>
      <Grid.Column width={11} align="left">
        <Message>
          <Message.Header>Option {i + 1}</Message.Header>
          <p>{item.option}</p>
        </Message>
      </Grid.Column>
      <Grid.Column width={2} verticalAlign="middle">
        {/* <Button circular icon="checkmark box" color="green" /> */}
        <Checkbox compact />
      </Grid.Column>
      <Grid.Column width={2} verticalAlign="middle">
        <Button circular icon="talk" color="blue" />
      </Grid.Column>
    </Grid>
  ));

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column
        className={css`
          max-width: 450px;
        `}
      >
        <Header as="h2" color="blue" textAlign="center">
          {props.pollInfo.result.pollName}
        </Header>
        <Form size="large">
          <Segment stacked>{optionList}</Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default PollList;
