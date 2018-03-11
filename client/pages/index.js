import React from 'react';
import Link from 'next/link';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import Head from '../components/head';

export default class CreatePoll extends React.Component {
  render() {
    return (
      <div>
        <Head title="PollTalk | Create Poll" />
        {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
        <style jsx global>
          {`
            body {
              background: '#dfe0e1';
            }
          `}
        </style>
        <style>
          {`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}
        </style>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="blue" textAlign="center">
              Create a new poll
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input fluid icon="user" iconPosition="left" placeholder="E-mail address" />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />

                <Button color="blue" fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href="#">Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
