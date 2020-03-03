import React from "react";
import { NavBar, Icon } from "antd-mobile";
import { connect } from "react-redux";
import axios, { baseURL } from "../../utils/request";
class cityChooese extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    console.log(this.props.cityName);
    const arr = await Promise.all([this.getHots(), this.getAllCitys()]);
    let cityList = [
      { 当前地址: this.props.cityName },
      { 热门城市: arr[0].data.body.map(v => v.label) }
    ];


    const cityshort = arr[1].data.body.sort((a, b) =>
      a.short < b.short ? -1 : 1
    );
    cityshort.forEach(v => {
             //    取出首字母
      const firstletter = v.short[0].toUpperCase();
      
         // 判断首字母属性是否已经存在数组中
      const index = cityList.findIndex(v => {
        return v.hasOwnProperty(firstletter);
      });
      if (index === -1) {
        // 字母属性不存在添加属性和添加属性值
        cityList.push({
            [firstletter]:[v.label]
        })

      }else{
        cityList[index][firstletter].push(v.label)
       
      }
    //   console.log(cityList)
    });
    
  }
  // 获取热门城市
  getHots = () => {
    return axios.get("http://157.122.54.189:9060/area/hot");
  };

  // 获取所有城市
  getAllCitys = () => {
    return axios.get("http://157.122.54.189:9060/area/city?level=1");
  };

  render() {
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          城市选择
        </NavBar>
      </div>
    );
  }
}

const mapStoreToProps = state => {
  return {
    cityName: state.mapReducer.city.name
  };
};
export default connect(mapStoreToProps, null)(cityChooese);
