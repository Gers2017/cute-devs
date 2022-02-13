import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "@modules/navbar";
import Home from "@pages/Home";
import ErrorPage from "@pages/ErrorPage";
import CuteDevPage from "@pages/CuteDevPage";
import CreatePost from "@pages/CreatePost";
import Login from "@pages/Login";
import Register from "@pages/Register";
import Urql from "@pages/Urql";
import LoginProvider from "./context/loginContext";
import { createClient, Provider } from "urql";

const urqlClient = createClient({
  url:
    (import.meta.env.VITE_SERVER_URL as string | undefined) ||
    "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

function App() {
  return (
    <Provider value={urqlClient}>
      <LoginProvider>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/me" component={Urql} />
            <Route exact path="/" component={Home} />
            <Route exact path="/user/login" component={Login} />
            <Route exact path="/user/create" component={Register} />
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
