import { createChatBotMessage } from 'react-chatbot-kit';
import BotAvatar from '../components/BotAvatar/botavatar';
import GeneralOptions from '../widgets/GeneralOption';
import EndInteraction from '../widgets/EndInteraction';

const botName = 'Cofi, tu barista!';


const config  = {
  botName: botName,  
  //initialMessages: [createChatBotMessage(`Hola! Soy ${botName}`, { widget: 'approveFirstOption' })],
  state: {},
  widgets:  [
    { widgetName: 'approveFirstOption',
      widgetFunc: (props) => <GeneralOptions {...props} />,
      mapStateToProps: ["messages"],
      props:""},
    { widgetName: 'endInteraction',
      widgetFunc: (props) => <EndInteraction {...props} />,
      mapStateToProps: ["messages"],
      props:""},
    ],
 
   // Defines an object of custom components that will replace the stock chatbot components.
   customComponents: {
    // Replaces the default header
  header: () => <div style={{ backgroundColor: '#bdada0', padding: "5px", borderRadius: "3px" }}>Smart Coffee Machine</div>,
  // Replaces the default bot avatar
  botAvatar: (props) => <BotAvatar {...props} />

},
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
      backgroundColor: '#706256',
      

    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
};

export default config;