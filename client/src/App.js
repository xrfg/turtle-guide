import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//* Import Pages
import Account from "./Pages/Account/Account";
import AboutAdmin from "./Pages/AboutAdmin/AboutAdmin";

// * Import Components
import Guide from "./Components/Guide/Guide";
import Navbar from "./Components/Navbar/Navbar";
import Event from "./Pages/Event/Event";

// * Mat UI
import { theme } from "../src/styles/Theme";
import { MuiThemeProvider } from "@material-ui/core/styles";

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <h1>My React App</h1>
              <h2>if the route is "/guide" display Guide wraping component</h2>
            </Route>
            <Route path="/account" component={Account} />
            {/*
          // ! TEMPORARY LINK 
        */}
            <Route path="/aboutadmin" component={AboutAdmin} />
            <Route path="/create-event" component={Event} />

            <Route path="/guide">
              <Guide />
            </Route>
          </Switch>
        </div>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
