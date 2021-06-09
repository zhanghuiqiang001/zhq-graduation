//发送请求获取数据
import { request } from "../../request/index.js";
// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  //全局商品对象
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id}=options;
    this.getGoodsDetail(goods_id);
  },
  //获取商品详情数据
  async getGoodsDetail(goods_id){
    const goodsObj=await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",data:{goods_id}});
    // console.log(res);
    this.GoodsInfo=goodsObj;
    this.setData({
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.pics
      }
    })
  },
  //点击轮播图放大预览
  handlePrevewImage(e){
    //先构造要预览的图片数组
    const urls=this.GoodsInfo.pics.map(v=>v.pics_mid);
    //接收点击传递过来的图片url
    const current=e.currentTarget.dataset.url;
    wx.previewImage({
      //解构
      current,
      urls
     
      
  });
},

//点击加入购物车
handleCartAdd(){
  //1.获取缓存中的购物车
  let cart=wx.getStorageSync("cart")||[];

  //判断商品是否存在于购物车数组中
  let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
  if(index===-1){
    //不存在 第一次添加
    this.GoodsInfo.num=1;
    this.GoodsInfo.checked=true;

    cart.push(this.GoodsInfo);
  }else{
    //已经存在 
    cart[index].num++;
  }
  wx.setStorageSync('cart', cart);
  wx.showToast({
    title:'加入成功',
    icon:'success',
    make:true
  })
}
})