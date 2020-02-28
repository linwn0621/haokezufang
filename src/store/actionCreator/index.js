// 动作创建器
import { LocalCity } from "../../utils/mapHelper";
export const LocalCityAction = () => {
  return dispatch => {
    LocalCity().then(res => {
      const action = {
        type: "initCity",
        value: res
      };
      dispatch(action);
    });
  };
};
