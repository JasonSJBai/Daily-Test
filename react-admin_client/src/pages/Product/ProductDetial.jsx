/**
 * 产品的详情子路由组件
 */

import React, { Component } from "react";
import { Button, Card, List } from "antd";
import { PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";

import "./product.less";
import { reqCategory } from "../../api";

const Item = List.Item;
export default class ProductDetial extends Component {
  state = {
    cName1: "", //一级分类名称
    cName2: "", //二级分类名称
  };

  async componentDidMount() {
    //得到当前商品的分类ID
    const { pCategoryId, categoryId } = this.props.location.state.product;
    if (pCategoryId === "0") {
      //一级分类下的商品
      const result = await reqCategory(categoryId);
      const cName1 = result.data.name;
      this.setState({ cName1 });
    } else {
      //二级分类下的商品
      /**  通过多个await方式发送多个请求：后面一个请求是在前一个请求成功返回之后才发送
       * const result1 = await reqCategory(pCategoryId);//获取一级分类列表
       * const result2 = await reqCategory(categoryId);//获取二级分类列表
       * const cName1 = result1.data.name;
       * const cName2 = result2.data.name;
       */

      //一次性发送多个请求，只有都成功了才正常处理
      const results = await Promise.all([
        reqCategory(pCategoryId),
        reqCategory(categoryId),
      ]);
      const cName1 = results[0].data.name;
      const cName2 = results[1].data.name;

      this.setState({
        cName1,
        cName2,
      });
    }
  }
  render() {
    //读取携带过来的state数据
    const {
      name,
      desc,
      price,
      detail,
      imgs,
    } = this.props.location.state.product;

    const { cName1, cName2 } = this.state;
    const title = (
      <div>
        <Button
          type="link"
          onClick={() => this.props.history.goBack()}
          icon={<ArrowLeftOutlined />}
          size="large"
        />
        <span>商品详情</span>
      </div>
    );

    return (
      <Card title={title} className="product-detial">
        <List itemLayout="vertical" bordered>
          <Item>
            <span className="left">商品名称:</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="left">商品描述:</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className="left">商品价格:</span>
            <span>{price}元</span>
          </Item>
          <Item>
            <span className="left">所属分类:</span>
            <span>
              <span>
                {cName1}
                {cName2 ? " --> " + cName2 : null}
              </span>
            </span>
          </Item>
          <Item>
            <span className="left">商品图片:</span>
            <span>
              {imgs.map((img) => (
                <img
                  key={img}
                  className="product-img"
                  src={img}
                  alt="img"
                ></img>
              ))}
            </span>
          </Item>
          <Item>
            <span className="left">商品详情:</span>
            <span dangerouslySetInnerHTML={{ __html: detail }} />
          </Item>
        </List>
      </Card>
    );
  }
}
