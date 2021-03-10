import React, { Component } from "react";
import { connect } from "react-redux";
import { nanoid } from "nanoid";
import { createAddPersonAction } from "../../redux/actions/person";

class Person extends Component {
  addPerson = () => {
    const name = this.nameNode.value;
    const age = this.ageNode.value;
    const personObj = { id: nanoid(), name, age };
    this.props.addPerson(personObj);
    this.nameNode.value = "";
    this.ageNode.value = "";
  };
  render() {
    return (
      <div>
        <h2>Person组件</h2>
        <h4>上方组件的和为：{this.props.count}</h4>
        <input
          ref={(c) => (this.nameNode = c)}
          type="text"
          placeholder="输入名字"
        />
        <input
          ref={(c) => (this.ageNode = c)}
          type="text"
          placeholder="输入年龄"
        />
        <button onClick={this.addPerson}>添加</button>
        <ul>
          {this.props.personObj.map((person) => {
            return (
              <li key={person.id}>
                {person.name}--{person.age}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect(
  (state) =>
    //映射状态
    ({ personObj: state.person, count: state.count }),
  {
    //映射操作状态的方法
    addPerson: createAddPersonAction,
  }
)(Person);
