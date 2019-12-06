import React from "react";
import ReactDOM from "react-dom";

import App from "./application";
import * as serviceWorker from "./serviceWorker";
const root = document.getElementById("root");

const render = Component => {
  return ReactDOM.render(<Component />, root);
};

render(App);
serviceWorker.unregister();

if (module.hot) {
  module.hot.accept("./application", () => {
    const NextApp = require("./application").default;
    render(NextApp);
  });
}
