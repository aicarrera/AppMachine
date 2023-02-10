import { Button, ButtonGroup, Card, CardBody, CardFooter, Heading, Image, Stack, useToast } from '@chakra-ui/react'
//import useMatomo from '@jonkoops/matomo-tracker-react/lib/useMatomo';
import { useState } from 'react';
import { trackevent } from '../../functions/useTrackersGA4';
import NumberInput from "../Inputs/NumberInput";


function BasicCard({id, thumbnailUrl, title, setServiceSelected, serviceSelected, includeControls=false, sugar=0, setActiveTab }) {
  //const { trackEvent  } = useMatomo()
  const toast = useToast();  
  const [value, setValue] = useState(sugar);     
  
  function handleSelect(e, title:String, index:number, acceptRecommendation:boolean=true) {  
   if (acceptRecommendation){  
      const updatedService = { service:title, information: [{parameter:"sugar", value:value}] }  
      setServiceSelected(updatedService)
      trackevent(e.target.id,"recommended",JSON.stringify(updatedService),1);    
   }
   else{
      trackevent(e.target.id,"recommended",JSON.stringify({service:title, information: [{parameter:"sugar", value:value}]}),0);         
   }
   setActiveTab(index); 
   //trackEvent({ category: 'button', action: 'click-event'});  //matomo
  }

  
  const handleChangeInput = (value: number) => {
    setValue(value);
  }
  
  function handle_nextStep(title:String,e){
    setServiceSelected({...serviceSelected, service:title})
    toast({      
      description: "We've noticed "+title+" is a popular selection",
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
    trackevent(e.target.id,"preparation",JSON.stringify(serviceSelected));   

  }
    return (     
      <Card align={"center"} variant="elevated" >    
      <CardBody id={id} >
      <Stack mt='6' spacing='1' alignItems={"center"}> 
        <Heading size='sm'>{title}</Heading>   
        <Image className="BasicCard_thumbnail" alt="todo" src={thumbnailUrl}   borderRadius='full'  boxSize='50px'/>              
        {includeControls ? <NumberInput label={"Sugar"} idIncrement={"btn4sugarinc"} idDecrease={"btn4sugardec"} defaultValue={sugar} onChange={handleChangeInput}></NumberInput> : null  }        
        </Stack>
      </CardBody>
      <CardFooter>
      {includeControls ?   
        <ButtonGroup variant='solid' spacing='3' alignItems={"flex-start"}>            
          <Heading size='sm'> Select? </Heading>        
          <Button id={'btn5yes'} onClick={e=>handleSelect(e,title,2)} colorScheme='blue'>Yes</Button>
          <Button id={'btn5no'} onClick={e=> handleSelect(e,title,1, false) } colorScheme='blue'>No</Button> 
        </ButtonGroup>
      : <Button id={'btn5'+title} onClick={e=>handle_nextStep(title,e)} colorScheme='blue'>Select</Button> }
        
      </CardFooter>
      </Card>
    );
  }
  
  export default BasicCard;
  