import React from 'react';
import { Feed, Message } from 'semantic-ui-react';

const uuidv4 = require('uuid/v4');

let uniqueKey1;

this.state = { chatRoomVisibility: true, optionListWidth: 16, chatRoomWidth: 0 };

const ChatRoom = (props) => {
  const chatRoom = props.pollInfo.result.options.map((item, i) => {
    uniqueKey1 = uuidv4();
    return (
      <Feed key={uniqueKey1}>
        <Feed.Event>
          <Feed.Label icon="pencil" />
          <Feed.Content date="Today" summary="You posted on your friend Stevie Feliciano's wall." />
        </Feed.Event>
        <Feed.Event>
          <Feed.Label icon="pencil" />
          <Feed.Content date="Today" summary="You posted on your friend Stevie Feliciano's wall." />
        </Feed.Event>
        <Feed.Event>
          <Feed.Label icon="pencil" />
          <Feed.Content date="Today" summary="You posted on your friend Stevie Feliciano's wall." />
        </Feed.Event>
      </Feed>
    );
  });

  return (
    <React.Fragment>
      <Message>{chatRoom}</Message>
    </React.Fragment>
  );
};

export default ChatRoom;
