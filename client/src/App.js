import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//* Import Pages
import Home from "./Pages/Home/Home";
import Footer from "./Components/Guide/Components/footer/Footer";

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
          <div className="App">
            <Navbar />
            {/* Has to stay here to do not have the admin navbar */}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/events" component={GuideApp} />
              <Route path="/admin" component={AdminApp} />
              {/* Has to stay here to do not have the admin navbar */}

              {/* <div
                // This and the next <div> styles are for putting the footer at bottom
                aria-label="page-container"
                style={{ position: "relative", minHeight: "100vh" }}
              >
                <div
                  aria-label="content-wrap"
                  // style={{ paddingBottom: "353px" }}
                  // ! this padding represents footer's height HARDCODED
                > */}
              <Route exact path="/" component={Home} />
              <Route path="/subscription" component={Subscription} />
              <Route path="/signin" component={SignIn} />
              {/* </div>
              </div> */}
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
