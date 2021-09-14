import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//* Import Pages -- ADMIN
import Home from "./Pages/Home/Home";
import Account from "./Pages/Account/Account";
import AboutAdmin from "./Pages/AboutAdmin/AboutAdmin";
import Event from "./Pages/Event/Event";
import Section from "./Pages/Section/Section";
import SignUp from "./Pages/SignUp/SignUp";
import SignIn from "./Pages/SignIn/SignIn";
import Footer from "./Components/Guide/Components/footer/Footer";
import Buy from "./Components/Guide/Pages/Buy/Buy";

//* Import Pages -- GUIDE
import Guide from "./Components/Guide/Guide";
import Settings from "./Components/Guide/Pages/Settings/Settings";
import SectionGuide from "./Components/Guide/Pages/Section/Section";
import Map from "./Components/Guide/Pages/Map/Map";

// * Import Custom  Components
import Navbar from "./Components/Navbar/Navbar";
import BottomNavBar from "./Components/Guide/Components/Navbar/BottomNavBar";

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

              <div>
                <BottomNavBar />
                <Switch>
                  <Route exact path="/events/settings" component={Settings} />
                  <Route exact path="/events/:name/map" component={Map} />
                  <Route exact path="/events/:name" component={Guide} />
                  <Route
                    exact
                    path="/events/:name/sections/:id"
                    component={SectionGuide}
                  />
                </Switch>
              </div>

              <div
                // This and the next <div> styles are for putting the footer at bottom
                aria-label="page-container"
                style={{ position: "relative", minHeight: "100vh" }}
              >
                <div
                  aria-label="content-wrap"
                  style={{ paddingBottom: "353px" }}
                  // ! this padding represents footer's height HARDCODED
                >
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
              </div>
            </Switch>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
