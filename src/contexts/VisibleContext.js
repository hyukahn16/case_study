import React, { createContext, useState, useContext } from "react";

// Create Context
const VisibleContext = createContext();

// Provide Context
export const VisibleProvider = ({ children }) => {

    const [visibility, setVisibility] = useState(false);

    return (
        <VisibleContext.Provider value={{ visibility, setVisibility }}>
            {children}
        </VisibleContext.Provider>
    );
};

// Custom hook for accessing chat context
export const useVisibleContext = () => useContext(VisibleContext);