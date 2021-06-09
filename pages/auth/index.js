import { getSetting, chooseAddress, openSetting, showModal,showToast } from "../../utils/asyncWx";
import regeneratorRuntime from '../../lib/runtime/runtime';
import{login}from "../../utils/asyncWx.js";
import { request } from "../../request/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //获取用户信息
  async handleGetUserInfo(e) {
    try{
      //获取信息
    const { encrytedData, rawData, iv, signature } = e.detail;
    //获取小程序登录成功后的值
    const {code} = await login();
    const loginParams = {encrytedData, rawData, iv, signature,code};
    console.log(login);
    //发送请求 获取token值
    //自己随便定义的一个假的token值
    let token="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    //const {token} = await request({url:"/users/wxlogin",data:loginParams,method:"post"});
    // console.log(token);
    //把token存入缓存中 同时跳转到上一个页面
    wx.setStorageSync("token", token);
    wx.navigateBack({
      //数值表示返回几层
      delta:1
    })
    }
    catch(err){
      console.log(err);
    }



  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }


})