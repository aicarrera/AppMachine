import React, { Key, useEffect, useState } from "react";
import Chatbot from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css'

import ActionProvider from '../config/ActionProvider';
import MessageParser from '../config/MessageParser';
import config from '../config/config';
import { useTimeLabel } from '../functions/useTimeLabel';
import { getDayOfWeek } from '../functions/getDayOfWeek';
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import * as constants from "../config/constants";

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
    console.log(res);
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
  console.log("RandomIndex",randomIndex, data.recommendedForYouItems.length)
  const serendipity = [data.recommendedForYouItems[randomIndex]];
  console.log("serendipity",serendipity)
  const firstRecommended = [...data.recommendedForYouItems.slice(0,2),...serendipity];

  return {
    props: {
      recommended: data.recommendedForYouItems,
      userid:userid,  
      role:role,    
      contextFilter:contextFilter,
      firstRecommended:firstRecommended   
    },
 };

}

function coffeeChatbot({recommended, userid, role, contextFilter,firstRecommended}) {
  const [drinks, setDrinks] = useState([]);

  firstRecommended?.forEach((item) => {
    console.log(item.data.title)
    useEffect(() => {
      async function fetchData() {
        const sugar = await getSugar(item.data.title);
        const drink = { "drink": item.data.title, "sugar": sugar.valueInt };
        setDrinks((prevDrinks) => [...prevDrinks, drink]);
      }
      fetchData();
    }, [item.data.title]);
  });
  console.log(drinks)
  return (


    <div className="App">
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={
          (props) => (
            <ActionProvider
              {...props}
              createChatBotMessage={props.createChatBotMessage}
              setState={props.setState}
              firstRecommended={firstRecommended}
              drinks={drinks}
            />
          )
        }
      />
    </div>
  );
}

export default coffeeChatbot;