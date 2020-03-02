// 动作创建器
import { getCurrentCity } from "../../utils/mapHelper";
export const LocalCityAction = () => {
  return dispatch => {

    // LocalCity().then(res => {
    //   const action = {
    //     type: "initCity",
    //     value: res
    //   };
    //   dispatch(action);
    // });
    getCurrentCity().then(res=>{
      // console.log(res)
      const action ={
        type: "initCity",
        value: res
      }
      dispatch(action);
    })
  };
};
