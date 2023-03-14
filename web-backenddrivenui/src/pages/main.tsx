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


  
  const randomIndex =  5 + Math.floor(Math.random() * (data.recommendedForYouItems.length - 5)); 
  const serendipity = [data.recommendedForYouItems[randomIndex]];
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
            ReactGA.initialize([{trackingId:'G-WSVTBCPP4D', gaOptions:{userId:userid}}]);
            ReactGA.send({ hitType: "pageview", page: "/main" , value: JSON.stringify(contextFilter)});

            
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
          
            <VStack w="full" h="min-content" p={10} alignItems="center"  spacing={'2px'} >    
              <VStack w="full" p={5} alignItems="center"  spacing={'2px'}>
              <Heading as='h4' size='md'>
                  Coffee Machine <Icon as={GiVendingMachine} />
              </Heading>
              <Text as='i'>Welcome {userid}!</Text>
              <Text as='i'>Role {role}!</Text>
              <Text as='i'>Shift {shift}</Text>  
              <Text as='i'>DayofWeek {getDayOfWeek()}</Text>  

            </VStack>
            <Tabs index={activeTab} minWidth={"full"} variant='soft-rounded' colorScheme='blue' size={"lg"} isFitted onChange={handleTabsChange}>
              <TabList >
                <Tab >Recomended for you</Tab>
                <Tab >Prepare your beverage</Tab>
                <Tab >Ticket</Tab>
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

