// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[{
      id:0,
      value:"体验问题",
      isActive:true
    },{
      id:1,
      value:"商品投诉",
      isActive:false
    }],
    //被选中的图片路径
    chooseImgs:[],

    //文本域内容
    textVal:''
  },
  //外网的图片的路径数组
  UpLoadImgs:[],
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
  //点击选择图片
  handleChooseImg(){
    wx.chooseImage({
      //同时选中的图片的数量
      count:9,
      //图片的格式
      sizeType:['original','compressed'],
      //图片的来源 相册 照相机
      sourceType:['album','camera'],
      success:(result)=>{
        this.setData({
          //图片数组 进行拼接
          chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths]
        })
      }
    })
  },
  //点击自定义图片组件
  handleRemoveImg(e){
    //获取被点击的组件的案例
    const {index} = e.currentTarget.dataset;
    // console.log(index);

    //获取data中的图片数组
    let {chooseImgs} = this.data;
    //删除元素
    chooseImgs.splice(index,1);
    //再重新填充数据
    this.setData({
      chooseImgs
    })
  },
  //文本域输入事件
  handleTextInput(e){
    this.setData({
      textVal:e.detail.value
    })
  },
  //提交按钮点击事件
  handleFormSubmit(){
    //获取文本域内容
    const {textVal,chooseImgs}=this.data;
    //合法性的验证
    if(!textVal.trim()){
      wx.showToast({
        title:'输入不合法',
        mask:true,
        icon:'none'
      })
      //不合法
      return;
    }


    //上传到图片服务器
    //不支持多个文件上传  只能遍历数组 挨个上传
    //显示正在等待的图标
    wx.showLoading({
      title:'正在上传',
      mask:true
    });

    //判断有没有要上传的图片数组
    if(chooseImgs.length !=0){
      chooseImgs.forEach((v,i)=> {
        wx.uploadFile({
          //图片要上传到哪里
          url: 'https://String',
          //被上传图片的路径
          filePath:v,
          //文件名称 供后台过去
          name:'name',
          // header: {}, // 设置请求的 header
          // formData: {}, // HTTP 请求中其他额外的 form data
          success: function(res){
            // success
            let url=JSON.parse(result.data);
            this.UpLoadImgs.push(url);
            //所有的图片上传完才触发
            if(i===chooseImgs.length-1){
              console.log('提交成功');
              wx.hideLoading();
  
              //提交成功 重置页面
              this.setData({
                textVal:'',
                chooseImgs:[]
              })
              wx.navigateBack({
                delta: 1, // 回退前 delta(默认为1) 页面
                success: function(res){
                  // success
                },
                fail: function() {
                  // fail
                },
                complete: function() {
                  // complete
                }
              })
            }
          }
        })
      })
    }else{
      wx.hideLoading();
      console.log('只提交文字');
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
        success: function(res){
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    }
   
   
  }
})