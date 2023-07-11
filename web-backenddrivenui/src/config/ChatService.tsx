import axios from 'axios';
import { OPENAI_KEY } from "./constants";
interface ChatHistory{
  role:string;
  content:string; 
}
class ChatService {
  private drinks: any[]; // Define the type for drinks
  private chatHistory: ChatHistory[];

set setDrinks(drinks:any[]){
  this.drinks=drinks;
}
 // Getter
 get getDrinks(): any[] {
  return this.drinks;
}
 // Getter
 get getChatHistory(): ChatHistory[] {
    return this.chatHistory;
  }
 // Method to return chat history with roles different than "system"
 get getChatHistoryWithDifferentRole(): ChatHistory[] {
  return this.chatHistory.filter((message) => message.role !== "system");
}
// Setter
public setChatHistory(value: ChatHistory) {
    this.chatHistory =  [...this.chatHistory, value];
}

constructor(drinks) {
    this.drinks = drinks; // Initialize drinks attribute here
    this.chatHistory = [
        {role:"system", content:"Act as a smart coffee machine. TO PREPARE A BEVERAGE YOU NEED TYPE OF DRINK AND SUGAR LEVEL. DO NOT PROVIDE EXPLANATIONS. If user message is asking a coffee, drink or beverage or if the user wants a coffee recommendation"},
        {role:"system", content:"Then only using the options in this JSON list:"+JSON.stringify(drinks.slice(0,2)) +"that has the drinks with the sugar level that the user likes.  Select the first one to recommend or serve and provide with the correct amount of sugar. Give a good reason under 20 words in Spanish. "},
        { role: "system", content: "If the user is unsatisfied with the recommendation, present an alternative from this JSON list: " + JSON.stringify(drinks) + " in natural language. If the user expresses satisfaction, repeat the order (beverage and sugar level) and bid a farewell in under 10 words with symbol. Farewell should include $ at the end." }  ]    
}

  public sendMessageToAPI = async (message: string): Promise<string> => {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        messages: [
          ...this.chatHistory,
          {role: "user", content: message}
        ],
        model: "gpt-3.5-turbo",
        n: 1
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_KEY}`,
        },
      }
    );
    const botMessage: string = response.data["choices"][0]["message"]["content"];
    const updatedChatHistory = [...this.chatHistory, {role: "user", content: message}];
    this.chatHistory = updatedChatHistory;
    return botMessage;
  };
}

export default ChatService;
