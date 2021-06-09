// pages/search/index.js
// 防抖(防止抖动) 定时器 节流
// 防抖一般在输入框中 防止重复输入 重复发送请求
// 节流一般使用在页面下拉和上拉
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    //取消按钮 是否显示
    isFocus:false,
    //输入框的值
    inpValue:""

  },
  TimeId:-1,
  //输入框的值改变 就会触发
  handleInput(e){
    //获取输入框的值
    const {value} = e.detail;
    //检测合法性
    if(!value.trim()){
      //清楚定时器 以免没有搜索内容了还发送请求
      clearTimeout(this.TimeId);
      this.setData({
        goods:[],
        isFocus:false
      })
      //值不合法 不往下执行
      return;
    }
    this.setData({
      isFocus:true
    })


    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(()=>{
      this.qsearch(value);
    },1000);
  },
  //点击取消
  handleCancel(){
    this.setData({
      inpValue:"",
      isFocus:false,
      goods:[]
    })
  },
 
  //发送请求后去搜索建议 数据
  async qsearch(query){
    const res =await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch",data:{query}});
    // console.log(res);
    this.setData({
      goods:res
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})