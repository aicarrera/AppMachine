import { createChatBotMessage } from 'react-chatbot-kit';

const botName = 'La Cafetera';

const config = {
  initialMessages: [createChatBotMessage(`Hola! soy ${botName}`, {})],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
};

export default config;