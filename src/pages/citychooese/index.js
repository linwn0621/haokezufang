import React from "react";
import { NavBar, Icon } from "antd-mobile";
import { connect } from "react-redux";
import axios, { baseURL } from "../../utils/request";
// 引入可视化区域渲染
import { List } from "react-virtualized";
import IndexCss from "./index.module.scss"
import {changecity} from "../../store/actionCreator/index"
class cityChooese extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citysName: [],
      letter:[],
      selectIndex: 0
    };
  }

  async componentDidMount() {
    const arr = await Promise.all([this.getHots(), this.getAllCitys()]);
    let cityList = [
      { 当前地址: [this.props.cityName] },
      { 热门城市: arr[0].data.body.map(v => v.label) }
    ];
    let letter = ["#", "热"];
    // 对城市进行排序
    const citys = arr[1].data.body.sort((a, b) => (a.short < b.short ? -1 : 1));
    citys.forEach(v => {
      // 获取首字母\
      const firstletter = v.short[0].toUpperCase();
      // 判断首字母属性是否在数组中
      const index = cityList.findIndex(v2 => {
        return v2.hasOwnProperty(firstletter);
      });
      if (index === -1) {
        // 添加属性
        cityList.push({
          [firstletter]: [v.label]
        });
        letter.push(firstletter)
      } else {
        cityList[index][firstletter].push(v.label);
      }
    });
    // console.log(cityList);
    this.setState({
      citysName: cityList,
      letter
    });
    // console.log(this.state.letter);
  }

  // 获取热门城市
  getHots = () => {
    return axios.get("http://157.122.54.189:9060/area/hot");
  };

  // 获取所有城市
  getAllCitys = () => {
    return axios.get("http://157.122.54.189:9060/area/city?level=1");
  };

  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style // Style object to be applied to row (to position it)
  }) => {
    const obj = this.state.citysName[index];
    const cityTitle = Object.keys(obj)[0];
    //   const cityNames=obj[cityTitle]
    // console.log(this.state.citysName);

    return (
      <div key={key} style={style}>
        <div className={IndexCss.citys_title}>{cityTitle}</div>
        <div className={IndexCss.citys_names}>
          {obj[cityTitle].map((v,i) => (
            <div  className={IndexCss.city} key={i} onClick={() => this.handleClick(v)}>{v}</div>
          ))}
        </div>
      </div>
    );
  };
  // 点击城市返回
  handleClick=(cityName)=>{
this.props.history.go(-1)
// console.log(cityName)
this.props.changecityname(cityName);
// console.log(this.props.cityName,667)
  }
  rowHeight = ({ index }) => {
    // index 等于 cityList中的索引
//    获取数组中的对象
    const obj = this.state.citysName[index];
    // 获取对象属性值
    const propsName = Object.keys(obj)[0];
    // 获取属性值内数组长度
    const length = obj[propsName].length;
    // 返回总高度
    return (length + 1) * 40;
  }
  // 列表滚动事件
  onRowsRendered=({ startIndex })=>{
    this.setState({ selectIndex: startIndex });
  }
  handleLetterClick=(i)=>{
    this.setState({ selectIndex: i });
  }
  render() {
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          {this.props.cityName}
        </NavBar>
        {/* 城市内容开始 */}
        <div className={IndexCss.city_view}>
        <div className={IndexCss.citys}>
          <List
             width={window.screen.width}
             height={window.screen.height - 45}
            rowCount={this.state.citysName.length}
            rowHeight={this.rowHeight}
            rowRenderer={this.rowRenderer}
            onRowsRendered={this.onRowsRendered}
            scrollToIndex={this.state.selectIndex}
            scrollToAlignment="start" 
          />
        </div>
         {/* 导航条开始 */}
         <div className={IndexCss.citysnav}>
    {this.state.letter.map((v,i)=><div onClick={() => this.handleLetterClick(i)} className={[IndexCss.navs,this.state.selectIndex===i?IndexCss.active:""].join('  ')} key={i}>{v}</div>)}
        </div>
        {/* 导航条结束 */}
        </div>
        {/* 城市内容结束 */}
       
      </div>
    );
  }
}

const mapStoreToProps = state => {
  return {
    cityName: state.mapReducer.city.name
  };
};
const mapDispatchToProps=(dispatch)=>{
return  {
  changecityname(cityName) {
  dispatch(changecity({ cityName }))
}
}
}
export default connect(mapStoreToProps, mapDispatchToProps)(cityChooese);
