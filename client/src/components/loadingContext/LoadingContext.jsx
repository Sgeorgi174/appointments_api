import { createContext, useState } from "react";

// Создаем контекст
export const LoadingContext = createContext();
// Создаем провайдер контекста
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
