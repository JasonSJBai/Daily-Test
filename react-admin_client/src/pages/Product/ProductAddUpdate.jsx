/**
 * 产品的添加和修改子路由组件
 */

import React, { Component } from "react";
import { Card, Form, Button, Input, Cascader, Upload } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { reqCategorys } from "../../api";

const Item = Form.Item;
const TextArea = Input.TextArea;

export default class ProductAddUpdate extends Component {
  state = {
    options: [],
  };

  initOptions = (categorys) => {
    //根据categorys生产options数组
    const options = categorys.map((c) => ({
      value: c._id,
      label: c.name,
      isLeaf: false,
    }));

    //更新options
    this.setState({
      options,
    });
  };

  //获取一级/二级分类列表并展示
  getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId);
    if (result.status === 0) {
      const categorys = result.data;
      //如果是一级分类列表
      if (parentId === 0) {
        this.initOptions(categorys);
      } else {
        //二级分类
        return categorys; //返回二级列表
      }
    }
  };

  //选择非叶子选项时，加载下一级选项数据
  loadData = async (selectedOptions) => {
    //得到选择的option对象
    const targetOption = selectedOptions[0]; //selectedOptions[selectedOptions.length - 1];
    //显示loading
    targetOption.loading = true;

    //根据选中的分类请求获取下一级分类列表
    const subCategorys = await this.getCategorys(targetOption.value);
    targetOption.loading = false;

    if (subCategorys && subCategorys.length > 0) {
      //生成一个二级列表的options
      const childOptions = subCategorys.map((c) => ({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }));
      //关联到当前的option上
      targetOption.children = childOptions;
    } else {
      //当前选择的分类没有二级分类
      targetOption.isLeaf = true;
    }

    this.setState({ options: [...this.state.options] });
  };

  getFieldsValue = (values) => {
    console.log(values);
  };

  componentDidMount() {
    this.getCategorys(0);
  }

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
            <Cascader options={this.state.options} loadData={this.loadData} />
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
