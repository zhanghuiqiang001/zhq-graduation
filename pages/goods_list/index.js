import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[{
      id:0,
      value:"综合",
      isActive:true
    },{
      id:1,
      value:"销量",
      isActive:false
    },{
      id:2,
      value:"价格",
      isActive:false
    }],
    goodsList:[

    ]
  },
  //接口要的参数
  QueryParams:{
    query:"",
    dic:"",
    pagenum:1,
    pagesize:10
  },
  //总页数
  totalPage:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid=options.cid;
    this.getGoodList();

    wx.showLoading({
      title:'拼命加载~'
    })
    setTimeout(function(){
      wx.hideLoading()
    },5000)
  },
  //获取商品列表数据
  async getGoodList(){
    const res=await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/search",data:this.QueryParams});
    //获取总条数
    const total=res.total;
    //计算总页数
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
    // console.log(res);
    this.setData({
      goodsList:[...this.data.goodsList,...res.goods]
    })

    //关闭下拉刷新窗口  如果没有调用下拉刷新窗口 直接关闭也不会报错
    wx.stopPullDownRefresh();
  },
//标题点击事件
tabsItemChange(e){
//获取被点击的标题索引
const {index} = e.detail;
//修改原来的数组
let {tabs} = this.data;
tabs.forEach((v,i)=>i === index?v.isActive=true:v.isActive=false);
//赋值到data中
this.setData({
  tabs
})
},
 //页面触底事件
onReachBottom(){
  //判断还有没有下一页数据
  if(this.QueryParams.pagenum>=this.totalPages){
    //没有下一页数据
    wx.showToast({
      title: '没有更多数据了',
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  }else{
    this.QueryParams.pagenum++;
    this.getGoodList();

  }
},
//下拉刷新事件
onPullDownRefreash(){
  //重置数组
  this.setData({
    goodsList:[]
  })
  //重置页码
  this.QueryParams.pagenum=1;
  //发送请求
  this.getGoodList();
}

})