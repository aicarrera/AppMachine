import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "@apollo/client";
import {Icon, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react'

import { GiVendingMachine } from 'react-icons/gi'

import { Heading,Text } from '@chakra-ui/react';

import { useState } from "react";
import {useTimeLabel} from "../functions/useTimeLabel";

import * as constants from "../config/constants";

import Preparation from "./preparation";
import Recommended from "./recommendedForYou";
import { Service } from "../config/interfaces";
import Buy from "./buy";
//import { useMatomo } from '@jonkoops/matomo-tracker-react'

import ReactGA from 'react-ga4';
import { trackevent } from "../functions/useTrackersGA4";




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
  var userid = context.query.userid;
  var role = context.query.role;
  const turn = useTimeLabel(); 
  const contextFilter=[
    {
      name:"turn",
      value: turn.toLowerCase()
    },
    {
      name:"role",
      value:role
    }
  ]
  //console.log(userid,role)
  //console.log(contextFilter)
  
  const { loading, error, data } = await client.query({query:getRecommended, variables:{userid:userid, topk:15, contextFilter:contextFilter, on:true}});
  if (loading) console.log("loading")
  if (error) console.log(JSON.stringify(error, null, 2));


  
  const randomIndex =  5 + Math.floor(Math.random() * (data.recommendedForYouItems.length - 5)); 
  const serendipity = [data.recommendedForYouItems[randomIndex]];
  const firstRecommended = [...data.recommendedForYouItems.slice(0,2),...serendipity];
  var restSugar=  await getSugar(firstRecommended[0].data.title);
  const sugarFirstRecommended= restSugar.valueInt;
 
  return {
    props: {
      recommended: data.recommendedForYouItems,
      userid:userid,  
      role:role,    
      contextFilter:contextFilter,
      firstRecommended:firstRecommended,
      sugarFirstRecommended:sugarFirstRecommended
    },
 };

}


/**
 * TMP
 * @param r 
 * @returns 
 */
async function getSugar(service:String){
  try{
  
    const res= await fetch(constants._API_URL+'getSugar?service='+service,
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





const Main = ({recommended, userid, role, contextFilter,sugarFirstRecommended,firstRecommended}) => {
           
            //Google Analytics 
            ReactGA.initialize([{trackingId:'G-E845X2ZQS1', gaOptions:{userId:userid}}]);
            ReactGA.send({ hitType: "pageview", page: "/main" });

            
            /*Matomo configuration   (TESTING GA4)                  
            //const { trackPageView, trackEvent, pushInstruction  } = useMatomo()
            //pushInstruction('setUserId', userid);
            // Track page view
            useEffect(() => {
                trackPageView()
              }, [])
            */

            //Turn calculation depending on hour
            var turn = useTimeLabel();            
            //Selected service for the user
            const [serviceSelected, setServiceSelected] = useState<Service>({ service: "", information: [] });;
            //Current active tab
            const [activeTab, setActiveTab] = useState(0);
            const tabIds=["recommended_for_you","preparation","buy"]
            const handleTabsChange = (index) => {
              //trackEvent({ category: 'tab-change', action: 'click-event', value:index});  //Matomo tracking            
              trackevent("tab"+tabIds[index],"main",tabIds[index],index);    

              setActiveTab(index); 
            }

            return (
          
            <VStack w="full" h="min-content" p={10} alignItems="center"  spacing={'2px'} >    
              <VStack w="full" p={5} alignItems="center"  spacing={'2px'}>
              <Heading as='h4' size='md'>
                  Coffee Machine <Icon as={GiVendingMachine} />
              </Heading>
              <Text as='i'>Welcome {userid}!</Text>
              <Text as='i'>Role {role}!</Text>
              <Text as='i'>Turn {turn}</Text>  
            </VStack>
            <Tabs index={activeTab} minWidth={"full"} variant='soft-rounded' colorScheme='blue' size={"lg"} isFitted onChange={handleTabsChange}>
              <TabList >
                <Tab >Recomended for you</Tab>
                <Tab >Prepare your beverage</Tab>
                <Tab >Ticket</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                    <Recommended setServiceSelected={setServiceSelected} firstRecommended={firstRecommended} sugarFirstRecommended={sugarFirstRecommended} setActiveTab={setActiveTab}/> 
                </TabPanel>
                <TabPanel>
                    <Preparation recommended={recommended} contextFilter={contextFilter} setServiceSelected={setServiceSelected} setActiveTab={setActiveTab} />
                </TabPanel>
                <TabPanel>
                    <Buy serviceSelected={serviceSelected}></Buy>
                </TabPanel>
              </TabPanels>
            </Tabs>

              
            </VStack>
        
              )
}
export default Main

