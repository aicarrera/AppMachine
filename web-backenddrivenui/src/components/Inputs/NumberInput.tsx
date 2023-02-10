import { Button, FormLabel, HStack, Input, useToast  } from "@chakra-ui/react"
import { useState } from "react";
import { trackevent } from "../../functions/useTrackersGA4";

function NumberInput({label, idIncrement, idDecrease, onChange, defaultValue}) {
  const toast = useToast();
  const [value, setValue] = useState(defaultValue);
  const handleIncrementDecrement = (e,operation:string,valueOperation) => {
    if ((operation==="increment" && value < 3)||(operation==="decrement"&&value > 0)) {
      toast({      
        description: "We've noticed you "+operation +" sugar",
        status: 'info',
        duration: 3000,
        isClosable: true,
      })
      setValue(value + valueOperation);
      
    }
    trackevent(e.target.id,"preparation","");   
  };


  return (
    <HStack maxW='320px'>
      <FormLabel>{label}</FormLabel>
      <Button id= {idIncrement} onClick={e=>{handleIncrementDecrement(e,"increment",1)}}>+</Button>
      <Input value={value} htmlSize={4} width='auto' readOnly onChange={onChange(value)}/>
      <Button id= {idDecrease} onClick={e=>handleIncrementDecrement(e,"decrement",-1)}>-</Button>
    </HStack>
  )

}
export default NumberInput;