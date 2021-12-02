import React, { ReactNode } from "react";
import { Route, RouteComponentProps, Redirect } from "react-router-dom";

interface PrivateRouteProps extends RouteComponentProps {
  children?: ReactNode;
}

export default function PrivateRoute({ children, ...rest }: PrivateRouteProps) {
  // isAuth
  const isAuth = false;
  return (
    <Route
      {...rest}
      render={() => {
        return isAuth ? children : <Redirect to="/" />;
      }}
    />
  );
}
