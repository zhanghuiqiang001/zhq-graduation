import { request } from "../../request/index.js"


// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单数据
    leftMenuList: [],
    //右侧
    rightContent: [],
    //被点击的菜单
    currentIndex: 0,

    //右侧内容的滚动条距离顶部的距离
    scrollTop: 0
  },
  //接口的返回数据
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //web中的本地存储和小程序中的本地存储的区别:
    //写代码的方式不一样:web:localStorage.setItem("key","value") localStorage.getItem("key")
    //小程序中:wx.setStorageSync("cates",{time:Date.now(),data:this.Cates}); wx.getStorageSync('cates');
    //存的时候有没有做类型转换
    //web:不管存入什么类型数据,最终都会先调用一下toString()把数据变成字符串再存入进去
    //小程序:不存在在类型转换操作 存进去什么类型 拿出来还是什么类型
    // 先判断一下本地存储中有没有旧的数据,没有旧的数据直接发送新请求  
    // 有旧的数据 同时 旧的数据也没有过期就是用本地存储中的旧的数据即可

    //1.先获取本地存储的数据(小程序也有本地存储数据)
    const Cates = wx.getStorageSync('cates');
    //2.判断
    if (!Cates) {
      //不存在 发送请求
      this.getCates();
    } else {
      //有旧的数据
      //判断有没有过期  定义一个过期时间
      if (Date.now() - Cates.time > 1000 * 10) {
        //如果过期了就重新发送请求
        this.getCates();

      } else {
        //否则可以使用旧的数据
        this.Cates = Cates.data;
        //构造左侧大菜单数据
        let leftMenuList = this.Cates.map(v => v.cat_name);
        //构造右侧数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
    this.getCates();
  },
  // 获取分类数据
  async getCates() {
    //   request({
    //     url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"
    //   })
    //   .then(res=>{
    //    this.Cates=res.data.message;
    //    //把接口的数据存入到本地存储中
    //    wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
    //    //构造左侧大菜单数据
    //    let leftMenuList = this.Cates.map(v=>v.cat_name);
    //    //构造右侧数据
    //    let rightContent = this.Cates[0].children;
    //    this.setData({
    //      leftMenuList,
    //      rightContent
    //    })
    //   })
    // },
    // //左侧菜单的点击事件
    // handleItemTap(e){
    //   // console.log(e);
    //   // 获取被点击的标题索引
    //   // 给data中的currentIndex赋值
    //   const {index} = e.currentTarget.dataset;

    //   //构造右侧数据
    //   let rightContent = this.Cates[index].children;
    //   this.setData({
    //     currentIndex:index,
    //     rightContent,
    //     //重新设置 右侧内容的scroll-view的距离顶部的距离
    //     scrollTop:0
    //   })

    //使用es7的异步请求
    const res = await request({ url:"https://api-hmugo-web.itheima.net/api/public/v1/categories" });
    // this.Cates=res.data.message;
    this.Cates=res;

       //把接口的数据存入到本地存储中
       wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
       //构造左侧大菜单数据
       let leftMenuList = this.Cates.map(v=>v.cat_name);
       //构造右侧数据
       let rightContent = this.Cates[0].children;
       this.setData({
         leftMenuList,
         rightContent
       })
      },
  //左侧菜单的点击事件
    handleItemTap(e){
      // console.log(e);
      // 获取被点击的标题索引
      // 给data中的currentIndex赋值
      const {index} = e.currentTarget.dataset;

      //构造右侧数据
      let rightContent = this.Cates[index].children;
      this.setData({
        currentIndex:index,
        rightContent,
        //重新设置 右侧内容的scroll-view的距离顶部的距离
        scrollTop:0
      })
  }
})