import React, { Component } from "react";
import Count from "./containers/Count";
import Person from "./containers/Person";
//引入redux
import store from "./redux/store";

export default class APP extends Component {
  render() {
    return (
      <div>
        {/* 给容器组件传递store */}
        <Count store={store} />
        <hr />
        <Person />
      </div>
    );
  }
}
