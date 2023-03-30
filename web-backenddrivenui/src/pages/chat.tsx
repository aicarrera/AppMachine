import { Button, Heading, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
//import { OPENAI_KEY } from "../config/constants";

const referenceCode=""

const fetchData = async (input: string) => {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        prompt: `Only using functions in the reference code  Write a full code with all necessary imports for the following task:"${input}. Do not write explanations."`,
        model: "gpt-3.5-turbo",
        max_tokens: 50,
        n: 1,
        stop: ".",
      },
      {
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${OPENAI_KEY}`,
        },
      }
    );
  
    return response.data.choices[0].text;
  };
function chat() {
    const [input, setInput] = useState("");
    const [completedSentence, setCompletedSentence] = useState("");
    
    async function handleClick() {
      try {
        const completedSentence = await fetchData(input);
        setCompletedSentence(completedSentence);
      } catch (error) {
        console.error(error);
      }
    }
  
    return (
      <VStack className="container">
        <Heading size={"sm"}>Tell me something, and I'll tell you more</Heading>
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={5}
          placeholder="Type in some words and I'll finish the rest..."
        />
        <Button className="button" onClick={handleClick}>Complete Sentence</Button>
        {completedSentence && <p>Completed sentence: {completedSentence}</p>}
      </VStack>
    );
  }
  export default chat;