// 将定位请求封装成promise
export const LocalCity=()=>{
    return new Promise((resolve,reject)=>{
        var myCity = new window.BMap.LocalCity();
        myCity.get(function myFun(result){
            var cityName = result.name;
            resolve(result)
            // console.log(result)
        }); 
    })
}
