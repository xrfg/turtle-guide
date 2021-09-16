import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// * classes for Footer handling and page
import "./app.css";

//* Import Pages
import Home from "./Pages/Home/Home";
import Account from "./Pages/Account/Account";
import AboutAdmin from "./Pages/AboutAdmin/AboutAdmin";
import Guide from "./Components/Guide/Guide";
import SectionGuide from "./Components/Guide/Pages/Section/Section";
import Event from "./Pages/Event/Event";
import Section from "./Pages/Section/Section";
import SignUp from "./Pages/SignUp/SignUp";
// import SignIn from "./Pages/SignIn/SignIn";
import Footer from "./Components/Footer/Footer";
// import Buy from "./Components/Guide/Pages/Buy/Buy";

// * Import Custom  Components
import Navbar from "./Components/Navbar/Navbar";
// import Footer from "./Components/Footer/Footer";

// REDUX
import { Provider } from "react-redux";
import Store from "./store/index";

// * Mat UI
import { theme } from "../src/styles/Theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import GuideApp from "./GuideApp";
import AdminApp from "./AdminApp";

//  * Pages
import Subscription from "./Pages/Subscription/Subscription";
// import Buy from "./Components/Guide/Pages/Buy/Buy";

function App() {
  return (
    <Provider store={Store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route exact path="/">
                <div aria-label="app-container" className="app-container">
                  <div aria-label="content-wrap" className="footer-padding">
                    <Navbar />
                    <Home />
                    <Footer />
                  </div>
                </div>
              </Route>
              <Route path="/events" component={GuideApp} />
              <Route path="/admin" component={AdminApp} />
            </Switch>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
