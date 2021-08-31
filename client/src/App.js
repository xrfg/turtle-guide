import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//* Import Pages
import Account from "./Pages/Account/Account";
import AboutAdmin from "./Pages/AboutAdmin/AboutAdmin";
import Guide from "./Components/Guide/Guide";
import Navbar from "./Components/Navbar/Navbar";
<<<<<<< HEAD
import Event from "./Pages/Event/Event";

// * Import Components
// REDUX
import { Provider } from "react-redux";
import Store from "./store/index";

// * Mat UI
import { theme } from "../src/styles/Theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
=======
import Footer from "./Components/Footer/Footer.js"
>>>>>>> origin/giorg_FE_footer_0.2

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
              <Route path="/account" component={Account} />
              {/*
          // ! TEMPORARY LINK 
        */}
              <Route path="/aboutadmin" component={AboutAdmin} />
              <Route path="/aboutadmin" component={AboutAdmin} />
              <Route path="/create-event" component={Event} />

<<<<<<< HEAD
              <Route path="/guide">
                <Guide />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
=======
          <Route path="/guide">
            <Guide />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
>>>>>>> origin/giorg_FE_footer_0.2
  );
}

export default App;
