// 仓库
// 引入管理员
import reducer from "./reducer"
// 引入仓库创建器和reduxThunk增强器
import { createStore,applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
// 3 导出仓库
export default createStore(reducer,applyMiddleware(reduxThunk));