/**
 * 后台管理的路由组件
 */
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";
import { Layout } from "antd";
import LeftNav from "../../components/LeftNav";
import Header from "../../components/Header";

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
          <Content style={{ backgroundColor: "white" }}>Content</Content>
          <Footer style={{ textAlign: "center", color: "gray" }}>
            推荐使用谷歌浏览器以获得更加体验
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
