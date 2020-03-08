import React, { Component } from "react";
import { NavBar, Icon } from "antd-mobile";
import { BMap } from "../../utils/mapHelper";
import indexCss from "./index.module.scss";
import { connect } from "react-redux";
import axios, { baseURL } from "../../utils/request";
let map = null;

class Map extends Component {
  // 创建一个闭包
  loadZoom = (function(params) {
    let index = -1;
    let arr = [
      { i: 1, zoom: 10, cls: "circle" },
      { i: 2, zoom: 12, cls: "circle" },
      { i: 3, zoom: 15, cls: "side" }
    ];
    return function(params) {
      index++;
      index = index === arr.length ? 0 : index;
      return arr[index];
    };
  })();
  constructor(props) {
    super(props);
    this.state = {
      // index:0,
      houseList: [],
      isshow: false
    };
  }

  async componentDidMount() {
    // console.log(this.loadZoom());
    // AREA|893e6c35-8981-6419
    // this.houseres("AREA|893e6c35-8981-6419");
    // 创建地图实例
    const { cityName } = this.props;
    map = new BMap.Map("container");
    // 添加地图控件
    map.addControl(new BMap.NavigationControl());
    //   获取当前定位城市的id
    const id = (await axios.get(`/area/info?name=${cityName}`)).data.body.value;
    this.drawHouse(id);
    // 绑定一个拖拽事件
    map.addEventListener("dragstart", () => {
      this.setState({ isshow: false });
    });
  }

  // 发请求拿房源数据
  houseres = async id => {
    const houseList = await axios.get(
      `http://157.122.54.189:9060/houses?cityId=${id}`
    );

    this.setState({
      houseList: houseList.data.body.list
    });
    console.log(this.state.houseList);
  };
  
  // 获取地址下的房源数据
  drawHouse = async id => {
    const zoomObj = this.loadZoom();

    // 根据当前城市id获取城市下的房源信息
    const house = (await axios.get(`/area/map?id=${id}`)).data.body;
    // 创建点坐标

    console.log(house);
    // 对城市进行循环创建地图覆盖物
    house.forEach(v => {
      const point = new BMap.Point(v.coord.longitude, v.coord.latitude);
      map.centerAndZoom(point, zoomObj.zoom);
      // console.log(this.props.cityname)
      var opts = {
        position: point // 指定文本标注所在的地理位置
      };
      var label = new BMap.Label(
        `<div class="${indexCss[zoomObj.cls]} ${indexCss.cityName}"><p>${
          v.label
        }</p><p>${v.count}套</p></div>`,
        opts
      ); // 创建文本标注对象
      label.setStyle({
        border: "none",
        background: "none"
      });
      label.addEventListener("click", params => {
        if (zoomObj.i === 3) {
          // console.log("发送请求 显示div 房源信息-有图片");
          this.houseres(v.value);
          this.setState({
            isshow: true
          });
        } else {
          // console.log(v);
          // 清除覆盖物避免百度地图报错
          setTimeout(() => {
            map.clearOverlays();
          }, 0);
          const newid = v.value;
          // const newpoint = new BMap.Point(v.coord.longitude, v.coord.latitude);
          this.drawHouse(newid);
        }
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
        {/* 内容开始 */}
        <div className={indexCss.city_map}>
          {/* 地图开始 */}
          <div className={indexCss.map} id="container"></div>
          {/* 地图结束 */}
          {/* 房屋开始 */}
          {this.state.isshow && (
            <div className={indexCss.house}>
              <div className={indexCss.house_nav}>
                <span>房屋列表</span>
                <span>更多房源</span>
              </div>
              <div className={indexCss.house_content}>
                {this.state.houseList.map((v, i) => (
                  <div className={indexCss.house_item} key={i}>
                    <div className={indexCss.house_img}>
                      <img src={baseURL + v.houseImg} alt="" />
                    </div>
                    <div className={indexCss.house_info}>
                      <h3 className={indexCss.title}>{v.title}</h3>
                      <div className={indexCss.desc}>{v.desc}</div>
                      <div className={indexCss.tags}>
                        {v.tags.map((vv, ii) => (
                          <span className={indexCss.tags_item} key={ii}>
                            {vv}
                          </span>
                        ))}
                      </div>
                      <div className={indexCss.price}>{v.price}元/月</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* 房屋结束 */}
        </div>
        {/* 内容结束 */}
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
