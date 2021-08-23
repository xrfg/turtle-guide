import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./app.scss";
import Guide from "./Components/Guide/Guide";
import Form from "./Pages/SignUp/Form";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <h1>My React App</h1>
            <h2>if the route is "/guide" display Guide wraping component</h2>
          </Route>
          <Route exact path="/singup">
            <Form/>
            
          </Route>

          <Route path="/guide">
            <Guide />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
