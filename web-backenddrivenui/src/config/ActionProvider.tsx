import React from 'react';
import router from "next/router";
import { trackevent } from '../functions/useTrackersGA4';
import { gql } from '@apollo/client';



const ActionProvider = ({ createChatBotMessage, setState, firstRecommended,chatService,client,userid, ...rest }) => {
//  const [chatHistory, setChatHistory] = useState([{role:"system", content:"Act as a smart coffee machine. DO NOT PROVIDE EXPLANATIONS. If user message is asking a coffee, drink or beverage or if the user wants a coffee recommendation"},
 //                                                 {role:"system", content:"Then only using the following options in this JSON list:"+JSON.stringify(firstRecommended)+"and this list: "+ JSON.stringify(drinks) +"that has the drinks with the sugar level that the user likes.  Select the first one to recommend or serve and provide with the correct amount of sugar. Give a good reason under 20 words. "},
  //                                                {role:"system", content:"If the user is not happy with that recommendation, provide other from this JSON list: "+JSON.stringify(firstRecommended)+ "if user is happy or thankful, say goodbye under 10 words"}]);
/*
  const [chatHistory, setChatHistory] = useState([{role:"system", content:"Act as a smart coffee machine. DO NOT PROVIDE EXPLANATIONS. If user message is asking a coffee, drink or beverage or if the user wants a coffee recommendation"},
  {role:"system", content:"Then only using the following options in this JSON list:"+JSON.stringify(firstRecommended)+"and this list: "+ JSON.stringify(drinks) +"that has the drinks with the sugar level that the user likes.  Select the first one to recommend or serve and provide with the correct amount of sugar. Give a good reason under 20 words in Spanish. "},
  {role:"system", content:"If the user is not happy with that recommendation, provide other from this JSON list: "+JSON.stringify(firstRecommended)+ "if user is happy or thankful, say goodbye under 10 words in Spanish"}]);

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
*/
  
  const handleNewUserMessage = async (newMessage) => {
    try {
      var response = ""
      response= await chatService.sendMessageToAPI(newMessage); 
      chatService.setChatHistory({role: "assistant", content: response})  
      if (response.includes("$")){
        setState((prevState) => ({
          ...prevState,
          messages: [
            ...prevState.messages,
            createChatBotMessage(response, {
              widget: "endInteraction", loading:true, delay:100 })
          ]
        }));
      }
      else{
        setState((prevState) => ({
          ...prevState,
          messages: [
            ...prevState.messages,
            createChatBotMessage(response, {loading:true, delay:100})
          ]
        }));
      }
      trackevent("handleNewUserMessage", "chatbot",JSON.stringify(chatService.getChatHistoryWithDifferentRole), userid,0);
      
  }
  catch (error) {
    console.error("Error executing handleNewUserMessage:", error);
  }

  };
  const handleYes = async () => {
    try {
    var response = "";
    response= await chatService.sendMessageToAPI("Si, gracias");
    chatService.setChatHistory({role: "assistant", content: response})
    trackevent("btnYes","chatbot",JSON.stringify(chatService.getChatHistory),userid,0); 

  //  console.log(chatService.getChatHistory)
    setState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        createChatBotMessage(response,   {delay:100, loading:true,
          widget: "endInteraction",
        })

      ]
    }));

    addMessageToState(response);
  }
  catch (error) {
    console.error("Error executing handleYes:", error);
  }
  };

  const handleFinish = async () => { 
  
    try {
      trackevent("btnFinish", "chatbot",JSON.stringify(chatService.getChatHistoryWithDifferentRole), userid,0);
    //  console.log(chatService.getChatHistory.toString());
      router.push({
        pathname: "/",
      });
    } catch (error) {
      console.error("Error executing handleFinish:", error);
    }
  };
  
  const handleNo = async () => {
    var response = "";
    response = await chatService.sendMessageToAPI("No, muestrame opciones");
    chatService.setChatHistory({role: "assistant", content: response})  
    trackevent("btnNo","chatbot",JSON.stringify(chatService.getChatHistory),userid,0); 

    setState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        createChatBotMessage(response, {delay:100, loading:true})
      ]
    }));

    addMessageToState(response);
  };
  const addMessageToState = (message) => {
    setState((state) => ({
      ...state,
      messages: [...state.messages, message]
    }));
  };
  return (
    <div>
      {React.Children.map(rest.children, child => {
        return React.cloneElement(child, {
          ...rest,
          actions: {
            //sendMessageToAPI,
            handleNewUserMessage,
            handleYes,
            handleNo,
            handleFinish
          }
        })
      })}
    </div>
  );
};

export default ActionProvider;

