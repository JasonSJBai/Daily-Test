import React, { Component } from "react";
import { Form, Input } from "antd";

const Item = Form.Item;

//更新分类的form组件
export default class UpdateForm extends Component {
  state = { categoryName: this.props.categoryName };

  formRef = React.createRef();
  // UNSAFE_componentWillMount() {
  //   this.props.setForm();
  // }
  render() {
    const { categoryName, updateCategory, setForm } = this.props;
    setForm(this.formRef);
    // console.log("U", this.formRef);
    // console.log("U", categoryName);
    // this.formRef.current.resetFeilds(true);

    return (
      <Form
        id="UpdateForm"
        ref={this.formRef}
        onFinish={updateCategory}
        initialValues={{ categoryName: categoryName }}
      >
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
