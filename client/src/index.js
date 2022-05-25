import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./js/store/store";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "./Context";


ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
reportWebVitals();
