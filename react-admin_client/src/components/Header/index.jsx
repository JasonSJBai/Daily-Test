import React, { Component } from "react";
import { Spin, Modal, Button } from "antd";

import { withRouter } from "react-router-dom";
import "./index.less";
import menuList from "../../config/menuConfig";
import { reqWeather } from "../../api";
import { formateDate } from "../../utils/dateUtils";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";

class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    weather: {},
  };

  getTime = () => {
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now());
      this.setState({ currentTime });
    }, 1000);
  };

  getTitle = () => {
    //得到当前请求的路径
    const path = this.props.location.pathname;
    let title;

    menuList.forEach((item) => {
      if (item.key === path) {
        // 若当前item对象的key与path一样，item的title就是要显示的title
        title = item.title;
      } else if (item.children) {
        //在所有子item中查找匹配的
        const cItem = item.children.find((cItem) => cItem.key === path);
        //如果有值才说明有匹配
        if (cItem) {
          //取出title
          title = cItem.title;
        }
      }
    });
    return title;
  };

  //退出当前登录的点击回调
  logout = () => {
    //显示确认框
    Modal.confirm({
      content: "确定退出吗？",
      onOk: () => {
        // console.log("OK");
        //删除保存的user信息
        storageUtils.removeUser();
        memoryUtils.user = {};

        //跳转到login界面
        this.props.history.replace("/login");
      },
    });
  };

  componentDidMount() {
    reqWeather().then((weather) => {
      this.setState({
        weather: weather,
      });
    });

    this.getTime();
  }

  //在组件卸载之前调用
  componentWillUnmount() {
    //清除定时器
    clearInterval(this.intervalId);
  }

  render() {
    const username = memoryUtils.user.username;
    const title = this.getTitle();

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{username}</span>
          <Button type="link" onClick={this.logout}>
            退出
          </Button>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <Spin spinning={JSON.stringify(this.state.weather) === "{}"}>
              <div>
                <span>当前时间：{this.state.currentTime}</span>
                <span>城市：{this.state.weather.city}</span>
                <span>天气：{this.state.weather.weather}</span>
                <span>温度：{this.state.weather.temperature} ℃</span>
              </div>
            </Spin>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
