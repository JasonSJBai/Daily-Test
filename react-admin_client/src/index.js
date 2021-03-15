import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import memoryUtils from "./utils/memoryUtils";
import storageUtils from "./utils/storageUtils";

//读取local中存的信息
const user = storageUtils.getUser();
memoryUtils.user = user;

ReactDOM.render(<App />, document.getElementById("root"));
