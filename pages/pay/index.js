

  import { getSetting, chooseAddress, openSetting, showModal,showToast } from "../../utils/asyncWx";
  import regeneratorRuntime from '../../lib/runtime/runtime';
  import{request}from "../../request/index";
  Page({
    data: {
      address: {},
      cart: [],
      totalPrice: 0,
      totalNum: 0
    },
    onShow() {
      // 获取缓存信息
      const address = wx.getStorageSync("address");
  
      //获取缓存中的数据
      let cart = wx.getStorageSync("cart") || [];

      //过滤后的购物车数组
      cart = cart.filter(v=>v.checked);
      this.setData({
        address
      })
        //总价格 总数量
        let totalPrice = 0;
        let totalNum = 0;
        cart.forEach(v => {
         
            totalPrice += v.num * v.goods_price;
            totalNum += v.num;
          
        })
        
        //把购物车数据重新设置回data和缓存中
        this.setData({
          cart, totalNum, totalPrice,address
        });
       
     

    },
    //点击支付
    async handleOrderPay(){
      //判断缓存有没有token
      const token = wx.getStorageSync('token');
      //判断
      if(!token){
        wx.navigateTo({
          url:"/pages/auth/index"
        });
        return;
      }

      //创建订单
      const header = {Authorization:token};
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address.all;
      const cart = this.data.cart;
      let goods=[];
      cart.forEach(v=>goods.push({
        goods_id:v.goods_id,
        goods_number:v.num,
        goods_price:v.goods_price
      }))

      const orderParams = {order_price,consignee_addr,goods}
      //发送请求 创建订单 获取订单编号
      const {order_number} = await request({url:"/my/orders/create",method:"POST",data:orderParams,header:header})
      // console.log(order_number);

    }
  })