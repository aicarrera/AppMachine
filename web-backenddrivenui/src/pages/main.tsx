import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "@apollo/client";
import {Icon, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react'

import { GiVendingMachine } from 'react-icons/gi'

import { Heading,Text } from '@chakra-ui/react';

import { useState } from "react";
import {useTimeLabel} from "../functions/useTimeLabel";

import * as constants from "../config/constants";

//import Preparation from "./preparation";
import Preparation from "./preparationMixture";

import Recommended from "./recommendedForYou";
import { Service } from "../config/interfaces";
import Buy from "./buy";
//import { useMatomo } from '@jonkoops/matomo-tracker-react'

import ReactGA from 'react-ga4';
import { trackevent } from "../functions/useTrackersGA4";
import { getDayOfWeek } from "../functions/getDayOfWeek";



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

const Main = ({recommended, userid, role, contextFilter,firstRecommended}) => {
           
            //Google Analytics 
            
            var valuesList = contextFilter.map(obj => obj.value);
            var transformedContext = valuesList.join(", ");
            ReactGA.send({ hitType: "pageview", page: "/main" , value: transformedContext});
            
            
            /*Matomo configuration   (TESTING GA4)                  
            //const { trackPageView, trackEvent, pushInstruction  } = useMatomo()
            //pushInstruction('setUserId', userid);
            // Track page view
            useEffect(() => {
                trackPageView()
              }, [])
            */

            //Turn calculation depending on hour
            var shift = useTimeLabel();            
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
          
            <VStack w="full" h="min-content" p={2} alignItems="center"  spacing={'2px'} >    
              <VStack w="full" p={5} alignItems="center"  spacing={'2px'}>
                <Heading as='h4' size='md'>
                    Mixing Machine <Icon as={GiVendingMachine} />
                </Heading>
                <Heading as='h4' size='sm'>Welcome {userid}!</Heading>
                <Heading as='h4' size='sm'>Role OPERATOR</Heading>
                <Heading as='h4' size='sm'>Shift {shift}</Heading>  
                <Heading as='h4' size='sm'>DayofWeek {getDayOfWeek()}</Heading> 
              </VStack>
            <Tabs index={activeTab} minWidth={"full"} variant='soft-rounded' colorScheme='blue' size={"lg"} isFitted onChange={handleTabsChange} display={"block"} width={"100%"}>
              <TabList >
                <Tab >Recomended</Tab>
                <Tab >Preparation</Tab>
                <Tab >Finish</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                    <Recommended setServiceSelected={setServiceSelected} firstRecommended={firstRecommended}  setActiveTab={setActiveTab}/> 
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

