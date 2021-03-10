import React from "react";
import ReactDOM from "react-dom";

import store from "./redux/store";
import { Provider } from "react-redux";
import APP from "./APP";

ReactDOM.render(
  <Provider store={store}>
    <APP />
  </Provider>,
  document.getElementById("root")
);
