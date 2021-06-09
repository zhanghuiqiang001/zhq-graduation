//引入用来发送请求的方法  一定要把路径补全
import { request } from "../../request/index.js";


//Page Object
Page({
  data: {
    //轮播图数据
    swiperList: [],
    //导航数据
    catesList:[],


    //楼层数据
    floorList:[]
  },
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  //页面开始加载 就会触发
  //options(Object)
  onLoad: function (options) {
    //发送异步请求获取轮播图数据
    // var reqTask = wx.request({
    //   //请求的地址
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     //console.log(result);
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }
    // });

    //调用函数方法
    this.QueryParams.cid = options.cid||'';
    this.QueryParams.query = options.query||'';
   this.getSwiperList();
   this.getCateList();
   this.getFloorList();
 
  },
  //获取轮播图数据方法
  getSwiperList(){

    request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata" })
    .then(result => {
    
      this.setData({
        
        swiperList: result
      })
    })
  },
  //获取分类导航数据
  getCateList(){
    request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems" })
    .then(result => {
      this.setData({
        catesList: result
        
      })
    })
    //console.log(this.catesList);
  },
  //获取楼层数据
  getFloorList(){
    request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/floordata" })
    .then(result => {
      
      this.setData({
        floorList: result
      })
    })
  }
});
