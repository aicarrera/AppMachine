import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image,Text, Stack, useToast, VStack, IconButton } from '@chakra-ui/react'
//import useMatomo from '@jonkoops/matomo-tracker-react/lib/useMatomo';
import { useState } from 'react';
import { BiHappy, BiMeh, BiSad } from 'react-icons/bi';
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

  function handleRating(e, id, title, parameter, interactionValue){

    trackevent(e.target.id,"recommended",JSON.stringify({service:title, information: [{parameter:"sugar", value:parameter}]}),interactionValue); 
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
      <VStack spacing={'5px'}>     
      <Card align={"center"} variant="elevated" >    
      <CardBody id={id} >
      <Stack mt='6' spacing='1' alignItems={"center"}> 
        <Heading size='sm'>{title}</Heading>   
        <Image className="BasicCard_thumbnail" alt="todo" src={thumbnailUrl}   borderRadius='full'  boxSize='50px'/>              
        {includeControls ? <NumberInput label={"Sugar"} idIncrement={"btn4sugarinc"} idDecrease={"btn4sugardec"} defaultValue={sugar} onChange={handleChangeInput}></NumberInput> : null  }        
        </Stack>
      </CardBody>
      <CardFooter   justify='space-between'
          flexWrap='wrap'
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}>
      {includeControls ?        
        <ButtonGroup variant='solid' spacing='3' alignItems={"flex-start"}>            
        <Text fontSize='md'> Select:</Text>     
          <Button id={'btn5yes'} onClick={e=>handleSelect(e,title,2)} colorScheme='blue'>Yes</Button>
          <Button id={'btn5no'} onClick={e=> handleSelect(e,title,1, false) } colorScheme='blue'>No</Button> 
        </ButtonGroup>             
    
      : <Button id={'btn5'+title} onClick={e=>handle_nextStep(title,e)} colorScheme='blue'>Select</Button> }
  
      </CardFooter>
      </Card>
      {includeControls ? 
        <ButtonGroup variant='solid' spacing='3' alignItems={'flex-end'} colorScheme={"gray"}>  
        <Text fontSize='xs'> Rate:</Text>
         <IconButton id={'btn5happy'} colorScheme='blue' aria-label='Happy' variant='outline' icon={<BiHappy />} onClick={e=>{handleRating(e,id,title,value,1)}}/>  
         <IconButton id={'btn5meh'}  colorScheme='blue' aria-label='Meh'variant='outline' icon={<BiMeh />} onClick={e=>{handleRating(e,id,title,value,0)}}/>  
         <IconButton id={'btn5sad'}  colorScheme='blue' aria-label='Sad' variant='outline' icon={<BiSad />} onClick={e=>{handleRating(e,id,title,value,-1)}}/>  
                
       </ButtonGroup>
      : null}

      </VStack> 
    );
  }
  
  export default BasicCard;
  