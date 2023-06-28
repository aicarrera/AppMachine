import { ChakraProvider } from '@chakra-ui/react'
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import  '../styles/css/app.css'
import theme from '../theme'
import { AppProps } from 'next/app'
import { MatomoProvider, createInstance } from '@jonkoops/matomo-tracker-react'
import * as constants from "../config/constants";

const instanceConfig= (userID:string)=>{
  const config =    { urlBase: constants.MatomoServerUrl,
                      siteId: constants.MatomoSiteId,
                      userId: userID, // optional, default value: `undefined`.
                      disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
                      heartBeat: { // optional, enabled by default
                        active: true, // optional, default value: true
                        seconds: 10 // optional, default value: `15
                      }, 
                      configurations: { // optional, default value: {}
                        // any valid matomo configuration, all below are optional
                        disableCookies: true,
                        setSecureCookie: false,
                        setRequestMethod: 'POST'
                      } }
  return config
  }

function MyApp({ Component, pageProps }: AppProps) {
 //Matomo instance
  //const instance = createInstance(instanceConfig("none"))   //<MatomoProvider value={instance}>
   const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>    
        <ChakraProvider theme={theme}>
             <Component {...pageProps} />
        </ChakraProvider>       
    </ApolloProvider>
  )
}

export default MyApp
