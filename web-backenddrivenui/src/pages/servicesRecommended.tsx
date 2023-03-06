import { Key } from "react";
import * as constants from "../config/constants";

function ServicesRecommended({recommended, servicepreparation={}, setServicePreparation={}, includeControls=false,  setActiveTab={}}){
    //? if recommended is not null


   return (recommended?.map((item: { component: string; data: JSX.IntrinsicAttributes; }, i: Key) => {  
        const itemComponent = item?.component?? "BasicCard";   
        const GCard = constants.Cards[itemComponent];
        return <GCard key={i} {...item?.data} serviceSelected={servicepreparation} setServiceSelected={setServicePreparation} includeControls={includeControls}   setActiveTab={setActiveTab}/>;
      }))
}
export default ServicesRecommended