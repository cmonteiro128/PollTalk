import React from 'react';
import { Feed, Message, Input, Button, Form, Header } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addChat, openCloseChat } from '../actions/pollView';
import globalStore from '../store';

const uuidv4 = require('uuid/v4');

const animals = [
  'Alligator',
  'Anteater',
  'Armadillo',
  'Auroch',
  'Axolotl',
  'Badger',
  'Bat',
  'Beaver',
  'Buffalo',
  'Camel',
  'Chameleon',
  'Cheetah',
  'Chipmunk',
  'Chinchilla',
  'Chupacabra',
  'Cormorant',
  'Coyote',
  'Crow',
  'Dingo',
  'Dinosaur',
  'Dog',
  'Dolphin',
  'Dragon',
  'Duck',
  'Elephant',
  'Ferret',
  'Fox',
  'Frog',
  'Giraffe',
  'Gopher',
  'Grizzly',
  'Hedgehog',
  'Hippo',
  'Hyena',
  'Jackal',
  'Ibex',
  'Ifrit',
  'Iguana',
  'Kangaroo',
  'Koala',
  'Kraken',
  'Lemur',
  'Leopard',
  'Liger',
  'Lion',
  'Llama',
  'Manatee',
  'Mink',
  'Monkey',
  'Moose',
  'Narwhal',
  'Nyan cat',
  'Orangutan',
  'Otter',
  'Panda',
  'Penguin',
  'Platypus',
  'Python',
  'Pumpkin',
  'Quagga',
  'Rabbit',
  'Raccoon',
  'Rhino',
  'Sheep',
  'Shrew',
  'Skunk',
  'Slow loris',
  'Squirrel',
  'Tiger',
  'Turtle',
  'Walrus',
  'Wolf',
  'Wolverine',
  'Wombat',
];

let uniqueKey1;

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chatName: '', chatMessage: '' };
  }

  handleChange = name => (e, { value }) => this.setState({ [name]: value });

  render() {
    if (this.props.openRooms.includes(this.props.chatIndex)) {
      const chatRoom = this.props.pollInfo.result.options[this.props.chatIndex].chat.map((item) => {
        uniqueKey1 = uuidv4();
        if (item.length === 0) return null;
        return (
          <Feed.Event>
            <Feed.Label icon="user circle" />
            <Feed.Content date={item.name} summary={item.message} />
          </Feed.Event>
        );
      });

      return (
        <Message>
          <Message.Header>
            <Header as="h2" dividing>
              {this.props.pollInfo.result.options[this.props.chatIndex].option}
            </Header>
          </Message.Header>
          <Feed key={uniqueKey1}>{chatRoom}</Feed>
          <Header as="h2" dividing />
          <br />
          <Form>
            <Form.Field>
              <Input
                onChange={this.handleChange('chatName')}
                value={this.state.chatName}
                placeholder="Name"
              />
            </Form.Field>
            <Form.Field>
              <Input
                onChange={this.handleChange('chatMessage')}
                value={this.state.chatMessage}
                placeholder="Message"
              />
            </Form.Field>
            <Form.Field align="right">
              <Button onClick={() => this.props.openCloseChat(this.props.chatIndex)}>Close</Button>
              <Button
                onClick={() => {
                  let { chatName } = this.state;
                  if (chatName === '') {
                    chatName = animals[Math.floor(Math.random() * animals.length)];
                    this.setState({ chatName });
                  }
                  this.props.addChat(this.props.chatIndex, chatName, this.state.chatMessage);
                  this.setState({ chatMessage: '' });
                }}
                primary
              >
                Send
              </Button>
            </Form.Field>
          </Form>
        </Message>
      );
    }
    return null;
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ addChat, openCloseChat }, dispatch);

export default connect(globalStore, mapDispatchToProps)(ChatRoom);
