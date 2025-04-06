import React, { createContext, useState, useContext } from "react";

// Create Context
const TopicContext = createContext();

// Provide Context
export const TopicProvider = ({ children }) => {

    const [topicSelected, setTopicSelected] = useState(false);

    return (
        <TopicContext.Provider value={{ topicSelected, setTopicSelected }}>
            {children}
        </TopicContext.Provider>
    );
};

// Custom hook for accessing topic context
export const useTopicContext = () => useContext(TopicContext);