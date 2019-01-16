var util = require('../../utils/MD5.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoPlay: null,

    huaxu_Videos: {}, //花絮
    yugao_Videos: {}, //预告
    shishang_Videos: {}, //时尚

    //上方tab
    navTab: ["花絮", "预告", "时尚"],
    currentNavtab: "0",
    indicatorDots: false,

  },

  switchTab: function(e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var type1 = "1";
    var type2 = "2";
    var type3 = "4";
    var page = 1;

    var huaxu_VideosUrl = app.globalData.videoBase +
      "/v1/index?page=" + page + "&type=" + type1;
    var yugao_VideosUrl = app.globalData.videoBase +
      "/v1/index?page=" + page + "&type=" + type2;
    var shishang_VideosUrl = app.globalData.videoBase +
      "/v1/index?page=" + page + "&type=" + type3;

    this.getVideoListData(huaxu_VideosUrl, "huaxu_Videos", "花絮");
    this.getVideoListData(yugao_VideosUrl, "yugao_Videos", "预告");
    this.getVideoListData(shishang_VideosUrl, "shishang_Videos", "时尚");

  },

  getVideoListData: function(url, settedKey, categoryTitle) {
    var that = this;
    console.log(url)

    //获取当前时间戳  
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;

    var signStr = "CPudpbCP20JnOQCmZ7UXHS5uGKvf64S6" + timestamp + "1.1.0" + "861875048330495" + "android";

    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json",
        //设置电影模拟请求头
        "timestamp": timestamp + "",
        "version": "1.1.0",
        "imei": "861875048330495",
        "platform": "android",
        "sign": util.hexMD5(signStr),
        "channel": "flyme",
        "device": "Mi A2",
        "token": "",
        "Accept": "application / json"
      },

      success: function(res) {
        console.log(res)
        that.processVideoData(res.data, settedKey, categoryTitle)
      },
      fail: function(error) {
        // fail
        console.log(error)
      }
    })
  },

  processVideoData: function(resData, settedKey, categoryTitle) {
    var videos = [];
    var allVideos = [];
    allVideos = resData.data;

    for (var idx in allVideos) {
      var subject = allVideos[idx];

      var title = subject.title;

      var author = subject.anchor;
      var avatar = subject.avatar;
      var playCount = subject.hot;
      var cover = subject.cover;
      var mp4_url = subject.url;
      var id = settedKey+subject.id;

      var temp = {
        id: id,
        author: author,
        avatar: avatar,
        title: title,
        playCount: playCount,
        cover: cover,
        mp4_url: mp4_url
      }
      videos.push(temp)
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      videos: videos
    }
    this.setData(readyData);
    console.log(readyData);
  },

  /**
   * 视频出错回调
   */
  videoErrorCallback: function(e) {
    console.log('视频错误信息:' + e.detail.errMsg);
  },

  // 点击cover播放，其它视频结束
  videoPlay: function(e) {
    console.log(e.currentTarget.dataset);
    var _index = e.currentTarget.dataset.id
    this.setData({
      _index: _index
    })
    //停止正在播放的视频
    var videoContextPrev = wx.createVideoContext(_index + "")
    videoContextPrev.stop();
    console.log("视频开始播放第" + _index);
    //将点击视频进行播放
    var videoContext = wx.createVideoContext(_index + "")
    videoContext.play();
    // setTimeout(function() {
    //   //将点击视频进行播放
    //   var videoContext = wx.createVideoContext(_index + "")
    //   videoContext.play();
    // }, 200)
  },


})