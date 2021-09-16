import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// * classes for Footer handling and page
import "./app.css";

//* Import Pages
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";

// * Import Custom  Components
import Navbar from "./Components/Navbar/Navbar";
import AuthRoute from "./Components/AuthRoute/AuthRoute";

// REDUX
import { Provider } from "react-redux";
import Store from "./store/index";

// * Mat UI
import { theme } from "../src/styles/Theme";
import { MuiThemeProvider } from "@material-ui/core/styles";

// * Routes
import GuideApp from "./GuideApp";
import AdminApp from "./AdminApp";

//  * Pages
import Subscription from "./Pages/Subscription/Subscription";
import SignIn from "./Pages/SignIn/SignIn";

function App() {
  return (
    <Provider store={Store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <div aria-label="app-container" className="app-container">
            <div
              aria-label="content-wrap"
              className={
                window.location.pathname.includes("/events")
                  ? "footer-padding-guide"
                  : "footer-padding-admin"
              }
            >
              {window.location.pathname.includes("/events") ? null : <Navbar />}
              <Switch>
                {/* Auth Routes */}
                <AuthRoute path="/admin" component={AdminApp} />

                {/* Public routes */}
                <Route exact path="/" component={Home} />
                <Route path="/events" component={GuideApp} />
                <Route path="/subscription" component={Subscription} />
                <Route path="/signin" component={SignIn} />
              </Switch>
              {window.location.pathname.includes("/events") ? null : <Footer />}
            </div>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
