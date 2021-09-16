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

            <Switch>
              <AuthRoute path="/admin" component={AdminApp} />

              {/* Public routes */}
              <Route exact path="/" component={Home} />
              <Route path="/events" component={GuideApp} />
              <Route path="/subscription" component={Subscription} />
              <Route path="/signin" component={SignIn} />
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
