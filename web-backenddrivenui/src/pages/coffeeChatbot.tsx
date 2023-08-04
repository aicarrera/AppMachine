import React, { useEffect, useState } from "react";
import Chatbot, { createChatBotMessage } from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css'

import ActionProvider from '../config/ActionProvider';
import MessageParser from '../config/MessageParser';
import config from '../config/config';
import { useTimeLabel } from '../functions/useTimeLabel';
import { getDayOfWeek } from '../functions/getDayOfWeek';
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import * as constants from "../config/constants";
import { Heading, Icon, Spinner, VStack } from "@chakra-ui/react";
import { GiVendingMachine } from "react-icons/gi";
import ChatService from "../config/ChatService";
import { trackevent } from "../functions/useTrackersGA4";
import { translationDictionary } from "../config/constants";

const client = new ApolloClient({
  uri: constants.GRAPHQL,
  cache: new InMemoryCache(),
});

const getRecommended = gql`
 query Recommended($userid:String, $topk:Int, $contextFilter:[ContextFilter], $on:Boolean){
  recommendedForYouItems(userid:$userid, topk: $topk, contextFilter:$contextFilter, on:$on) {
    component
... on BasicCard {  
      data {
        id
        title
        thumbnailUrl       
      }
}}}
`;
async function getSugar( title ){
  try{
  
    const res= await fetch(constants._API_URL+'getSugar?service='+title,
    {method:'GET',   
    headers:{"Accept": "application/json",
    "Content-Type": "application/json",
    "GRAPHDB_SERVER":constants._GRAPHDBSERVER},
    });
    console.log("response:",res);
    if (res.status === 500) {
      return { valueInt: 0 };
    }
    return await res.json();
   
  }
  catch(error){
    console.log("getSugar()");
    console.log(error);
    return error
  }
}
export async function getServerSideProps(context) {
 

  var userid = context.query.userid;
  var role = context.query.role;
  var on = context.query.on==="true";
  console.log(on);
  const turn = useTimeLabel(); 
  const dayweek=getDayOfWeek();
  const contextFilter=[
    {
      name:"turn",
      value: turn.toLowerCase()
    },
    {
      name:"role",
      value:role
    },
    {
      name:"dayofweek",
      value: dayweek.toString()
    }
  
  ]
  //console.log(userid,role)
  console.log(contextFilter)
  
  const { loading, error, data } = await client.query({query:getRecommended, variables:{userid:userid, topk:15, contextFilter:contextFilter, on:on}});
  if (loading) console.log("loading")
  if (error) console.log(JSON.stringify(error, null, 2));


  
  var randomIndex =   Math.floor(Math.random() * 4) + 2;//2 + Math.floor(Math.random() * (data.recommendedForYouItems.length - 11)); 
  //console.log("RandomIndex",randomIndex, data.recommendedForYouItems.length)
  const serendipity = [data.recommendedForYouItems[randomIndex]];
  console.log("serendipity",serendipity)
  //Fill drinks sequentially using for..of
  let drinks=[]
  const firstRecommended = [...data.recommendedForYouItems.slice(0,2),...serendipity];
  for (const item of [...firstRecommended,...data.recommendedForYouItems.slice(2,data.recommendedForYouItems.length)]) {  
    try {
      const sugar = await getSugar(item.data.title);
      const drink = { "drink": item.data.title, "sugar": sugar.valueInt };
      drinks.push(drink);
    } catch (error) {
      console.log("Error fetching sugar for", item.data.title);
      console.log(error);
    }
  }
  return {
    props: {
      recommended: data.recommendedForYouItems,
      userid:userid,  
      role:role,    
      contextFilter:contextFilter,
      firstRecommended:firstRecommended ,  
      drinks:drinks
    },
 };

}


 function coffeeChatbot({recommended, userid, role, contextFilter,firstRecommended,drinks}) {
  const [isNewLogin, setLogin] = useState(true);

  console.log("drinks",drinks)
  //Starting chat service
  const chatService = new ChatService(drinks);

  const [firstResponse, setfirstResponse] = useState("-"); 
  var valuesList = contextFilter.map(obj => obj.value);
  var transformedContext = valuesList.join(", ");

  if (isNewLogin){
    trackevent("login", "chatbot",transformedContext, userid,0);
    setLogin(false);
  }
  
/*
  useEffect(() => {
    const fetchData = async () => {
      try {

        chatService.setDrinks=drinks
        console.log("drinks", chatService.getDrinks)
        const r = await chatService.sendMessageToAPI("dame una recomendación para mi por favor con la cantidad adecuada de azucar");
        // Handle the response from the API
        setfirstResponse(r)
      } catch (error) {
        // Handle any errors that occur during the API request
        console.error(error);
      }
    };

    fetchData()
  },drinks);
*/
useEffect(() => {
chatService.setDrinks=drinks
const getRandomIndex = (max) => Math.floor(Math.random() * max);
const randomDrinkIndex = getRandomIndex(3); // Select from the first 3 drinks
const randomDrink = drinks[randomDrinkIndex];

// Obtén la traducción y descripción de la bebida seleccionada
  // Verificar si la bebida seleccionada existe en el diccionario de traducciones
  const translatedDrink = translationDictionary[randomDrink.drink]
    ? translationDictionary[randomDrink.drink].value
    : translationDictionary[drinks[0].drink].value;
  
  const description = translationDictionary[randomDrink.drink]
    ? translationDictionary[randomDrink.drink].description
    : translationDictionary[drinks[0].drink].description;

// Frases de recomendación
const recommendPhrases = [
  `Te recomiendo probar ${translatedDrink} con ${randomDrink.sugar === 0 ? '0' : randomDrink.sugar} azúcar. ${description}`,
  `¡Anímate a disfrutar un ${translatedDrink}! Perfecto con ${randomDrink.sugar === 0 ? '0' : randomDrink.sugar} azúcar. ${description}`,
  `Un sorbo de ${translatedDrink} te espera. Opta por ${randomDrink.sugar === 0 ? '0' : randomDrink.sugar} azúcar para resaltar su sabor. ${description}`,
];



const randomPhraseIndex = getRandomIndex(recommendPhrases.length);
const randomPhrase = recommendPhrases[randomPhraseIndex];
setfirstResponse(randomPhrase)
chatService.setChatHistory({role: "user", content: "dame una recomendación para mi por favor con la cantidad adecuada de azucar"})
chatService.setChatHistory({role: "assistant", content: randomPhrase})
},drinks);

  //Initial Message
  
useEffect(() => {
  console.log("First",firstResponse)
  if(firstResponse!="-" && drinks.length>0){
  chatService.setChatHistory({role: "assistant", content: firstResponse})  
  }
}, [firstResponse]);

  var shift = useTimeLabel();    
  return (

    <div className="App">
    <VStack w="full" h="100%" maxH={"100%"} p={5} alignItems="center" spacing={6}   >
      <VStack alignItems={"center"} spacing={2} w="full">
      <Heading as='h3' size='md'>
                    CoffeeVending Machine <Icon as={GiVendingMachine} />
                </Heading>
        <Heading as="h4" size="sm">
          Welcome {userid}!
        </Heading>
        <Heading as="h4" size="sm">
          Role {role}
        </Heading>
      
      
        <Heading as="h4" size="sm">
          Shift {shift}
        </Heading>
        <Heading as="h4" size="sm">
          Day of Week {getDayOfWeek()}
        </Heading>
      </VStack>
      
      {firstResponse === "-" || drinks.length==0? (
        <Spinner size="xl" />
      ) : (
        <VStack p={5} alignItems="center" spacing={2} borderWidth="1px" borderColor="gray.300" borderRadius="md">
          <Chatbot
            config={{
              ...config,
              initialMessages: [createChatBotMessage(`Hola! Soy Cofi, tu barista. ${firstResponse}`, { widget: 'approveFirstOption', delay:0, loading:true })],
            }}
            messageParser={MessageParser}
            actionProvider={(props) => (
              <ActionProvider
                {...props}
                client={client}
                createChatBotMessage={props.createChatBotMessage}
                setState={props.setState}
                userid={userid}
                firstRecommended={firstRecommended}
                chatService={chatService}
              />
            )}
          />
        </VStack>
      )}
    </VStack>
  </div>
);
            }

export default coffeeChatbot;