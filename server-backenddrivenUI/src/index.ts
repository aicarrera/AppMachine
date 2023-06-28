import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schema/types";
import resolvers from "./schema/resolvers";
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
const cors = require('cors');

const main = async () => {
    const app = express();
    app.use(cors());

     
    const apolloServer = new ApolloServer({
     
      typeDefs,
      resolvers,
      plugins: [       
        ApolloServerPluginLandingPageGraphQLPlayground(),
      ],
      });
      
      await apolloServer.start();

      apolloServer.applyMiddleware({
        app,
        cors: false,
      });  
      app.listen(parseInt("4000"), () => {
        console.log("server started on localhost:4000");
      });

};

main().catch((err) => {
    console.error(err);
  });