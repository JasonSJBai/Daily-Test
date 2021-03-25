/**
 * 商品分类路由
 */

import React, { Component } from "react";
import { Card, Table, Button, message, Modal } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";

import AddForm from "./AddForm";
import UpdateForm from "./UpdateForm";

import { reqAddCategorys, reqCategorys, reqUpdateCategorys } from "../../api";

export default class Category extends Component {
  state = {
    loading: false, //判断Table是否为加载状态
    categorys: [], //一级分类列表
    subCategorys: [], //二级分类列表
    parentId: "0", //当期需要显示的父分类列表的parentId
    parentName: "", //当期需要显示的父分类列表的parentName
    showStatus: 0, //标识添加/更新的确认框是否显示，0：都不显示  1：显示添加  2：显示更新
    addFormData: { parentId: "0", categoryName: "" },
    // updateFormData: { categoryId: "", categoryName: "" },
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
        render: (category) => (
          <span>
            <Button type="link" onClick={() => this.showUpdate(category)}>
              修改分类
            </Button>
            {this.state.parentId === "0" ? (
              <Button
                type="link"
                onClick={() => this.showSubCategorys(category)}
              >
                查看子分类
              </Button>
            ) : null}
          </span>
        ),
      },
    ];
  };

  //异步获取一级/二级分类列表显示
  getCategorys = async (parentId) => {
    this.setState({ loading: true });

    parentId = parentId || this.state.parentId;
    const result = await reqCategorys(parentId);

    this.setState({ loading: false });

    if (result.status === 0) {
      //取出分类数组，可能是一级列表也可能是二级
      const categorys = result.data;
      //更新状态
      if (parentId === "0") {
        this.setState({
          categorys,
        });
      } else {
        this.setState({
          subCategorys: categorys,
        });
      }
    } else {
      message.error("获取分类列表失败");
    }
  };

  //显示指定一级分类的二级分类列表
  showSubCategorys = (category) => {
    //更新状态
    this.setState(
      {
        parentId: category._id,
        parentName: category.name,
      },
      () => {
        //在状态更新后执行
        this.getCategorys();
      }
      //setState()不能立即获取最新的状态，因为它是异步更新状态的
    );
  };

  //点击二级分类列表的“一级分类列表”标题后，返回一级分类列表
  backCategorys = () => {
    //更新为显示一级列表的状态
    this.setState({
      parentId: "0",
      parentName: "",
      subCategorys: [],
    });
  };

  //添加按钮的回调,显示添加的确认框
  showAdd = () => {
    this.setState({
      showStatus: 1,
    });
  };

  //添加分类
  addCategory = async (values) => {
    console.log("addCategory,submit", values);
    //隐藏确认框
    this.setState({
      showStatus: 0,
    });

    const parentId = values.parentId;
    const categoryName = values.categoryName;

    const result = await reqAddCategorys(parentId, categoryName);
    if (result.status === 0) {
      if (parentId === this.state.parentId) {
        //添加的分类就是当前的分类列表
        this.getCategorys();
      } else if (parentId === "0") {
        //在二级分类列表下添加一级分类项，需要重新获取一级分类项，但不需要显示
        this.getCategorys("0");
      }
    }
  };

  //更新按钮的回调，显示更新的确认框
  showUpdate = (category) => {
    //保存分类对象
    this.category = category;

    //更新状态
    this.setState({
      showStatus: 2,
    });
  };

  //更新分类
  updateCategory = async (values) => {
    // console.log("updateCategory", values);

    //隐藏确认框
    this.setState({
      showStatus: 0,
    });

    const categoryId = this.category._id;
    const categoryName = values.categoryName;
    //发请求更新
    const result = await reqUpdateCategorys(categoryId, categoryName);

    if (result.status === 0) {
      //重新显示列表
      this.getCategorys();
    }
  };

  UNSAFE_componentWillMount() {
    this.initColumns();
  }

  //响应点击取消，隐藏确定框
  handleCancel = () => {
    //清除输入数据
    this.setState({
      showStatus: 0,
    });
  };

  //发送异步ajax请求
  componentDidMount() {
    this.getCategorys();
  }

  render() {
    //读取状态中的数据
    const {
      categorys,
      subCategorys,
      parentId,
      parentName,
      loading,
      showStatus,
    } = this.state;

    const category = this.category || {};

    const title =
      parentName === "" ? (
        <Button type="text">一级分类列表</Button>
      ) : (
        <div>
          <Button type="link" onClick={this.backCategorys}>
            一级分类列表
          </Button>
          <ArrowRightOutlined />
          <Button type="text">{parentName}</Button>
        </div>
      );

    const extra = (
      <Button type="primary" icon={<PlusOutlined />} onClick={this.showAdd}>
        添加
      </Button>
    );

    // console.log("I", this.formRef);

    return (
      <Card title={title} extra={extra} style={{ width: "100%" }}>
        <Table
          bordered
          rowKey="_id"
          dataSource={parentId === "0" ? categorys : subCategorys}
          columns={this.columns}
          pagination={{
            pageSizeOptions: [5, 10, 20, 50],
            defaultPageSize: 5,
            showQuickJumper: true,
          }}
          loading={loading}
        />
        <Modal
          title="添加分类"
          visible={showStatus === 1}
          // onOk={this.addCategory}
          onCancel={this.handleCancel}
          //对Modal的ok按钮绑定属性，将其作为其中Form的submit按钮来触发Form的提交
          okButtonProps={{ htmlType: "submit", form: "AddForm" }}
          destroyOnClose
        >
          <AddForm
            addCategory={this.addCategory}
            categorys={categorys}
            parentId={parentId}
          />
        </Modal>
        <Modal
          title="修改分类"
          visible={showStatus === 2}
          onCancel={this.handleCancel}
          //对Modal的ok按钮绑定属性，将其作为其中Form的submit按钮来触发Form的提交
          okButtonProps={{ htmlType: "submit", form: "UpdateForm" }}
          destroyOnClose
        >
          <UpdateForm
            //通过props实现父子组件的通信，进行数据处理
            categoryName={category.name}
            updateCategory={this.updateCategory}
            setForm={(formRef) => (this.formRef = formRef)}
          />
        </Modal>
      </Card>
    );
  }
}
