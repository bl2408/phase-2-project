import { useContext, createContext, useState, useEffect } from "react";
import { Route, Redirect, Switch, useRouteMatch } from 'react-router-dom'
import { UserContext } from "./UserContext";

import Login from "./Login";
import Header from "./Header";
import Loader from "./Loader";
import Dash from "./Dash";

const AppContext = createContext();

const defaultAppState = {
  offline: false,
  loading: false,
  theme: "light"
}

function App() {

  const [appState, setAppState] = useState(defaultAppState);

  const { loggedIn } = useContext(UserContext);

  useEffect(()=>{

    document.documentElement.dataset.theme = appState.theme;

  }, [appState.theme]);


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

      <div id="orb"></div>

      <div className="wrap" id="header-main">
        <Header />
      </div>
      <div id="header-design">
          <div id="header-bend">

          </div>
      </div>

      <div className="wrap">
        <main>
          <div id="content-main">
            
            <Switch>
              <Route exact path="/">
                {loggedIn ? <Redirect to="/dash" /> : <Redirect to="/login" /> }
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

          </div>
        </main>
      </div>

      <div id="footer-design"></div>
      <div className="wrap" id="footer-main">
            <footer></footer>
      </div>
    </AppContext.Provider>
  );
}

export {App, AppContext, defaultAppState};
