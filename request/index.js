//同时发送异步代码的次数
let ajaxTimes=0;


export const request =(params)=>{
    ajaxTimes++;
    //显示加载中
    wx.showLoading({
        title: '拼命加载~',
        mask: true,
        success: (result) => {
            
        },
        fail: () => {},
        complete: () => {}
    });
      
    //定义公共的url
    // const baseUrl=" https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            //地址合并
            // url:baseUrl+params.url,
            
            success:(result)=>{
                resolve(result.data.message);
            },
            fail:(err)=>{
                reject(err);
            },
            complete: function() {
                ajaxTimes--;
                if(ajaxTimes===0){
                    wx.hideLoading();
                }
                //关闭加载图标
                
            }
        });
        
    })
}