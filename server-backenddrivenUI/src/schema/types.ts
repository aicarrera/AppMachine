import { gql } from "apollo-server-express";


export default gql`
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

`