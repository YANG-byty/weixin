// pages/component/homeMain/homeMain.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    swiperSlideLists:Array,   //潮流服饰
    hotDatas:Array,    //商城热点
    seckillDatas:Object, //限时秒杀
  },

  /**
   * 组件的初始数据
   */
  data: {
    flag:0,
    hh:'00',
    mm:'00',
    ss:'00'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    msFn(){
      var endtime=this.properties.seckillDatas.time_list[0].frist_end_time;
      
      var data=new Date();
      var time=data.getTime();

      var data1=new Date(endtime);
      var time1=data1.getTime();
      var difference=time1-time;
      if(difference!=0){
        var h=Math.floor(difference/1000/60/60)%24;
        var m=Math.floor(difference/1000/60)%60;
        var s=Math.floor(difference/1000)%60;
        this.setData({
          hh:h<10?"0"+h:h,
          mm:m<10?"0"+m:m,
          ss:s<10?"0"+s:s
        })
      }
    },
    seckilFn(e){
      this.setData({
        flag:e.currentTarget.dataset.index,
      })
     
      var tomorrowI=0;
      if(e.currentTarget.dataset.index==0){
        tomorrowI=0
      }else{
        tomorrowI=1
      }
      wx.request({
        url: 'https://x.dscmall.cn/api/visual/visual_seckill',
        data:{
          id:e.currentTarget.dataset.id,
          tomorrow:tomorrowI
        },
        success:(res)=>{
          this.setData({
            seckillDatas:res.data.data
          })
        }
      })
    }
  },
  //初次加载组件时执行
  attached: function () {
    // this.seckilFn();
    setInterval(() => {
      this.msFn();
    }, 1000);
  }
})
