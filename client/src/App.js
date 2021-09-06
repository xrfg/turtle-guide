import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//* Import Pages
import Account from "./Pages/Account/Account";
import AboutAdmin from "./Pages/AboutAdmin/AboutAdmin";
import Guide from "./Components/Guide/Guide";
import Event from "./Pages/Event/Event";
import Section from "./Pages/Section/Section";
import SignUp from "./Pages/SignUp/SignUp";
import SignIn from "./Pages/SignIn/SignIn";

// * Import Components
import Navbar from "./Components/Navbar/Navbar";
// REDUX
import { Provider } from "react-redux";
import Store from "./store/index";

// * Mat UI
import { theme } from "../src/styles/Theme";
import { MuiThemeProvider } from "@material-ui/core/styles";

function App() {
  return (
    <Provider store={Store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/">
                <h1>My React App</h1>
                <h2>
                  if the route is "/guide" display Guide wraping component
                </h2>
              </Route>
              <Route exact path="/admin" component={SignUp} />
              <Route path="/account" component={Account} />

              {/*
          // ! TEMPORARY LINK 
        */}
              <Route path="/aboutadmin" component={AboutAdmin} />
              {/* <Route
                path="/create-event"
                render={(props) => <Event {...props} id={1} />}
              /> */}
              <Route exact path="/admin/event/:name" component={Event} />
              {/* sections takes id or name */}
              <Route
                exact
                path="/admin/event/sections/:id"
                component={Section}
                // render={(props) => <Section {...props} />}
              />
              <Route path="/guide">
                <Guide />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
