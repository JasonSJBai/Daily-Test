import React, { Component } from "react";
import { Form, Select, Input } from "antd";

const Item = Form.Item;
const Option = Select.Option;

//添加分类的form组件
export default class AddForm extends Component {
  render() {
    return (
      <Form
        id="AddForm"
        onFinish={this.props.addCategory}
        initialValues={{ parentId: "0" }}
      >
        <Item label="所属分类" name="parentId">
          <Select>
            <Option value="0">a</Option>
            <Option value="1">b</Option>
            <Option value="2">c</Option>
          </Select>
        </Item>
        <Item label="分类名称" name="categoryName">
          <Input placeholder="请输入分类名称"></Input>
        </Item>
      </Form>
    );
  }
}
