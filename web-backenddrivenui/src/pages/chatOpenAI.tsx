import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "@apollo/client";
import {Button, VStack } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react';
import { useState } from "react";
import {useTimeLabel} from "../functions/useTimeLabel";
import * as constants from "../config/constants";
import axios from "axios";
import { Service } from "../config/interfaces";
import ReactGA from 'react-ga4';
import { getDayOfWeek } from "../functions/getDayOfWeek";
//import { OPENAI_KEY } from "../config/constants";



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
export async function getServerSideProps(context) {
 const services=["cortado","long_coffee","capuccino","expresso", "milk_coffee"]
 const i = Math.floor(Math.random() * services.length);
  var out = services[i]
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
    },
    {
      name:"out",
      value: out
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
// var restSugar=  await getSugar(firstRecommended[0].data.title);
//  const sugarFirstRecommended= restSugar.valueInt;
 
  return {
    props: {
      recommended: data.recommendedForYouItems,
      userid:userid,  
      role:role,    
      contextFilter:contextFilter,
      firstRecommended:firstRecommended
    //  sugarFirstRecommended:sugarFirstRecommended
    },
 };

}

const fetchData = async (recommended,input: string) => {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      messages: [ {role:"system", content:"DO NOT PROVIDE EXPLANATIONS. This is to generate a JSON RESPONSE. Do not use PLAIN ENGLISH"},
                  {role:"system", content:"if this instruction \""+input+"\" is from a user that wants a coffee or a coffee recommendation"},
                 {role:"assistant", content:" If True, then only using the following options in this LIST OF JSON:"+JSON.stringify(recommended)+" select only 1 to recommend and generate a JSON with the following format {item:{jsonItem},messageChatbot:fun message} . Else item will be null and message will be 1 polite sentence about the instruction and a fun fact"}],
      model:"gpt-3.5-turbo",
      n: 1
         },
    {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${OPENAI_KEY}`,
      },
    }
  );
  console.log(response.data["choices"][0]["message"]["content"])
  return response.data["choices"][0]["message"]["content"]
};
const chatopenai = ({recommended, userid, role, contextFilter,firstRecommended}) => {
           
            //Google Analytics 
            
            var valuesList = contextFilter.map(obj => obj.value);
            var transformedContext = valuesList.join(", ");
            ReactGA.send({ hitType: "pageview", value: transformedContext});
            
         

            //Turn calculation depending on hour
            var shift = useTimeLabel();            
            //Selected service for the user
            const [serviceSelected, setServiceSelected] = useState<Service>({ service: "", information: [] });;
            //Current active tab
     
       
  
            const [input, setInput] = useState("");
            const [jsonResponse, setJsonResponse] = useState("");
            
            async function handleClick() {
            try {
                const jsonString = await fetchData(firstRecommended, input);
                const jsonObject = JSON.parse(jsonString);
                setJsonResponse(jsonObject);
              } catch (error) {
                console.error(error);
              }
            }
            return (
              <VStack className="container">
              <Heading size={"sm"}>Tell me something, and I'll tell you more</Heading>
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                rows={5}
                placeholder="Type in some words and I'll finish the rest..."
              />
              <Button className="button" onClick={handleClick}>Complete Sentence</Button>
              {jsonResponse && <p> {jsonResponse["messageChatbot"]}</p>}
            </VStack>
              )
}
export default chatopenai

