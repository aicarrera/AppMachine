import { Heading, VStack,Text, Button } from "@chakra-ui/react";
import router from "next/router";
import { trackevent } from "../functions/useTrackersGA4";
import { Service } from "../config/interfaces";

const Buy = ({serviceSelected, userid}:{serviceSelected:Service,userid:any}) => {
    
    function handleclick(e){
      trackevent(e.target.id,"ticket",JSON.stringify(serviceSelected), userid);         
      router.push({
         pathname: "/",      
       });
   }
 return(
    <VStack w="full" h="full" p={10} alignItems="center"  spacing={'2px'} borderWidth="1px" borderColor="gray.300" borderRadius="md">

    {serviceSelected?.service ?? '' ? <Heading size={"md"} color='blue'>Gracias por tu compra!</Heading> : <Heading size={"md"} color='tomato'>Por favor, selecciona una bebida para comprar</Heading>}
    <Text fontSize='xl'>Service:  {serviceSelected?.service ?? '' ? serviceSelected?.service.toUpperCase() : '-'}</Text>
    {
    serviceSelected?.information?.map((item,i) => {     
    return <Text fontSize='xl'>{item.parameter}:  {item.value}</Text>          
    })}
    <Button id={'btn1ok'} onClick={e=>handleclick(e)} colorScheme='blue' alignSelf={"center"}>Terminar Compra</Button> 
    </VStack>
 );
}

export default Buy;