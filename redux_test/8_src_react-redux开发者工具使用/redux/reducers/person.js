import { ADD_PERSON } from "../constant";

//初始化状态
const initstate = [{ id: "001", name: "Jason", age: 22 }];

export default function personReducer(preState = initstate, action) {
  //从接收到的action对象解构赋值出type,data
  const { type, data } = action;

  //根据type判断执行的操作
  switch (type) {
    case ADD_PERSON:
      return [data, ...preState];

    default:
      return preState;
  }
}
