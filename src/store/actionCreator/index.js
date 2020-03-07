// 动作创建器
import { getCurrentCity,getCityInfoByName } from "../../utils/mapHelper";
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
export const changecity=({ cityName, address })=>{
  return dispatch => {
    getCityInfoByName({ cityName, address }).then(res=>{
      // console.log(res,666)
      res.name = res.addressComponents.city.replace("市", '');
    const action ={
      type: "initCity",
      value: res
    }
    dispatch(action);
  })
}
}