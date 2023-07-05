import { Key } from "react";
import BasicCard from "../components/Cards/BasicCard";
const Cards = {
  BasicCard
};
function ServicesRecommended({recommended, servicepreparation={}, setServicePreparation={}, includeControls=false,  setActiveTab={}, userid}){
    //? if recommended is not null

   var order = 0;
   return (recommended?.map((item: { component: string; data: JSX.IntrinsicAttributes; }, i: Key) => {  
        const itemComponent = item?.component?? "BasicCard";   
        const GCard = Cards[itemComponent];
        order++;
        return <GCard key={i} {...item?.data} serviceSelected={servicepreparation} setServiceSelected={setServicePreparation} includeControls={includeControls}   setActiveTab={setActiveTab} order={order} userid={userid}/>;
      }))
}
export default ServicesRecommended