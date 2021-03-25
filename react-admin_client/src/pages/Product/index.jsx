/**
 * 商品管理路由
 */

import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ProductHome from "./ProductHome";
import ProductAddUpdate from "./ProductAddUpdate";
import ProductDetial from "./ProductDetial";

export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/product" component={ProductHome} />
        <Route exact path="/product/addupdate" component={ProductAddUpdate} />
        <Route exact path="/product/detial" component={ProductDetial} />
        <Redirect to="/product" />
      </Switch>
    );
  }
}
