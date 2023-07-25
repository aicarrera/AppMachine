import {getSubservicesRecommendation, Subservice } from './ontologyAPI';
const { Client } = require('pg');
const host='postgresdb' //localhost
const connection = 'postgres://postgres:postgres@'+host+':5432/interactions'

// database connection
async function getUserById(_: any, args: any) {
  const query = 'SELECT * FROM users WHERE username = $1';
  const values = [args.userid];
  const client = new Client({
    connectionString: connection,
  });
  try {
    await client.connect();

    const result = await client.query(query, values);
    if (result.rows.length === 0) {
      throw new Error(`User not found with userId: ${args.userid}`);
    }
    return result.rows[0]; // Assuming you want to retrieve a single user

    
  } catch (error) {
    console.error('Error querying user table:', error);
    throw error;
  }
  finally{
     await client.end();

  }
}
/**
 * 
 * @param _ 
 * @param args 
 */
async function registerUser(_: any, args: any) {
  const client = new Client({
    connectionString: connection,
  });
  try {
    await client.connect();
  
  
  const result = await client.query(
    'INSERT INTO users (userid,username, role) VALUES ($1, $2, $3) RETURNING *',
    [args.userid, args.username, args.role]
  );
  return result.rows[0];
}
catch (error) {
 console.error('Error inserting table USERS:', error);
 return false;
 throw error;
}
finally{
  await client.end();

}}
/**
 * Insert Interactions
 */
async function insertInteractions(_: any, args: any) {

 // get the current time in epoch format
 const client = new Client({
  connectionString: connection,
 });
 const timestamp = Math.floor(Date.now() / 1000);

try {
  await client.connect();

 // insert a new record in the interactions table
 await client.query(
   'INSERT INTO interactions (user_id, timestamp, epoch_time, element_id, related_data, category) VALUES ($1, $2, $3, $4, $5, $6)',
   [args.userId, new Date(), timestamp, args.elementId, args.relatedData, args.category]
 );
 return true;
 }
 catch (error) {
  console.error('Error inserting table:', error);
  return false;
  throw error;
}
finally{
   await client.end();

}
}



function getBasicCard(s:Subservice) {
    return {
      component: 'BasicCard',
      data: {
        id: s.id,
        title: s.name,
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Deus_Coffee.png',
        textLink: '...',
        linkUrl: 'http://example.com/link',
      },
    };
  }
   

  async function recommendedForYouItems(_: any, args: any) {
   console.log(args.userid);
   console.log(args.topk);
   console.log(args.contextFilter);
  // await calculateRatings(args.contextFilter);
   return (await getSubservicesRecommendation(args.userid, args.topk, args.on)).map(x=>getBasicCard(x));  
  }
  
  export default {
    ICard: {
      __resolveType(obj:any) {
        return obj.component;
      },
    },
    Query: {         
      recommendedForYouItems ,
      getUserById     
    },
    Mutation:{
      insertInteractions,
      registerUser
    }
  };
  


  /*  function getGridCard() {
    return {
      component: 'GridCard',
      meta: {
        size: '2x2',
      },
      data: {
        title: 'Title',
        grid: [
          {
            thumbnailUrl: 'https://via.placeholder.com/50',
            subTitle: 'Sub Title',
          },
          {
            thumbnailUrl: 'https://via.placeholder.com/50',
            subTitle: 'Sub Title',
          },
          {
            thumbnailUrl: 'https://via.placeholder.com/50',
            subTitle: 'Sub Title',
          },
          {
            thumbnailUrl: 'https://via.placeholder.com/50',
            subTitle: 'Sub Title',
          },
        ],
        textLink: 'Ver mas',
        linkUrl: 'http://example.com/link',
      },
    };
  }*/