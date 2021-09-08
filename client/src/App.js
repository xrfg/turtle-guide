import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//* Import Pages
import Home from "./Pages/Home/Home";
import Account from "./Pages/Account/Account";
import AboutAdmin from "./Pages/AboutAdmin/AboutAdmin";
import Guide from "./Components/Guide/Guide";
import SectionGuide from "./Components/Guide/Pages/Section/Section";
import Event from "./Pages/Event/Event";
import Section from "./Pages/Section/Section";
import SignUp from "./Pages/SignUp/SignUp";
import SignIn from "./Pages/SignIn/SignIn";

// * Import Custom  Components
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

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
            <Switch>
              {/* Has to stay here to do not have the admin navbar */}

              <Route exact path="/events/:name" component={Guide} />
              <Route
                exact
                path="/events/:name/sections/:id"
                component={SectionGuide}
              />

              <div>
                <Navbar />
                <Route exact path="/" component={Home} />
                <Route exact path="/admin" component={SignUp} />

                <Route path="/account" component={Account} />
                <Route path="/aboutadmin" component={AboutAdmin} />
                <Route exact path="/admin/event/:name" component={Event} />
                {/* sections takes id or name */}
                <Route
                  exact
                  path="/admin/event/sections/:id"
                  component={Section}
                />
                <Footer />
              </div>
            </Switch>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
