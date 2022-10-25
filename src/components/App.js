import { useContext, createContext, useState } from "react";
import { Route, Redirect, Switch } from 'react-router-dom'
import { UserContext } from "./UserContext";

import Login from "./Login";
import Navbar from "./Navbar";
import Loader from "./Loader";
import Dash from "./Dash";

const AppContext = createContext();

function App() {

  const [appState, setAppState] = useState({
    offline: false,
    loading: false,
  })

  const { loggedIn } = useContext(UserContext);


  return (
    <AppContext.Provider value={{appState, setAppState}}>
      {
        /* Redirects when not logged in */
        loggedIn ? null : <Redirect to="/login" />
      }

      {
        /* Displays loader */
        appState.loading ? <Loader /> : null
      }

      <Navbar />

      <Switch>
        <Route exact path="/">
          <Redirect to="/dash" />
        </Route>

        <Route path="/dash">
          <Dash />
        </Route>

        <Route exact path="/login">
          {
            /* Redirects to dex when logged in */
            loggedIn ? <Redirect to="/dash" /> : <Login />
          }
        </Route>

      </Switch>
    </AppContext.Provider>
  );
}

export {App, AppContext};
