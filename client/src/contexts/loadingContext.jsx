import { createContext } from "react";

export const LoadingContext = createContext();

export const LoadingProvider = ({ children, isLoading, setLoading }) => {
  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
