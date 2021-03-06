export const BMap = window.BMap;
var geolocation = new BMap.Geolocation();
var myGeo = new BMap.Geocoder();
// 将定位请求封装成promise
export const LocalCity = () => {
  return new Promise((resolve, reject) => {
    const myCity = new BMap.LocalCity();
    myCity.get(function myFun(result) {
      result.name = result.name.replace("市", "");
      resolve(result);
      // console.log(result)
    });
  });
};

// 获取城市定位
export const getCurrentCity = () => {
  return new Promise((resolve, reject) => {
    getCurrentPosition().then(r => {
      getLocation(r).then(res => {
        res.name = res.addressComponents.city.replace("市", "");
        // console.log(res);
        resolve(res);
      });
    });
  });
};

// 对百度地图 获取经纬度代码封装
export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    // 开启SDK辅助定位
    geolocation.enableSDKLocation();
    geolocation.getCurrentPosition(function(r) {
      if (this.getStatus() == window.BMAP_STATUS_SUCCESS) {
        resolve(r);
      } else {
        alert("failed" + this.getStatus());
        reject(r);
      }
    });
  });
};

// 根据经纬度 获取 所在城市
export const getLocation = r => {
  return new Promise((resolve, reject) => {
    // 创建地理编码实例
    var myGeo = new BMap.Geocoder();
    // 根据坐标得到地址描述
    myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function(
      result
    ) {
      if (result) {
        resolve(result);
      } else {
        reject(result);
      }
    });
  });
};
// 根据城市名称来获取经纬度
export const getcitys = ({ cityName, address }) => {
  // obj ={cityName:"广州",address:"北京市海淀区上地10街10号 "}
  if (!address) {
    address = cityName;
  }
  return new Promise((resolve, reject) => {
    // 根据一个很详细的信息来获取 当前的地址信息了
    // 北京市海淀区上地10街10号 
    myGeo.getPoint(address, function (point) {
      if (point) {
        point={point:point}
        resolve(point)
      }
    },
      cityName);
  })
}
//  根据城市名称获取该城市的信息信息
export const getCityInfoByName=({ cityName, address })=>{
  return new Promise(async(resolve,reject)=>{
    // console.log(cityName,123)
    getcitys({ cityName, address }).then(res=>{
      // console.log(res.point.lng,111)
      getLocation(res).then(r=>{
        resolve(r)
        // console.log(r,110)
      })
    })
    
  })
}