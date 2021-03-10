import React, { Component } from "react";
//引入connect用于连接UI组件与redux
import { connect } from "react-redux";
//引入action
import {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction,
} from "../../redux/count_action";

//定义UI组件
class Count extends Component {
  //加法
  increment = () => {
    const { value } = this.selectedNumber;
    this.props.jia(value * 1);
  };

  //减法
  decrement = () => {
    const { value } = this.selectedNumber;
    this.props.jian(value * 1);
  };

  //奇数再加
  incrementIfOdd = () => {
    const { value } = this.selectedNumber;
    if (this.props.count % 2 !== 0) {
      this.props.jia(value * 1);
    }
  };

  incrementAsync = () => {
    const { value } = this.selectedNumber;
    this.props.jiaAsnyc(value * 1, 500);
  };

  render() {
    return (
      <div>
        <h2>当前和为:{this.props.count}</h2>
        <select ref={(c) => (this.selectedNumber = c)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
        &nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
        <button onClick={this.incrementAsync}>异步加</button>
      </div>
    );
  }
}

//使用connect()()创建并暴露一个Count的容器组件
export default connect(
  (state) => ({ count: state }),

  //mapDispatchToProps的一般写法
  /* dispatch => ({
			  jia:(number)=>{dispatch(createIncrementAction(number))},
			  jian:(number)=>{dispatch(createDecrementAction(number))},
			  jiaAsnyc:(number,time)=>{dispatch(createIncrementAsyncAction(number,time))}
		  }) */
  //mapDispatchToProps的简写
  {
    jia: createIncrementAction,
    jian: createDecrementAction,
    jiaAsnyc: createIncrementAsyncAction,
  }
)(Count);
