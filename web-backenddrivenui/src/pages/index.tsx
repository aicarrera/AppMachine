
import { Button, Flex,  Heading, Icon, Link, Spinner, VStack } from '@chakra-ui/react';
import InputField from "../components/Inputs/InputField";
import { GiVendingMachine } from "react-icons/gi";
import { useRouter } from "next/router";
import { useState } from "react";
import * as constants from "../config/constants";
import { Login } from '../config/interfaces';
import ReactGA from 'react-ga4';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
/*async function login(username: String): Promise<Login> {
  try {
    const res = await fetch(constants._API_URL + 'getUser?username=' + username, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"       
      }
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
*/

const client = new ApolloClient({
  uri: constants.GRAPHQL,
  cache: new InMemoryCache(),
});
const userLogin = gql`
 query login($userid:String){
  getUserById(userid:$userid) {
    userid
    username
    role
}}
`;
async function login(username: String): Promise<Login> {
  try {
    const { loading, error, data } = await client.query({query:userLogin, variables:{userid:username}});
    if (loading) console.log("loading")
    if (error) console.log(JSON.stringify(error, null, 2));
    return ({id:data.getUserById.userid, role:data.getUserById.role})
  } catch (error) {
    console.log(error);
  }
}

const Index = () =>{ 
  const trackingID='G-WSVTBCPP4D'  
  const [username, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const handleLogin =  async () => {  
    const jsonResponse = await login(username);
    if(!jsonResponse){
      setUserInput("");
    }
    else{
      const userid = jsonResponse.id;
      const role = jsonResponse.role;
      var on = true
      if (username in constants.ab_Testing){
         on= constants.ab_Testing[username]
      }
      ReactGA.initialize([{trackingId:trackingID, gaOptions:{userId:userid}}]);
      ReactGA.send({ hitType: "pageview", page: "/index" , value: username});

      router.push({
        pathname: "/main",
        query: { userid, role ,on}
      });
      setIsLoading(true);
    }    
  };

  const handleChatbot =  async () => {  
    const jsonResponse = await login(username);
    if(!jsonResponse){
      setUserInput("");
    }
    else{
      const userid = jsonResponse.id;
      const role = jsonResponse.role;
      var on = true
      if (username in constants.ab_Testing){
         on= constants.ab_Testing[username]
      }
      ReactGA.initialize([{trackingId:trackingID, gaOptions:{userId:userid}}]);
      ReactGA.send({ hitType: "pageview", page: "/index" , value: username});

      router.push({
        pathname: "/coffeeChatbot",
        query: { userid, role ,on}
      });
      setIsLoading(true);
    }    
  };

  return (
  
    <Flex h="100vh" w= "full" py={20} justifyContent="center">
    <VStack w="70%" h="min-content" p={10} alignItems="center"  spacing={'24px'} borderWidth="1px" borderColor="gray.300" borderRadius="md">
    <Heading as='h4' size='md' >
      Coffee Machine <Icon as={GiVendingMachine} />
    </Heading>
    <InputField label="User ID" id="userId" placeholder="Enter your email" value={username} onChange={e => setUserInput(e.target.value)}></InputField>
    <Button w="full" onClick={handleLogin} isLoading={isLoading}>Login Sistema</Button>
    <Button w="full" onClick={handleChatbot} isLoading={isLoading}>Chatbot</Button>


    {isLoading && (
        <Spinner
          size="xl"
          position="relative"
          top={0}
          left={0}
          bottom={0}
          right={0}
          zIndex={1}
        />
      )}
    <Link color='teal.500' href='/registerusr'>
    Register
    </Link>
    </VStack>
   
    </Flex>
  
      
)
}
export default Index

