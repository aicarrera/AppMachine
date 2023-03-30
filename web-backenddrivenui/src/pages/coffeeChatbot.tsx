import React from "react";
import Chatbot from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css'

import ActionProvider from '../config/ActionProvider';
import MessageParser from '../config/MessageParser';
import config from '../config/config';

function coffeeChatbot() {
  return (
    <div className="App">
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
}

export default coffeeChatbot;