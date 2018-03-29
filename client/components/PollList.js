import React from 'react';
import { Button, Form, Grid, Header, Segment, Input, Message } from 'semantic-ui-react';
import { css } from 'emotion';

const uuidv4 = require('uuid/v4');

const PollList = (props) => {
  const optionList = props.pollInfo.result.options.map((item, i) => (
    <Message size="small">
      <Message.Header>Option {i + 1}</Message.Header>
      <p>{item.option}</p>
    </Message>
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
          <Segment stacked>
            <Form.Field>{optionList}</Form.Field>
            <Button color="blue" fluid size="large" onClick={this.handleSubmit}>
              Create Poll
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default PollList;
