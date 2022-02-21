import { createContext, ReactNode, useContext, useState } from "react";

interface LoginState {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
}

const LoginContext = createContext<LoginState>({
  isLogged: false,
  setIsLogged: () => {},
});

export const useLogin = () => useContext(LoginContext);

export default function LoginProvider({ children }: { children: ReactNode }) {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <LoginContext.Provider
      value={{
        isLogged,
        setIsLogged,
      }}>
      {children}
    </LoginContext.Provider>
  );
}
