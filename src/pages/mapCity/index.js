import React, { Component } from "react";
import { NavBar, Icon } from "antd-mobile";
import { BMap } from "../../utils/mapHelper";
import indexCss from "./index.module.scss";
import { connect } from "react-redux";
import axios, { BaseURL } from "../../utils/request";
let map = null;
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // index:0,

    };
  }

  async componentDidMount() {
    // 创建地图实例
    const { cityName } = this.props;
    map = new BMap.Map("container");
    // 添加地图控件
    map.addControl(new BMap.NavigationControl());
    //   获取当前定位城市的id
    const id = (await axios.get(`/area/info?name=${cityName}`)).data.body.value;
    this.drawHouse(id);
  }

  drawHouse = async (id) => {

    // 根据当前城市id获取城市下的房源信息
    const house = (await axios.get(`/area/map?id=${id}`)).data.body;
       // 创建点坐标

    console.log(house);
    // 对城市进行循环创建地图覆盖物
    house.forEach(v => {
      const point = new BMap.Point(v.coord.longitude, v.coord.latitude);
      map.centerAndZoom(point, 10);
      // console.log(this.props.cityname)
      var opts = {
        position: point // 指定文本标注所在的地理位置
      };
      var label = new BMap.Label(
        `<div class=${indexCss.cityname}><p>${v.label}</p><p>${v.count}套</p></div>`,
        opts
      ); // 创建文本标注对象
      label.setStyle({
        border: "none",
        background: "none"
      });
      label.addEventListener("click", (params)=> {
        console.log(v);
        // 清除覆盖物避免百度地图报错
        setTimeout(() => {
          map.clearOverlays();
        }, 0);
        const newid = v.value;
        // const newpoint = new BMap.Point(v.coord.longitude, v.coord.latitude);
        this.drawHouse(newid);
      });
      map.addOverlay(label);
    });
  };
  render() {
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          地图找房
        </NavBar>
        <div className={indexCss.city_map}>
          <div className={indexCss.map} id="container"></div>
        </div>
      </div>
    );
  }
}
const mapStoreToProps = state => {
  // 这个state =  reducer中返回中state
  return {
    cityName: state.mapReducer.city.name
  };
};
export default connect(mapStoreToProps, null)(Map);
