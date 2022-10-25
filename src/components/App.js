import { useContext } from "react";
import { Route, Redirect, Switch } from 'react-router-dom'
import { UserContext } from "./UserContext";

import Login from "./Login";
import Navbar from "./Navbar";


function App() {

  const { loggedIn } = useContext(UserContext);

  return (
    <>
      {/* Redirects when not logged in */}
      {loggedIn ? null : <Redirect to="/login" />}

      <Navbar />

      <Switch>
        <Route exact path="/">
          <Redirect to="/dex" />
        </Route>

        <Route exact path="/dex">
          <h1>HI</h1>
        </Route>

        <Route exact path="/login">
          {/* Redirects to dex when logged in */}
          {loggedIn ? <Redirect to="/dex" /> : <Login />}
        </Route>

      </Switch>
    </>
  );
}

export default App;
