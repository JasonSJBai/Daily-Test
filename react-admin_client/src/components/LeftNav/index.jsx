import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";
import "./index.less";

import logo from "../../assets/images/logo.png";
import menuList from "../../config/menuConfig";

/**
 * 左侧导航的组件
 */

const { SubMenu } = Menu;

class LeftNav extends Component {
  // subMenuKeys = [];

  /**
   * 根据menu的数据数组生成对应的标签数组
   * 使用map()加递归调用
   */
  getMenuNodes = (menuList) => {
    return menuList.map((item) => {
      /*
        {
          title:'首页', // 菜单标题名
          key:'/home', // 对应的path
          icon:'home', // 图标名称
          children:[], // 可能有
        }
      */
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key} />
            {item.title}
          </Menu.Item>
        );
      } else {
        //查找与当前请求路径匹配的子Item
        const cItem = item.children.find(
          (cItem) => cItem.key === this.props.location.pathname
        );
        //如果存在且不为空，说明当前item的子列表需要展开
        if (cItem) {
          // this.subMenuKeys = [item.key, ...this.subMenuKeys];
          this.subMenuKeys = item.key;
        }

        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        );
      }
    });
  };

  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList);
  }

  render() {
    //得到当前请求的路由路径
    const path = this.props.location.pathname;
    const subMenuKeys = this.subMenuKeys;
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo"></img>
          <h1>后台管理</h1>
        </Link>

        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[path]}
          defaultOpenKeys={[subMenuKeys]}
        >
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}

/**
 * withRouter高阶组件：
 * 包装非路由组件，返回一个新的组件
 * 新的组件向被包装的非路由组件传递三个属性：history/location/match
 *
 *
 * 何时使用？
 * LeftNav组件的Menu菜单需要根据当前的路由请求路径决定默认选择哪一栏，
 * 而当前的请求路径要通过 this.props.location.pathname 来得到，
 * 但是其组件并不是一个路由组件，所以也不存在路由组件特有的三个属性，所以没法接收到该参数
 * 此时，就需要使用 withRouter 来包装原组件，使其能够接收到需要的参数
 */
export default withRouter(LeftNav);
