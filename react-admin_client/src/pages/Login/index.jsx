/*
    登录的路由组件
*/
import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.less";
import logo from "../../assets/images/logo.png";
import { reqLogin } from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  onFinish = async (values) => {
    // console.log("提交的信息为:", values);
    const result = await reqLogin(values.username, values.password);
    // console.log("成功", result);
    if (result.status === 0) {
      //登录成功
      //提示登录成功
      message.success("登录成功！");
      //将user信息保存在内存工具中
      const user = result.data;
      memoryUtils.user = user;
      //保存到localstorage中
      storageUtils.saveUser(user);
      //跳转到管理界面(不需要再回退回来到登录)
      this.props.history.replace("/");
    } else {
      //登录失败
      message.error(result.msg);
    }
  };

  validatePwd = (rule, value) => {
    if (!value) {
      return Promise.reject("密码不能为空");
    } else if (value.length < 4) {
      return Promise.reject("密码长度不能小于4位");
    } else if (value.length > 12) {
      return Promise.reject("密码长度不能大于12位");
    } else if (!/^[a-zA-Z0-9_]*$/.test(value)) {
      return Promise.reject("密码必须是英文、数字或下划线组成");
    } else {
      return Promise.resolve();
    }
  };

  render() {
    //如果用户已经登陆了，跳转到管理界面
    const user = memoryUtils.user;
    if (user._id) {
      return <Redirect to="/" />;
    }

    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目 : 后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form onFinish={this.onFinish}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "请输入用户名！",
                },
                {
                  min: 4,
                  message: "用户名最少4位",
                },
                {
                  max: 12,
                  message: "用户名最多12位",
                },
                {
                  pattern: /^[a-zA-Z0-9_]*$/,
                  message: "用户名必须是英文、数字或下划线组成",
                },
              ]}
            >
              <Input
                prefix={
                  <UserOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
                }
                placeholder="用户名"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码！",
                },
                {
                  validator: this.validatePwd,
                },
              ]}
            >
              <Input
                prefix={
                  <LockOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />
                }
                type="password"
                placeholder="密码"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
