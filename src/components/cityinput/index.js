import React,{Component} from "react"
import indexCss from "./index.module.scss"
// 引入仓库链接器
import {connect} from"react-redux"
// 引入路由增强
import {withRouter} from "react-router-dom"
class Cityinput extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        console.log(props,3)
    }
    render() { 
        return ( 
          <div className={indexCss.Cityinput}>
              <div className={indexCss.inputLeft}>
                  <div className={indexCss.inputLeft_city} onClick={()=>{this.props.history.push("/cityChooese")}}>
                      <span>{this.props.cityName}</span>
                  <i className={" iconfont icon-arrow " + indexCss["icon-arrow"]}></i>
                  </div>
                  <div className={indexCss.inputLeft_search}>
                      <i className={" iconfont icon-seach "+indexCss["icon-seach"]}></i>
                      <div className={indexCss.searchInfo}>请输入小区或地址</div>
                  </div>
              </div>
              <div className={indexCss.inputRight}>
                  <i className={" iconfont icon-map "+indexCss["icon-map"]}></i>
              </div>
          </div>
         );
    }
 
}
const mapStoreToProps=(state)=>{
    return {
        cityName:state.mapReducer.city.name
    }
        }
 
export default withRouter(connect(mapStoreToProps,null)(Cityinput));