//用于创建redux中最重要的store
import { createStore, applyMiddleware, combineReducers } from "redux";
//引入为Count组件服务的reducer
import countReducer from "../redux/reducers/count";
//引入为Person组件服务的reducer
import personReducer from "../redux/reducers/person";
//引入redux-thunk用于支持异步action
import thunk from "redux-thunk";

//汇总所有reducer变为一个
const allReducers = combineReducers({
  count: countReducer,
  person: personReducer,
});
//暴露store
export default createStore(allReducers, applyMiddleware(thunk));
