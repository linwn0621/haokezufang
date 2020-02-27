import { Carousel } from "antd-mobile";
import React from "react";
import axios from "axios";
class Index extends React.Component {
  state = {
    data: ["1", "2", "3"],
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
      this.state.swiperList.length&&<Carousel autoplay infinite>
      
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
    );
  }
}
export default Index;
