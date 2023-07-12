
//export const _GRAPHDBSERVER="http://34.175.76.43:7200/";
//export const _API_URL='http://34.175.76.43:8080/APIContextInteraction/api/headers/';
const apihost='http://34.162.38.215' //localhost
const _GRAPHDBSERVER= apihost+":7200/"
const _API_URL=apihost+':8080/APIContextInteraction/api/headers/'
const fetch = require('node-fetch');

interface Subservice {
    id: string
    name: string
}
/**
 * calculateRatings
 * @param cf 
 * @returns 
 */
async function calculateRatings(cf:JSON[]){
    try{
      return await fetch(_API_URL+'calculateRatings?isExclusive='+false,
      {method:'POST',
      headers:{"Accept": "application/json",
      "Content-Type": "application/json",
      "GRAPHDB_SERVER":_GRAPHDBSERVER},
      body: JSON.stringify(cf)})
      .then((response: { json: () => any; }) => response.json())
    }
    catch(error){
      console.log("calculateRatings()")
      console.log(error)
      return error
    }
  }
  
  /**
   * getSubservicesRecommendationCD
   * @param userid 
   * @returns 
   */
  async function getSubservicesRecommendation(userid:String, topk:Number, on:Boolean): Promise<Subservice[]> {
    try {
      return await fetch(_API_URL+'getServiceRecommendations?userid='+userid+"&on="+on+"&topk="+topk,
      {method:'GET',
      headers:{"Accept": "application/json",
      "Content-Type": "application/json",
      "GRAPHDB_SERVER":_GRAPHDBSERVER}})
      .then((response: { json: () => any; }) => response.json())
      .then((data: Subservice[]) => data as Subservice[]);
    } catch (error) {
      console.log(error)
      return error
    }
  
  }
  


  async function getNextElement(cf:JSON[], elementUI:String){
    try{
      return await fetch(_API_URL+'predictNextStepBasedonContext?isExclusive='+false+"&elementUI="+elementUI,
      {method:'POST',
      headers:{"Accept": "application/json",
      "Content-Type": "application/json",
      "GRAPHDB_SERVER":_GRAPHDBSERVER},
      body: JSON.stringify(cf)})
      .then((response: { json: () => any; }) => response.json())
    }
    catch(error){
      console.log("calculateRatings()")
      console.log(error)
      return error
    }
  }

  
  export {Subservice, calculateRatings, getSubservicesRecommendation, getNextElement};