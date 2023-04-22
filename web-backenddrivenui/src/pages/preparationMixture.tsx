import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Heading, HStack, Icon, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import NumberInput from "../components/Inputs/NumberInputPrep";
import YesNo from "../components/YesNo";
import { CiGlass } from 'react-icons/ci'
import { HiCube } from 'react-icons/hi'
import { BiVector } from 'react-icons/bi'
import { ContextFilter, Information, RequestNextStep, Service } from "../config/interfaces";
import * as constants from "../config/constants";
import { useEffect, useState } from "react";
import ServicesRecommended from "./servicesRecommended";
import { trackevent } from "../functions/useTrackersGA4";


    
/**
 * 
 * @param r 
 * @returns 
 */
async function getNextElement(r:RequestNextStep){
    try{
      console.log(r);
      const res= await fetch(constants._API_URL+'predictNextStepBasedonContext',
      {method:'POST',   
      headers:{"Accept": "application/json",
      "Content-Type": "application/json",
      "GRAPHDB_SERVER":constants._GRAPHDBSERVER},
      body: JSON.stringify(r)}
      );
      
      return await res.json();
    }
    catch(error){
      console.log("getNextElement()");
      console.log(error);
      return error
    }
  }


  

const PreparationMixture = ({recommended,contextFilter, setServiceSelected, setActiveTab}) => {
  const [servicepreparation, setServicePreparation] = useState<Service>({service:"", information:[{parameter: "Additive", value:"-"},{parameter: "Container", value:"Yes"}]});;

  async function handleTriggerClick(cf:ContextFilter[],historyElementUI:String[],elementId:string) {  
    //var data= await getNextElement({contextList:cf,elementUI:historyElementUI});
    //var button1 = document.getElementById(data.element);
    //button1.click(); por ahora esto se desactiva
    trackevent(elementId,"preparation",JSON.stringify(servicepreparation));    
  }
/*const handleAddInformation = (information: Information) => {
  setServicePreparation({...servicepreparation, information: [...servicepreparation.information, information]});
}
const handleRemoveInformation = (parameter: string) => {
  setServicePreparation({...servicepreparation, information: servicepreparation.information.filter(l => l.parameter !== parameter)});
}*/

const handleUpdateLocation = (parameter: string, information: Information) => {
  const updatedLocations = servicepreparation.information.map(item => {
      if (item.parameter === parameter) {
          return information;
      }
      return item;
  });
  setServicePreparation({...servicepreparation, information: updatedLocations});
}

  const handleChange = ( valueInput: number) => {   
   useEffect(() => { 
      handleUpdateLocation("sugar",{parameter:"sugar", value:valueInput.toString()})
   },[valueInput]); 
  }
  const handlePreparation = ()=>{    
    setServiceSelected(servicepreparation);
    setActiveTab(2);  
  }

  const mixtures= [
    {
      __typename: 'BasicCard',
      component: 'BasicCard',
      data: {
        __typename: 'BasicCardData',
        id: '13',
        title: 'Mixture 5',
        thumbnailUrl: 'https://static.vecteezy.com/system/resources/previews/016/279/297/non_2x/line-icon-for-mixture-vector.jpg'
      }
    },
    {
      __typename: 'BasicCard',
      component: 'BasicCard',
      data: {
        __typename: 'BasicCardData',
        id: '13',
        title: 'Mixture 2',
        thumbnailUrl: 'https://static.vecteezy.com/system/resources/previews/016/279/297/non_2x/line-icon-for-mixture-vector.jpg'
      }
    },
    {
      __typename: 'BasicCard',
      component: 'BasicCard',
      data: {
        __typename: 'BasicCardData',
        id: '13',
        title: 'Mixture 4',
        thumbnailUrl: 'https://static.vecteezy.com/system/resources/previews/016/279/297/non_2x/line-icon-for-mixture-vector.jpg'
      }
    },  {
      __typename: 'BasicCard',
      component: 'BasicCard',
      data: {
        __typename: 'BasicCardData',
        id: '13',
        title: 'Mixture 7',
        thumbnailUrl: 'https://static.vecteezy.com/system/resources/previews/016/279/297/non_2x/line-icon-for-mixture-vector.jpg'
      }
    }
  ]
return (
<VStack w="full" h="full" padding={10} alignItems="flex-start"  spacing={'10px'} borderWidth="1px" borderColor="gray.300" borderRadius="md">
<Heading as='h4' size='md'> Mixture Preparation Process</Heading>  
<Box    color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'>                                                                                               
   <YesNo label={"Assistance: "} id={"btn2assistance"} />   
 

</Box>
<Accordion w="100%" allowMultiple>
  <AccordionItem>
    <h2>
      <AccordionButton  onClick={()=>handleTriggerClick(contextFilter,["btn1sugar"],"btn1sugar")} >
        <HStack as="span" flex='1' textAlign='left'>
        <Icon as={HiCube} /> <Text size={"md"}> {servicepreparation.information[0].parameter.toUpperCase()}: {servicepreparation.information[0].value}</Text>
        </HStack>
        <AccordionIcon/>
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      <NumberInput label={"Additive: "} idIncrement={"btn3sugarinc"} idDecrease={"btn3sugardec"} onChange={handleChange} defaultValue={3}/>
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton onClick={()=>handleTriggerClick(contextFilter,["btn1glass"],"btn1glass")} >
        <HStack as="span" flex='1' textAlign='left'>
        <Icon as={CiGlass} />  <Text> {servicepreparation.information[1].parameter.toUpperCase()}: {servicepreparation.information[1].value}</Text>     
        </HStack>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
        <YesNo label={"Container? "} id={"btn2glass"} defaultValue={true} />
    </AccordionPanel>
  </AccordionItem>
  <AccordionItem>
    <h2>
      <AccordionButton onClick={()=>handleTriggerClick(contextFilter,["btn1drink"],"btn1drink")} >
        <HStack as="span" flex='1' textAlign='left'>
        <Icon as={BiVector} /> <Text> Mixture: {servicepreparation.service}</Text>   
        </HStack>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>

    <SimpleGrid w="full" spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' alignItems="center">              
        <ServicesRecommended recommended={mixtures} servicepreparation={servicepreparation} setServicePreparation={setServicePreparation} />
      </SimpleGrid>
    </AccordionPanel>
  </AccordionItem>
</Accordion>
<Button id={'btn5ok'} onClick={e=>handlePreparation()} colorScheme='blue' alignSelf={"center"}>Select</Button> 
</VStack>

);

}
export default PreparationMixture