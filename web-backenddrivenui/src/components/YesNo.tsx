import { Button, FormLabel, HStack, Switch,useToast } from "@chakra-ui/react"
import { useState } from "react";
import { trackevent } from "../functions/useTrackersGA4";

function YesNo({label, id, defaultValue=false, isDisabled=false}) {
  const [isChecked, setIsChecked] = useState(defaultValue);

  const toast = useToast();

  const handleswitch = (e) => {
    toast({      
      description: label,
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
    setIsChecked(!isChecked);
    trackevent(e.target.id,"preparation","","");    

  }
  return (
    <HStack maxW='320px'>
      <FormLabel>{label}</FormLabel>
    
      <Switch id={id} isChecked={isChecked}  onChange={e=>handleswitch(e)} isDisabled={isDisabled}/>

    </HStack>
  )

}
export default YesNo;