import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image,Text, Stack, useToast, VStack, IconButton } from '@chakra-ui/react'

//import useMatomo from '@jonkoops/matomo-tracker-react/lib/useMatomo';
import { useEffect, useState } from 'react';
import { BiHappy, BiMeh, BiSad } from 'react-icons/bi';
import { trackevent } from '../../functions/useTrackersGA4';
import NumberInput from "../Inputs/NumberInput";
import * as constants from "../../config/constants";
 /**
 * TMP
 * @param r 
 * @returns 
 */
 async function getSugar({ title }){
  try{
  
    const res= await fetch(constants._API_URL+'getSugar?service='+title,
    {method:'GET',   
    headers:{"Accept": "application/json",
    "Content-Type": "application/json",
    "GRAPHDB_SERVER":constants._GRAPHDBSERVER},
    });
    console.log(res);
    return await res.json();
   
  }
  catch(error){
    console.log("getSugar()");
    console.log(error);
    return error
  }
}


  function BasicCard({id, thumbnailUrl, title, setServiceSelected, serviceSelected, includeControls=false,  setActiveTab , order}) {
  //const { trackEvent  } = useMatomo()
  const [value, setValue] = useState<number>(0);
  if (includeControls)   {
  useEffect(() => {
    async function fetchData() {
      const sugar = await getSugar( {title} );
      console.log("BasicCard "+sugar.valueInt)
      setValue(sugar.valueInt);
    }
    fetchData();
  }, [title]);
  }
  const toast = useToast();  
  
  const [buttonState, setButtonState] = useState(null);
  //TRANSLATE TO SPANISH REPLACED TITLE
  var spanish_translate = title
  var spanish_description= "Compra esta bebida!"
  if (title in constants.translationDictionary){
    spanish_translate= constants.translationDictionary[title].value;
    spanish_description=constants.translationDictionary[title].description;
  }
 
  function handleSelect(e, title:String, index:number, acceptRecommendation:boolean=true) {  
   if (acceptRecommendation){  
      const updatedService = { service:title, information: [{parameter:"sugar", value:value}] }  
      setServiceSelected(updatedService)
      trackevent(e.currentTarget.id,"recommended",JSON.stringify(updatedService),1);    
   }
   else{
      trackevent(e.currentTarget.id,"recommended",JSON.stringify({service:title, information: [{parameter:"sugar", value:value}],"order":order}),-1);         
   }
   setActiveTab(index); 
   //trackEvent({ category: 'button', action: 'click-event'});  //matomo
  }

  async function handleRating(e, id, title, parameter, interactionValue){
    trackevent(e.currentTarget.id,"recommended",JSON.stringify({service:title, information: [{parameter:"sugar", value:parameter}],"order":order}),interactionValue); 
    toast({      
      description: "Thanks for rating "+title,
      status: 'success',
      duration: 1500,
      isClosable: true,
    });
    //changeColorButton(interactionValue)
  }
  /*function changeColorButton(interactionValue){
    setButtonState(interactionValue);
  }*/
   function handleChangeInput(value: number) {
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
      <VStack spacing={'5px'} paddingBottom={"15px"}>     
      <Card align={"center"} variant="elevated" >    
      <CardBody id={id} >
      <Stack mt='6' spacing='1' alignItems={"center"}> 
        <Heading size='sm'>{spanish_translate}</Heading>   
        <Image className="BasicCard_thumbnail" alt="todo" src={thumbnailUrl}   borderRadius='full'  boxSize='50px'/>              
        {includeControls ? <NumberInput label={"Sugar"} idIncrement={"btn4sugarinc"} idDecrease={"btn4sugardec"} defaultValue={value} onChange={handleChangeInput}></NumberInput> : null  }        
        <Text size='xs' width={40} align={'center'} noOfLines={3}>{spanish_description}</Text>   
        
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
          <Button id={'btn5yes_'+title} onClick={e=>handleSelect(e,title,2)} colorScheme='blue'>Yes</Button>
          <Button id={'btn5no_'+title} onClick={e=> handleSelect(e,title,1, false) } colorScheme='blue'>No</Button> 
        </ButtonGroup>             
    
      : <Button id={'btn5'+title} onClick={e=>handle_nextStep(title,e)} colorScheme='blue'>Select</Button> }
  
      </CardFooter>
      </Card>
      {includeControls ? 
        <ButtonGroup variant='solid' spacing='3' alignItems={'flex-end'} isDisabled={buttonState === null ? false : true} >  
        <Text fontSize='xs'> Rate:</Text>
         <IconButton id={'btn5happy_'+title} colorScheme={buttonState === 1 ? 'green' : 'gray'}  aria-label='Happy' variant='outline' icon={<BiHappy />} onClick={e=>{handleRating(e,id,title,value,1)}}/>  
         <IconButton id={'btn5meh_'+title}  colorScheme={buttonState === 0 ? 'yellow' : 'gray'} aria-label='Meh'variant='outline' icon={<BiMeh />} onClick={e=>{handleRating(e,id,title,value,0)}}/>  
         <IconButton id={'btn5sad_'+title}  colorScheme={buttonState === -1 ? 'red' : "gray"} aria-label='Sad' variant='outline' icon={<BiSad />} onClick={e=>{handleRating(e,id,title,value,-1)}}/>  
                
       </ButtonGroup>
      : null}

      </VStack> 
    );
  }
  
  export default BasicCard;
  