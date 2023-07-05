import ReactGA from 'react-ga4';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import * as constants from "../config/constants";

const client = new ApolloClient({
   uri: constants.GRAPHQL,
   cache: new InMemoryCache(),
 });

const insertInteraction = gql`
 mutation insertInteractions($userId:String, $elementId:String, $relatedData:String){
  insertInteractions(userId:$userId, elementId: $elementId, relatedData:$relatedData) 
}
`;
export const trackevent =  async (elementid: string, category: string, label: string, userid, value: number = 1) =>{
   ReactGA.event({ action: elementid.toLowerCase() + "_click", category: category, value: value, label: label });
  try{
   const {  data } = await client.mutate({
      mutation: insertInteraction,
      variables: {
        userId: userid,
        elementId: elementid.toLowerCase() + "_click",
        relatedData: label,
      },
    });
  
  }
  catch(error){
    console.error("Error executing mutation:", error);

  }
  
}