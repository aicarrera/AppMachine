import { Heading, Icon, VStack, HStack, Stack } from "@chakra-ui/react"
import { BiBookmarkHeart } from "react-icons/bi"
import * as constants from "../config/constants";
import ServicesRecommended from "./servicesRecommended";

const Recommended = ({firstRecommended, setActiveTab, setServiceSelected}) => {
  return(
  <VStack w="full" h="full" p={10} alignItems="flex-start"  spacing={'2px'} borderWidth="1px" borderColor="gray.300" borderRadius="md">
    <Heading as='h4' size='md'>  <Icon as={BiBookmarkHeart} />  Recommended for you </Heading>         
    <Stack  direction={['column', 'row']}  w="full" h="full" p={10} alignItems="flex-start"  spacing={'5px'}>  
    <ServicesRecommended recommended={firstRecommended}  includeControls={true}  setActiveTab={setActiveTab} setServicePreparation={setServiceSelected} />
    </Stack>
  </VStack>
  );

}
export default Recommended