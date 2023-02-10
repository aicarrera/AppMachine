import { AccordionButton, AccordionIcon, Box, Icon } from "@chakra-ui/react";


function UserAccordionButton(props) {
    return (   
    <AccordionButton id={props.buttonId}  >
    <Box as="span" flex='1' textAlign='left'>
      Sugar 
    </Box>
    <AccordionIcon/>
  </AccordionButton>);
  }
  