/**
 * 产品的添加和修改子路由组件
 */

import React, { Component } from "react";
import { Card, Form, Button, Input, Cascader, Upload } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Item = Form.Item;
const TextArea = Input.TextArea;

export default class ProductAddUpdate extends Component {
  getFieldsValue = (values) => {
    console.log(values);
  };

  render() {
    const title = (
      <div>
        <Button
          type="link"
          onClick={() => this.props.history.goBack()}
          icon={<ArrowLeftOutlined />}
          size="large"
        />
        <span>添加商品</span>
      </div>
    );

    //指定item布局的配置对象
    const FormItemStyle = {
      labelCol: { span: 2 }, //左侧label
      wrapperCol: { span: 8 }, //指定右侧包裹的宽度
    };

    return (
      <Card title={title}>
        <Form
          {...FormItemStyle}
          onFinish={this.getFieldsValue}
          initialValues={{
            productName: "",
            productDesc: "",
            productPrice: "",
            productType: "",
            // productPhoto: "",
            productDetial: "",
          }}
        >
          <Item
            name="productName"
            label="商品名称"
            rules={[{ required: true, message: "请输入商品名称" }]}
          >
            <Input />
          </Item>
          <Item
            name="productDesc"
            label="商品描述"
            rules={[{ required: true, message: "请输入商品描述" }]}
          >
            <TextArea autoSize={{ minRows: 2 }} />
          </Item>
          <Item
            name="productPrice"
            label="商品价格"
            rules={[{ required: true, message: "请输入价格" }]}
          >
            <Input type="number" addonAfter="元" />
          </Item>
          <Item
            name="productType"
            label="商品分类"
            rules={[{ required: true, message: "请选择商品分类" }]}
          >
            <Cascader></Cascader>
          </Item>
          {/* <Item name="productPhoto" label="商品图片">
            <Upload />
          </Item> */}
          <Item name="productDetial" label="商品详情">
            <TextArea />
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}
