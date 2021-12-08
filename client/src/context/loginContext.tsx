// import { useLocalStorage } from "@hooks/useLocalStorage";
import { useAuthQuery, useLogoutMutation } from "@generated";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface LoginState {
  isLogin: boolean;
  userId: string;
  login: () => void,
  logout: () => void,
}

const LoginContext = createContext<LoginState>({
  isLogin: false,
  userId: "",
  login: () => { },
  logout: () => { }
});

export const useLogin = () => useContext(LoginContext);

export default function LoginProvider({ children }: { children: ReactNode }) {
  const [authresult, _reexecute] = useAuthQuery({ requestPolicy: "cache-and-network" });
  const [_logoutState, logoutMutation] = useLogoutMutation()

  const { data } = authresult;

  let _userId = data?.me ? data.me.userId : "";
  let _isLogin = Boolean(data?.me.isAuth);

  const login = () => {
    if (data?.me.isAuth) return;
    _reexecute();
  }

  const logout = () => {
    if (!data?.me.isAuth) return;
    logoutMutation()
  }

  return (
    <LoginContext.Provider
      value={{
        isLogin: _isLogin,
        userId: _userId,
        login,
        logout
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
