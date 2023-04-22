import React, { useState } from 'react';
import { OPENAI_KEY } from "../config/constants";
import axios from 'axios';

const ActionProvider = ({ createChatBotMessage, setState, firstRecommended, drinks, ...rest }) => {
  const [chatHistory, setChatHistory] = useState([{role:"system", content:"Act as a smart coffee machine. DO NOT PROVIDE EXPLANATIONS. If user message is asking a coffee, drink or beverage or if the user wants a coffee recommendation"},
                                                  {role:"system", content:"Then only using the following options in this JSON list:"+JSON.stringify(firstRecommended)+"and this list: "+ JSON.stringify(drinks) +"that has the drinks with the sugar level that the user likes.  Select the first one to recommend or serve and provide with the correct amount of sugar. Give a good reason under 20 words. "},
                                                  {role:"system", content:"If the user is not happy with that recommendation, provide other from this JSON list: "+JSON.stringify(firstRecommended)+ "if user is happy or thankful, say goodbye under 10 words"}]);

  const sendMessageToAPI = async (message) => {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        messages: [ ...chatHistory,                 
                    {role:"user", content: message} 
                  ],
        model:"gpt-3.5-turbo",
        n: 1
           },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_KEY}`,
        },
      }
    );
    const botMessage = response.data["choices"][0]["message"]["content"];
    const updatedChatHistory = [...chatHistory, { role: "user", content: message }];
    setChatHistory(updatedChatHistory);
    return botMessage;

  };

  const handleNewUserMessage = async (newMessage) => {
    const response = await sendMessageToAPI(newMessage);
    setChatHistory([...chatHistory, { role: "assistant", content: response }]);
    setState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        createChatBotMessage(response)
      ]
    }));
  };

  return (
    <div>
      {React.Children.map(rest.children, child => {
        return React.cloneElement(child, {
          ...rest,
          actions: {
            sendMessageToAPI,
            handleNewUserMessage
          }
        })
      })}
    </div>
  );
};

export default ActionProvider;
