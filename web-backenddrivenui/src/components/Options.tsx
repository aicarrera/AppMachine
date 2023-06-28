import { Button, ButtonGroup, HStack } from "@chakra-ui/react";
import { useState } from "react";

const Options = (props) => {
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const handleOptionClick = (handler) => {
    setIsLoading(true); // Set isLoading to true when a button is clicked

    // Execute the provided handler function
    handler();

    // Assuming the operation is asynchronous, use setTimeout as an example
    setTimeout(() => {
      setIsLoading(false); // Set isLoading back to false after the operation is completed
    }, 2000);
  };
    return (
      <div className="options">      
      <ButtonGroup variant="outline" spacing="6">
          {props.options.map((option) => {
            return (
              <Button
              isLoading={isLoading}
              onClick={() => handleOptionClick(option.handler)} // Pass the handler function and update the loading state
              key={option.id}>     {option.name}
              </Button>
            );
          })}
        </ButtonGroup>
      </div>
    );
  };
  
  export default Options;