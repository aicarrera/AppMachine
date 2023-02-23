import {calculateRatings, getSubservicesRecommendation, Subservice } from './ontologyAPI';

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
   await calculateRatings(args.contextFilter);
   return (await getSubservicesRecommendation(args.userid, args.topk, args.on)).map(x=>getBasicCard(x));  
  }
  
  export default {
    ICard: {
      __resolveType(obj:any) {
        return obj.component;
      },
    },
    Query: {         
      recommendedForYouItems      
    },
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