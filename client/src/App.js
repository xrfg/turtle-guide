import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Guide from "./Components/Guide/Guide";
import Account from "./Pages/Account/Account";
import Navbar from "./Components/Navbar/Navbar";

/**
 * @description default CSS from SASS
 */
import "./css/main.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <h1>My React App</h1>
            <h2>if the route is "/guide" display Guide wraping component</h2>
          </Route>
          <Route path="/account" component={Account} />

          <Route path="/guide">
            <Guide />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
