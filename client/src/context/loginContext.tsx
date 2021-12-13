import { useAuthQuery, useLogoutMutation } from "@generated";
import React, { createContext, ReactNode, useContext } from "react";

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
  const [authresult, _reexecute] = useAuthQuery({ requestPolicy: "network-only" });
  const [_logoutState, logoutMutation] = useLogoutMutation();

  const { data } = authresult;

  let _userId = data?.me ? data.me.userId : "";
  let _isLogin = Boolean(data?.me.isAuth);

  function login() {
    if (!data?.me.isAuth) return;
    _reexecute();
  }

  function logout() {
    if (data?.me.isAuth) return;
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
