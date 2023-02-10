"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql) `
interface ICard {
  component:  String!
  data: ICardData
}
interface ICardData {
  title: String!
  linkUrl: String!
}
type GridItem {
  thumbnailUrl: String!
  subTitle: String!
}

type BasicCardData implements ICardData{
  title: String!
  thumbnailUrl: String!
  textLink: String!
  linkUrl: String!
}

type BasicCard implements ICard{
  component: String!
  data: BasicCardData
}

type GridCardData implements ICardData{
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
  title: String!
  textLink: String!
  linkUrl: String!
}

type ActionCard implements ICard{
  component: String!
  data: ActionCardData
}

type AdvertisementCardData implements ICardData{
  title: String!
  thumbnailUrl: String!
  linkUrl: String!
}

type AdvertisementCard implements ICard{
  component: String!
  data: AdvertisementCardData
}

#union Card = BasicCard | GridCard | ActionCard | AdvertisementCard

type Query {
  featuredItems: [ICard!]!
  discountedItems: [ICard!]!
  recommendedForYouItems: [ICard!]!
}
`;
//# sourceMappingURL=types.js.map