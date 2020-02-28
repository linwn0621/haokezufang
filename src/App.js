import React, { Component, Fragment } from "react";
// 1 引入 路由
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
// 引入首页组件
import Home from "./pages/home/index";
import MapCity from "./pages/mapCity/index";
// 引入封装的地图请求
import { LocalCityAction } from "./store/actionCreator";

import { connect } from "react-redux";

class App extends Component {
  componentDidMount(){
  this.props.handleInitCity()
  // console.log(this.props.city,1)
  }
  render() {
    return (
      <Fragment>
        {/* 2 使用 */}
        <div>
          <Router>
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route exact path="/mapCity" component={MapCity}></Route>
              <Route exact path="/">
                <Redirect to="/home"></Redirect>
              </Route>
            </Switch>
          </Router>
        </div>
      </Fragment>
    );
    
  }
  
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleInitCity() {
      // localCityAction 是一个函数 
      dispatch(LocalCityAction());
    }
  }
}

export default connect(null, mapDispatchToProps)(App);

