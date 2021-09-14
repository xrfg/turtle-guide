import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// REDUX
import { Provider } from "react-redux";
import Store from "./store/index";

// * Mat UI
import { theme } from "../src/styles/Theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import GuideApp from "./GuideApp";
import AdminApp from "./AdminApp";

//  * Pages
import Home from "./Pages/Home/Home";

function App() {
  return (
    <Provider store={Store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="App">
            {/* Has to stay here to do not have the admin navbar */}
            <Switch>
              <Route exact path="/" component={Home} />
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
