import React from "react";
import App from "./App.js";
import reactDOM from "react-dom";
import { ThemeProvider} from "@material-ui/core/styles";
import theme from "../src/Components/Guide/Pages/Home/Theme"

reactDOM.render(
  <ThemeProvider theme={theme}>
<App />

  </ThemeProvider>, 
document.getElementById("root"));
