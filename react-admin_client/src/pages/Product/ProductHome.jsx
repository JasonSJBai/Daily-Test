/**
 * 默认子路由组件
 */
import React, { Component } from "react";
import { Button, Card, Input, message, Select, Table } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";

import { reqProducts, reqSearchProducts, reqUpdateStatus } from "../../api";

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
        // dataIndex: "status",
        width: 100,
        render: (product) => {
          const { _id, status } = product;
          return status === 1 ? (
            <span>
              <Button onClick={() => this.updateStatus(_id, 2)} type="primary">
                下架
              </Button>
              <span>在售</span>
            </span>
          ) : (
            <span>
              <Button type="primary" onClick={() => this.updateStatus(_id, 1)}>
                上架
              </Button>
              <span>已下架</span>
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
              <Button
                type="link"
                onClick={() =>
                  this.props.history.push("/product/detial", { product })
                }
              >
                详情
              </Button>
              <Button
                type="link"
                onClick={() =>
                  this.props.history.push("/product/addupdate", { product })
                }
              >
                修改
              </Button>
            </span>
          );
        },
      },
    ];
  };

  //获取指定页码的列表数据显示
  getProducts = async (pageNum) => {
    this.setState({ loading: true }); //发送请求前展示loading

    //保存当前的pageNum能够让其他方法使用
    this.pageNum = pageNum;

    const { searchName, searchType } = this.state;
    //如果搜索关键字有值，说明要做搜索分页

    let result;
    if (searchName !== "") {
      result = await reqSearchProducts({
        pageNum,
        pageSize: PAGE_SIZE,
        searchName,
        searchType,
      });
    } else {
      //一般分页请求
      result = await reqProducts(pageNum, PAGE_SIZE);
    }

    this.setState({ loading: false }); //发送请求后取消loading
    if (result.status === 0) {
      //取出分页数据，更新状态，显示分页列表
      const { total, list } = result.data;
      this.setState({
        total,
        products: list,
      });
    }
  };

  //更新指定商品的状态
  updateStatus = async (productId, status) => {
    console.log("Update");
    this.setState({
      loading: true,
    });
    const result = await reqUpdateStatus(productId, status);
    this.setState({
      loading: false,
    });
    if (result.status === 0) {
      message.success("更新成功！");
      this.getProducts(this.pageNum);
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
        <Button type="primary" onClick={() => this.getProducts(1)}>
          搜索
        </Button>
      </span>
    );

    const extra = (
      <Button
        type="primary"
        onClick={() => this.props.history.push("/product/addupdate")}
        icon={<PlusOutlined />}
      >
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
            pageSizeOptions: [PAGE_SIZE],
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
