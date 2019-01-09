// pages/welcome/welcome.js
// start雷达图初始化数据
var topText = ["帅气", "时尚", "典雅", "甜美", "自然", "浪漫", "文雅", "摩登"];

var allSpaceTime = 50; //线程执行间隔时间

var animateinterval = '';

var rangArr = [

  {

    endText: '友趣',

    texts: topText,

    beginTime: 500,

    spacetime: 10,

    stime: 500

  }, {

    endText: '清爽干练',

    texts: topText,

    beginTime: 1000,

    spacetime: 10,

    stime: 1000

  }, {

    endText: '潮流妹纸',

    texts: topText,

    beginTime: 1200,

    spacetime: 10,

    stime: 1000

  }, {

    endText: '几何',

    texts: topText,

    beginTime: 1400,

    spacetime: 10,

    stime: 1000

  }, {

    endText: '炫酷雪花',

    texts: topText,

    beginTime: 1800,

    spacetime: 10,

    stime: 1000

  }, {

    endText: '中性风',

    texts: topText,

    beginTime: 2000,

    spacetime: 10,

    stime: 1000

  }, {

    endText: '精选图书',

    texts: topText,

    beginTime: 2200,

    spacetime: 10,

    stime: 1000

  }, {

    endText: '火爆视频',

    texts: topText,

    beginTime: 2400,

    spacetime: 10,

    stime: 1000

  }

]

Page({



  /**
  
  * 页面的初始数据
  
  */

  data: {

    text1: '',

    text2: '',

    text3: '',

    text4: '',

    text5: '',

    text6: '',

    text7: '',

    text8: '',

  },



  /**
  
  * 生命周期函数--监听页面加载
  
  */

  onLoad: function(options) {

    topText = ["帅气", "时尚", "典雅", "甜美", "自然", "浪漫", "文雅", "摩登"]

  },



  /**
  
  * 生命周期函数--监听页面初次渲染完成
  
  */

  onReady: function() {

    this.randDomText();

  },



  /**
  
  * 生命周期函数--监听页面显示
  
  */

  onShow: function() {

  },

  /**
   * 前往主界面
   */
  goToMain: function() {
    wx.switchTab({
      url: "../book/book"
    });
    
  },

  // 文字闪烁动画

  randDomText: function() { //endText最终显示文字，texts闪烁文字，time延迟时间,spacetime闪烁频率,stime闪烁周期

    var that = this;

    for (var i = 0; i < rangArr.length; i++) {

      var rang = rangArr[i];

      rang['runTime'] = 0; //累计运行时间

      rang['isRun'] = false; //是否已经开始在执行了

      rang['isStop'] = false; //是否已经执行完毕了

    };



    animateinterval = setInterval(function() {

      var stop = true;

      var showData = {};

      for (var i = 0; i < rangArr.length; i++) {

        var rangXX = rangArr[i];

        if (!rangXX['isStop']) {

          stop = false; //只要有一个没执行完就 就继续执行

          rangXX['runTime'] = rangXX['runTime'] + allSpaceTime; //累计执行时间开始叠加

          var changeWord = false; //是否修改词

          if (!rangXX['isRun']) { //如果还没开始跑，判断下时间是否已经到开始跑的时间

            if (rangXX['runTime'] >= rangXX['beginTime']) { //

              rangXX['isRun'] = true; //到开始跑时间了

            } else {

              continue;

            }

          } else if (rangXX['runTime'] >= (rangXX['stime'] + rangXX['beginTime'])) { //如果当前队列的已经执行完毕，则显示最后一次的数据

            rangXX['isStop'] = true;

            if (rangXX['lastWord'] != rangXX['endText']) {

              rangXX['lastWord'] = rangXX['endText'];

              showData['text' + (i + 1)] = rangXX['endText']; //显示最后的词

            }

            continue;

          }

          var index = Math.floor((rangXX['runTime'] - rangXX['beginTime']) / rangXX['spacetime']) % rangXX['texts'].length;

          var showWord = rangXX['texts'][index];

          if (rangXX['lastWord'] != showWord) {

            rangXX['lastWord'] = showWord;

            showData['text' + (i + 1)] = showWord;

          }



        } else {

          continue;

        }

      }



      if (JSON.stringify(showData) != "{}") {

        that.setData(showData);

      }

      if (stop) {

        clearInterval(animateinterval);

      }

    }, allSpaceTime);

  },

  /**
  
  * 生命周期函数--监听页面隐藏
  
  */

  onHide: function() {

  },



  /**
  
  * 生命周期函数--监听页面卸载
  
  */

  onUnload: function() {

  },



  /**
  
  * 页面相关事件处理函数--监听用户下拉动作
  
  */

  onPullDownRefresh: function() {

  },



  /**
  
  * 页面上拉触底事件的处理函数
  
  */

  onReachBottom: function() {

  },



  /**
  
  * 用户点击右上角分享
  
  */

  onShareAppMessage: function() {

  }

})