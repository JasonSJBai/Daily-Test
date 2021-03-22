/**
 * 商品分类路由
 */

import React, { Component } from "react";
import { Card, Table, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { reqAddCategorys, reqCategorys, reqUpdateCategorys } from "../../api";

export default class Category extends Component {
  state = {
    categorys: [], //一级分类列表
  };

  //初始化Table所有列的数组
  //根据dataIndex选定展示字段
  initColumns = () => {
    this.columns = [
      {
        title: "分类名称",
        dataIndex: "name",
      },

      //渲染固定的字段列
      {
        title: "操作",
        width: 300,
        render: () => (
          <span>
            <Button type="link">修改分类</Button>
            <Button type="link">查看子分类</Button>
          </span>
        ),
      },
    ];
  };

  //异步获取一级分类列表显示
  getCategorys = async () => {
    const result = await reqCategorys("0");
    console.log(result);
    if (result.status === 0) {
      const categorys = result.data;
      //更新状态
      this.setState({
        categorys,
      });
    } else {
      message.error("获取分类列表失败");
    }
  };

  componentWillMount() {
    this.initColumns();
  }

  //发送异步ajax请求
  componentDidMount() {
    this.getCategorys();
  }

  render() {
    //读取状态中的数据
    const { categorys } = this.state.categorys;

    const title = "一级分类列表";

    const extra = (
      <Button type="primary" icon={<PlusOutlined />}>
        添加
      </Button>
    );

    const dataSource = [
      {
        key: "1",
        name: "胡彦斌",
        age: 32,
        address: "西湖区湖底公园1号",
      },
      {
        key: "2",
        name: "胡彦祖",
        age: 42,
        address: "西湖区湖底公园1号",
      },
    ];

    return (
      <Card title={title} extra={extra} style={{ width: "100%" }}>
        <Table
          bordered
          rowKey="_id"
          dataSource={this.state.categorys}
          columns={this.columns}
        />
        ;
      </Card>
    );
  }
}
