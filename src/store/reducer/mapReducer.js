// // 地图管理员
// // 1创建数据
const defaultState = {
  city: {
    // 城市名称
    // 经纬度
  }
};
// 2定义一个函数让管理员可以修改仓库数据
const reducerManage = (state = defaultState, action) => {
  // 3将数据深拷贝
  let newState = JSON.parse(JSON.stringify(state));
 
  if (action.type === "initCity") {
    newState.city = action.value;
    console.log(newState,1)
    return newState;
  }

  return state;
};

    // 3 导出 
    export default reducerManage;