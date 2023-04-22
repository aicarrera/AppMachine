import { createChatBotMessage } from 'react-chatbot-kit';

const botName = 'CoffeeMachine';

const config = {
  initialMessages: [createChatBotMessage(`Hello! I am ${botName}`, {})],
  botName: botName,
  customStyles: {
    chatbot: {
      height: '100%',
      width: '100%',
      position: 'fixed',
      bottom: 0,
      right: 0,
      zIndex: 9999,
    },
    botMessageBox: {
      backgroundColor: '#376B7E',
      

    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
};

export default config;