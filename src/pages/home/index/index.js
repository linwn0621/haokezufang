import { Carousel } from "antd-mobile";
import React from "react";
import axios from "axios";
import nav1 from "../../../assets/images/nav-1.png";
import nav2 from "../../../assets/images/nav-2.png";
import nav3 from "../../../assets/images/nav-3.png";
import nav4 from "../../../assets/images/nav-4.png";
import IndexCss from "./index.module.scss";
class Index extends React.Component {
  state = {
    navs: [
      { id: 1, imgSrc: nav1, text: "整租" },
      {
        id: 2,
        imgSrc: nav2,
        text: "合租"
      },
      {
        id: 3,
        imgSrc: nav3,
        text: "地图找房"
      },
      { id: 4, imgSrc: nav4, text: "去出租" }
    ],
    swiperList: []
    // imgHeight: 176,
  };
  componentDidMount() {
    this.getSwiperList();
  }

  // 获取轮播图的数据
  getSwiperList = () => {
    axios.get("http://157.122.54.189:9060/home/swiper").then(res => {
      console.log(res);
      this.setState({
        swiperList: res.data.body
      });
    });
  };

  render() {
    return (
      <div className={IndexCss.Index}>
        {/* 轮播图开始 */}
        <div className={IndexCss.IndexSwiper}>
          {this.state.swiperList.length && (
            <Carousel autoplay infinite>
              {this.state.swiperList.map(val => (
                <a
                  key={val.id}
                  href="http://www.alipay.com"
                  style={{
                    display: "inline-block",
                    width: "100%",
                    height: this.state.imgHeight
                  }}
                >
                  <img
                    src={"http://157.122.54.189:9060" + val.imgSrc}
                    alt=""
                    style={{ width: "100%", verticalAlign: "top" }}
                    onLoad={() => {
                      // fire window resize event to change height
                      window.dispatchEvent(new Event("resize"));
                      this.setState({ imgHeight: "auto" });
                    }}
                  />
                </a>
              ))}
            </Carousel>
          )}
        </div>
        {/* 轮播图结束 */}
      
        {/* 首页导航 开始 */}
        <div className={IndexCss.IndexNav}>
          {this.state.navs.map(v => (
            <div className={IndexCss.navitem} key={v.id}>
              <img src={v.imgSrc} alt="" />
              <p>{v.text}</p>
            </div>
          ))}
        </div>
        {/* 首页导航 结束 */}
      </div>
    );
  }
}
export default Index;
