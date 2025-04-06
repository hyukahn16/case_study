import React, { createContext, useState, useContext } from "react";

// Create Context
const LoadingContext = createContext();

// Provide Context
export const LoadingProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

// Custom hook for accessing Loading context
export const useLoadingContext = () => useContext(LoadingContext);