import React, { createContext, useReducer, useEffect, useContext } from "react";
import { reducer, initialState } from "./reducers/userReducer";

// import "./App.css";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import SingIn from "./components/Page/SingIn";
import SingUp from "./components/Page/SingUp";
import Home from "./components/Page/Home";
import ButterToast, { POS_CENTER, POS_BOTTOM } from "butter-toast";
import Navbar from "./components/Item/Navbar";
import CreatePost from "./components/Page/CreatePost";

export const UserContext = createContext();

const Routing = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "USER", payload: user });
      history.push("/");
    } else {
      history.push("/singin");
    }
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/singup" component={SingUp} />
      <Route path="/singin" component={SingIn} />
      <Route path="/createpost" component={CreatePost} />
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        {state ? <Navbar /> : ""}

        <Routing />
        <ButterToast
          position={{ vertical: POS_BOTTOM, horizontal: POS_CENTER }}
        />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
