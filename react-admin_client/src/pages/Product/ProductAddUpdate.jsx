/**
 * 产品的添加和修改子路由组件
 */

import React, { Component } from "react";
import { Card, Form, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Item = Form.Item;

export default class ProductAddUpdate extends Component {
  render() {
    const title = (
      <div>
        <Button
          type="link"
          onClick={() => this.props.history.goBack()}
          icon={<ArrowLeftOutlined />}
          size="large"
        />
        <span>新增/修改商品</span>
      </div>
    );

    return (
      <Card title={title}>
        <Form>
          <Item></Item>
        </Form>
      </Card>
    );
  }
}
