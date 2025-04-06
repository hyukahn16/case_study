import React, { createContext, useState, useContext } from "react";

// Create Context
const ChatContext = createContext();

// Provide Context
export const ChatProvider = ({ children }) => {
  	const defaultMessage = [{ 
		role: "assistant",
      	content: "Hi! I'm PartSelect's Chatbot to assist you in Refrigerator \
               	  and Dishwasher parts.\nHow can I help you today?",
    }];

  	const [messages, setMessages] = useState(defaultMessage);

  	return (
    	<ChatContext.Provider value={{ messages, setMessages, defaultMessage }}>
    		{children}
    	</ChatContext.Provider>
  	);
};

// Custom hook for accessing chat context
export const useChatContext = () => useContext(ChatContext);