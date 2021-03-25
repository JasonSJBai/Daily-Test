/**
 * 默认子路由组件
 */
import React, { Component } from "react";
import { Button, Card, Input, Select, Table } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";

import { reqProducts, reqSearchProducts } from "../../api";

import { PAGE_SIZE } from "../../utils/constants";

const { Option } = Select;

export default class Product extends Component {
  state = {
    total: 0, //商品的总数量
    products: [], //商品信息的数组
    loading: false, //是否更新的状态
    searchName: "", //搜索的关键字
    searchType: "productName", //根据哪个字段搜索
  };

  //初始化table的列的数组
  initColunms = () => {
    this.columns = [
      {
        title: "商品名称",
        dataIndex: "name",
      },
      {
        title: "商品描述",
        dataIndex: "desc",
      },
      {
        title: "价格",
        dataIndex: "price",
        render: (price) => "¥" + price, //当前指定了对应的属性，传入的是对应的属性值
      },
      {
        title: "状态",
        dataIndex: "status",
        width: 100,
        render: (status) => {
          return status === 1 ? (
            <span>
              <Button type="primary">下架</Button>
              <span>在售</span>
            </span>
          ) : (
            <span>
              <Button type="primary">上架</Button>
              <span>售罄</span>
            </span>
          );
        },
      },
      {
        title: "操作",
        width: 100,
        render: (product) => {
          return (
            <span>
              <Button type="link">详情</Button>
              <Button type="link">修改</Button>
            </span>
          );
        },
      },
    ];
  };

  //获取指定页码的列表数据显示
  getProducts = async (pageNum) => {
    this.setState({ loading: true }); //发送请求前展示loading
    const result = await reqProducts(pageNum, PAGE_SIZE);
    this.setState({ loading: false }); //发送请求后取消loading
    if (result.status === 0) {
      const { total, list } = result.data;
      this.setState({
        total,
        products: list,
      });
    }
  };

  componentWillMount() {
    this.initColunms();
  }

  componentDidMount() {
    this.getProducts(1);
  }

  render() {
    const { products, total, loading, searchName, searchType } = this.state;

    const title = (
      <span>
        <Select
          onChange={(value) => this.setState({ searchType: value })}
          value={searchType}
          style={{ width: 120 }}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input
          onChange={(event) =>
            this.setState({ searchName: event.target.value })
          }
          value={searchName}
          placeholder="关键字"
          style={{ width: 150, margin: "0 15px" }}
        />
        <Button type="primary">搜索</Button>
      </span>
    );

    const extra = (
      <Button type="primary" icon={<PlusOutlined />}>
        添加商品
      </Button>
    );

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey="_id"
          dataSource={products}
          columns={this.columns}
          pagination={{
            pageSizeOptions: [5, 10, 20, 50],
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            total,
            onChange: this.getProducts,
          }}
          loading={loading}
        />
      </Card>
    );
  }
}
