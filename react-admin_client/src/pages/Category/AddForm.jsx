import React, { Component } from "react";
import { Form, Select, Input } from "antd";

const Item = Form.Item;
const Option = Select.Option;

//添加分类的form组件
export default class AddForm extends Component {
  render() {
    const { categorys, parentId } = this.props;

    return (
      <Form
        id="AddForm"
        onFinish={this.props.addCategory}
        initialValues={{ parentId: parentId }}
      >
        <Item
          label="所属分类"
          name="parentId"
          rules={[{ required: true, message: "请选择所属分类" }]}
        >
          <Select>
            <Option value="0" key="0">
              一级分类
            </Option>
            {categorys.map((c) => (
              <Option value={c._id} key={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </Item>
        <Item
          label="分类名称"
          name="categoryName"
          rules={[{ required: true, message: "分类名称不能为空" }]}
        >
          <Input placeholder="请输入分类名称"></Input>
        </Item>
      </Form>
    );
  }
}
