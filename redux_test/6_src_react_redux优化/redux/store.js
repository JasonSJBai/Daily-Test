//用于创建redux中最重要的store
import { createStore, applyMiddleware } from "redux";
//引入为Count组件服务的reducer
import countReducer from "./count_reducer";
//引入redux-thunk用于支持异步action
import thunk from "redux-thunk";

//暴露store
export default createStore(countReducer, applyMiddleware(thunk));
