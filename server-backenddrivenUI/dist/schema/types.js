"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql) `
interface ICard {
  component:  String!
  data: ICardData
}
interface ICardData {
  id: String!
  title: String!

}
type GridItem {
  thumbnailUrl: String!
  subTitle: String!
}

type BasicCardData implements ICardData{
  id: String!
  title: String!
  thumbnailUrl: String!
 

}

type BasicCard implements ICard{
  component: String!
  data: BasicCardData
}

type GridCardData implements ICardData{
  id: String!
  title: String!
  grid: [GridItem]!
  textLink: String!
  linkUrl: String!
}

type GridCard implements ICard{
  component: String!
  data: GridCardData
}

type ActionCardData implements ICardData{
  id: String!
  title: String!
  textLink: String!
  linkUrl: String!
}

type ActionCard implements ICard{
  component: String!
  data: ActionCardData
}
input ContextFilter{
  name:String
  value:String
}
type Query { 
  recommendedForYouItems(userid:String, topk:Int, contextFilter:[ContextFilter]): [ICard!]!
}

`;
//# sourceMappingURL=types.js.map