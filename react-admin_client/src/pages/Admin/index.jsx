/**
 * 后台管理的路由组件
 */
import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";
import { Layout } from "antd";
import LeftNav from "../../components/LeftNav";
import Header from "../../components/Header";
import Home from "../Home";
import Product from "../Product";
import Category from "../Category";
import User from "../User";
import Role from "../Role";
import Bar from "../Charts/Bar";
import Line from "../Charts/Line";
import Pie from "../Charts/Pie";

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    if (!user || !user._id) {
      //自动跳转到登录
      return <Redirect to="/login" />;
    }
    return (
      <Layout style={{ height: "100%" }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ backgroundColor: "white" }}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/product" component={Product} />
              <Route path="/role" component={Role} />
              <Route path="/user" component={User} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/line" component={Line} />
              <Route path="/charts/pie" component={Pie} />
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center", color: "gray" }}>
            推荐使用谷歌浏览器以获得更加体验
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
