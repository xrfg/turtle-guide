import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// * Imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// * classes for Footer handling and page
import "./app.css";

//* Import Pages
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";

// * Import Custom  Components
import Navbar from "./Components/Navbar/Navbar";
import AuthRoute from "./Components/AuthRoute/AuthRoute";
import PageNotFoundAdmin from "./Components/PageNotFoundAdmin/PageNotFoundAdmin";

// REDUX
import { Provider } from "react-redux";
import Store from "./store/index";

// * Mat UI
import { CssBaseline } from "@material-ui/core";
import { theme } from "../src/styles/Theme";
import { MuiThemeProvider } from "@material-ui/core/styles";

// * Routes
import GuideApp from "./GuideApp";
import AdminApp from "./AdminApp";

//  * Pages
import Subscription from "./Pages/Subscription/Subscription";
import SignIn from "./Pages/SignIn/SignIn";
import PageNotFoundGuide from "./Components/Guide/Components/PageNotFoundGuide/PageNotFoundGuide";

// Important for the general styling

function App() {
  return (
    <Provider store={Store}>
      <MuiThemeProvider theme={theme}>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <BrowserRouter>
          <CssBaseline />
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
                <Route path="/404admin" component={PageNotFoundAdmin} />
                <Route path="/404guide" component={PageNotFoundGuide} />
                <Redirect to="/404admin" />
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
