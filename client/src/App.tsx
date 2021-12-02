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
const client = createClient({
  url: import.meta.env.VITE_SERVER_URL,
  fetchOptions: {
    credentials: "include",
  },
});

function App() {
  return (
    <Provider value={client}>
      <LoginProvider>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/me" component={Urql} />
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Register} />
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
