import { Carousel } from "antd-mobile";
import React from "react";
import axios from "axios";
import nav1 from "../../../assets/images/nav-1.png";
import nav2 from "../../../assets/images/nav-2.png";
import nav3 from "../../../assets/images/nav-3.png";
import nav4 from "../../../assets/images/nav-4.png";
import IndexCss from "./index.module.scss";
// 引入搜索框
import Cityinput from "../../../components/cityinput/index";

class Index extends React.Component {
  state = {
    swiperList: [],
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
    // 租房 数据
    rentings: [],
    // 资讯
    news: []
  };
  componentDidMount() {
    this.getSwiperList();
    this.getZufanglist();
    this.getNewslist();
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
  // 获取租房小组数据
  getZufanglist = () => {
    axios
      .get(
        "http://157.122.54.189:9060/home/groups?area=AREA%7C88cff55c-aaa4-e2e0"
      )
      .then(res => {
        this.setState({
          rentings: res.data.body
        });
      });
  };
  getNewslist = () => {
    axios.get("http://157.122.54.189:9060/home/news").then(res => {
      this.setState({ news: res.data.body });
    });
  };
  render() {
    return (
      <div className={IndexCss.Index}>
        {/* 轮播图开始 */}
        <div className={IndexCss.IndexSwiper}>
          {/* 搜索框开始 */}
          <div className={IndexCss.IndexInput}>
            <Cityinput></Cityinput>
          </div>
          {/* 搜索框结束 */}
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

        {/* 首页租房开始 */}
        <div className={IndexCss.IndexZf}>
          {/* 头部 */}
          <div className={IndexCss.Zftitle}>
            <span>租房小组</span>
            <a href="#">更多</a>
          </div>
          {/* 内容 */}
          <div className={IndexCss.Zfcontent}>
            {this.state.rentings.map(v => (
              <div key={v.id} className={IndexCss.Zfitem}>
                <div className={IndexCss.item_text}>
                  <div className={IndexCss.text_title}>{v.title}</div>
                  <div className={IndexCss.text_desc}>{v.desc}</div>
                </div>
                <div className={IndexCss.item_img}>
                  <img src={"http://157.122.54.189:9060" + v.imgSrc} alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 首页租房结束 */}

        {/* 首页资讯开始 */}
        <div className={IndexCss.IndexNews}>
          <div className={IndexCss.newstitle}>最新资讯</div>

          {this.state.news.map(v => (
            <div className={IndexCss.newsItem} key={v.id}>
              <div className={IndexCss.newsImg}>
                <img src={"http://157.122.54.189:9060" + v.imgSrc} alt="" />
              </div>
              <div className={IndexCss.newsContent}>
                <div className={IndexCss.newsContent_title}>{v.title}</div>
                <div className={IndexCss.newsInfo}>
                  <span>{v.from}</span>
                  <span>{v.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* 首页资讯结束 */}
      </div>
    );
  }
}
export default Index;
