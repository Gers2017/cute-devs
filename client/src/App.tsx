import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "@modules/navbar";
import Home from "@pages/Home";
import ErrorPage from "@pages/ErrorPage";
import CuteDevPage from "@pages/CuteDevPage";
import CreatePost from "@pages/CreatePost";
import Login from "@pages/Login";
import LoginProvider, { useLogin } from "./context/authContext";
import { Provider } from "urql";
import { urqlClient } from "./urlq/client";
import { useAuthQuery } from "@generated";

function App() {
  const [authResult, _reexecuteAuth] = useAuthQuery({
    requestPolicy: "network-only",
  });
  const { setIsLogged } = useLogin();
  if (authResult.data?.me.success) {
    const { success } = authResult.data.me;
    setIsLogged(success);
  }
  return (
    <Provider value={urqlClient}>
      <LoginProvider>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/user/login" component={Login} />
            <Route exact path="/posts/" component={CreatePost} />
            <Route exact path="/devs/:id/" component={CuteDevPage} />
            <Route exact path="/*" component={ErrorPage} />
          </Switch>
        </BrowserRouter>
      </LoginProvider>
    </Provider>
  );
}

export default App;
