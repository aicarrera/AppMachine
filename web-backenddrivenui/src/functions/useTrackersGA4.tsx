import ReactGA from 'react-ga4';
import { gql } from '@apollo/client';
import { client } from '../pages/main';

const insertInteraction = gql`
 mutation insertInteractions($userId:String, $elementId:String, $relatedData:String, $category:String){
  insertInteractions(userId:$userId, elementId: $elementId, relatedData:$relatedData, category:$category) 
}
`;
export const trackevent =  async (elementid: string, category: string, label: string, userid:string, value: number = 1) =>{
  ReactGA.event({ action: elementid.toLowerCase() + "_click", category: category, value: value, label: label });
  console.log(userid,elementid.toLowerCase() + "_click",label)
  try{
     await client.mutate({
      variables: {
        userId: ""+userid,
        elementId: elementid.toLowerCase() + "_click",
        relatedData: label,
        category:category
      },
      mutation: insertInteraction,
    });
    
  }
  catch (error) {
    console.error("Error executing mutation:", error);
  }  
}
 
  