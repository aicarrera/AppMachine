import { gql } from "@apollo/client";

export const allItemsQuery = gql`
  query allItems {
    recommendedForYouItems {
      ... on BasicCard {
        component
        data {
          title
          thumbnailUrl
          textLink
          linkUrl
        }
      }
      ... on GridCard {
        component
        data {
          title
          textLink
          linkUrl
          grid {
            thumbnailUrl
            subTitle
          }
        }
      }
      ... on ActionCard {
        component
        data {
          title
          textLink
          linkUrl
        }
      }
      ... on AdvertisementCard {
        component
        data {
          thumbnailUrl
          linkUrl
        }
      }
    }
    discountedItems {
      ... on BasicCard {
        component
        data {
          title
          thumbnailUrl
          textLink
          linkUrl
        }
      }
      ... on GridCard {
        component
        data {
          title
          textLink
          linkUrl
          grid {
            thumbnailUrl
            subTitle
          }
        }
      }
      ... on ActionCard {
        component
        data {
          title
          textLink
          linkUrl
        }
      }
      ... on AdvertisementCard {
        component
        data {
          thumbnailUrl
          linkUrl
        }
      }
    }
    featuredItems {
      ... on BasicCard {
        component
        data {
          title
          thumbnailUrl
          textLink
          linkUrl
        }
      }
      ... on GridCard {
        component
        data {
          title
          textLink
          linkUrl
          grid {
            thumbnailUrl
            subTitle
          }
        }
      }
      ... on ActionCard {
        component
        data {
          title
          textLink
          linkUrl
        }
      }
      ... on AdvertisementCard {
        component
        data {
          thumbnailUrl
          linkUrl
        }
      }
    }
  }
`;
