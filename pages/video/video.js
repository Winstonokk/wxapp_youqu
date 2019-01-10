var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotVideos: {},//热点
    jokeVideos: {},//搞笑
    yuleVideos: {},//娱乐
    goodVideos: {},//精品
    //上方tab
    navTab: ["热点", "搞笑", "娱乐","精品"],
    currentNavtab: "0",
    indicatorDots: false
  },

  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tag1 = "V9LG4B3A0";
    var tag2 = "V9LG4E6VR";
    var tag3 = "V9LG4CHOR";
    var tag4 = "00850FRB";
    // http://c.3g.163.com/nc/video/list/VAP4BGTVD/n/1-10.html
    
    var page = 1;

    var hotVideosUrl = app.globalData.videoBase +
      "/nc/video/list/" + tag1 + "/n/" + page + "-10.html";
    var jokeVideosUrl = app.globalData.videoBase +
      "/nc/video/list/" + tag2 + "/n/" + page + "-10.html";
    var yuleVideosUrl = app.globalData.videoBase +
      "/nc/video/list/" + tag3 + "/n/" + page + "-10.html";
    var goodVideosUrl = app.globalData.videoBase +
      "/nc/video/list/" + tag4 + "/n/" + page + "-10.html";

    this.getVideoListData(hotVideosUrl, "hotVideos", tag1);
    this.getVideoListData(jokeVideosUrl, "jokeVideos", tag2);
    this.getVideoListData(yuleVideosUrl, "yuleVideos", tag3);
    this.getVideoListData(goodVideosUrl, "goodVideos", tag4);
  },

  getVideoListData: function (url, settedKey, categoryTitle) {
    var that = this;
    console.log(url)
    wx.request({
      url: url,
      method: 'GET', 
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res)
        // that.processVideoData(res.data, settedKey, categoryTitle)
      },
      fail: function (error) {
        // fail
        console.log(error)
      }
    })
  },
  processVideoData: function (resData, settedKey, categoryTitle) {
    var videos = [];
    resData.get
    for (var idx in resData.tag1.books) {
      var subject = booksDouban.books[idx];
      var title = subject.title;
      if (title.length >= 10) {
        title = title.substring(0, 10) + "...";
      }
      var author = subject.author;
      var publisher = subject.publisher;
      var pubdate = subject.pubdate;
      var summary = subject.summary;
      if (summary.length >= 30) {
        summary = "&nbsp;&nbsp;" + summary.substring(0, 30) + "...";
      }
      // [1,1,1,1,1] [1,1,1,0,0]
      var temp = {
        stars: util.convertToStarsArray(subject.rating.average / 2),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        bookId: subject.id,
        publisher: author + "/" + publisher + "/" + pubdate,
        summary: summary
      }
      books.push(temp)
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      books: books
    }
    this.setData(readyData);
    console.log(readyData);
  }

})