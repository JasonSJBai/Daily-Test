//用于创建redux中最重要的store
import { createStore, applyMiddleware, combineReducers } from "redux";
//引入为Count组件服务的reducer
import countReducer from "./reducers/count";
//引入为Person组件服务的reducer
import personReducer from "./reducers/person";
//引入redux-thunk用于支持异步action
import thunk from "redux-thunk";
//引入redux-devtools-extension
import { composeWithDevTools } from "redux-devtools-extension";

//汇总所有reducer变为一个
const allReducers = combineReducers({
  count: countReducer,
  person: personReducer,
});

//暴露store
export default createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
