import React from "react";
import { TabBar } from 'antd-mobile';

import { Route, Switch, Redirect } from "react-router-dom";

// 引入4个子页面
import Index from "./index/index";
import Found from "./found";
import News from "./news";
import My from "./my";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "blueTab"
    };
    console.log(this.props)
    // 判断一下当前url 如果它是 /home/ 重定向到 /home/index
    if (this.props.match.path === "/home") {
      this.props.history.push("/home/index");
    }
  }

  render() {
    return (
      <div style={{ position: "fixed", height: "100%", width: "100%", top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="rgb(33, 185, 122)"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="首页"
            key="home"
            icon={<span className="iconfont icon-ind"></span>}
            selectedIcon={<span className="iconfont icon-ind"></span>}
            selected={this.props.location.pathname === "/home/index"}
            onPress={() => {
              this.props.history.push("/home/index");
            }}
          >
            <Route path="/home/index" component={Index}></Route>
          </TabBar.Item>
          <TabBar.Item
            icon={<span className="iconfont icon-findHouse"></span>}
            selectedIcon={<span className="iconfont icon-findHouse"></span>}
            title="找房"
            key="found"
            selected={this.props.location.pathname === "/home/found"}
            onPress={() => {
              this.props.history.push("/home/found");
            }}
      
          >
         <Route path="/home/Found" component={Found} ></Route>
          </TabBar.Item>
          <TabBar.Item
            icon={<span className="iconfont icon-infom"></span>}
            selectedIcon={<span className="iconfont icon-infom"></span>}
            title="资讯"
            key="news"
            selected={this.props.location.pathname === "/home/news"}
            onPress={() => {
              this.props.history.push("/home/news");
            }}
          >
            <Route path="/home/News" component={News}></Route>
          </TabBar.Item>
          <TabBar.Item
            icon={<span className="iconfont icon-my"></span>}
            selectedIcon={<span className="iconfont icon-my"></span>}
            title="我的"
            key="my"
            selected={this.props.location.pathname === "/home/my"}
            onPress={() => {
              this.props.history.push("/home/my");
            }}
          >
            <Route path="/home/My" component={My} ></Route>
          </TabBar.Item>
        </TabBar>
      </div>

    );
  }
}

export default Home;
