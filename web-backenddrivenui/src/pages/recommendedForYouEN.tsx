import { Heading, Icon, VStack, HStack, Stack } from "@chakra-ui/react"
import { BiBadge, BiBookmarkHeart, BiCoffee } from "react-icons/bi"
import ServicesRecommended from "./servicesRecommended";

const Recommended = ({firstRecommended, setActiveTab, setServiceSelected, userid}) => {
  return(
  <VStack w="full" h="full" p={5} alignItems="flex-start"  spacing={'2px'} borderWidth="1px" borderColor="gray.300" borderRadius="md">
    <Heading as='h4' size='md'>  <Icon as={BiBookmarkHeart} />  Recommended for you </Heading>       
    <Heading as='h3' size='sm'>  <Icon as={BiCoffee} />  Based on your preferences and other users like you at this time, we recommend these services: </Heading>  

      
    <Stack  direction={['column', 'row']}  w="full" h="full" p={5} alignItems="flex-start"  spacing={'5px'} flexWrap="wrap" paddingRight={"0"} paddingLeft={"0"}>  
    <ServicesRecommended recommended={firstRecommended}  includeControls={true}  setActiveTab={setActiveTab} setServicePreparation={setServiceSelected}  userid={userid}/>
    </Stack>
    <Heading as='h3' size='sm'>  <Icon as={BiBadge} />  The average SUGAR Level is 1 </Heading>  
  </VStack>
  );

}
export default Recommended