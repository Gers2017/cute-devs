import { useLocalStorage } from "@hooks/useLocalStorage";
import React, { createContext, ReactNode, useContext } from "react";
interface LoginState {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
}
const initialValue = { isLogged: false, setIsLogged: (value: boolean) => {} };
const LoginContext = createContext<LoginState>(initialValue);

export const useLogin = () => useContext(LoginContext);

export default function LoginProvider({ children }: { children: ReactNode }) {
  const [isLogged, _setIsLogged] = useLocalStorage(
    "jogg",
    initialValue.isLogged,
  );

  function setIsLogged(value: boolean) {
    _setIsLogged(value);
  }

  return (
    <LoginContext.Provider
      value={{
        isLogged,
        setIsLogged,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
