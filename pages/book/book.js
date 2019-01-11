var util = require('../../utils/util.js')
var app = getApp();
var start_page = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newBook: {},//新书
    hotBook: {},//热门
    tuijianBook: {},//推荐
    //上方tab
    navTab: ["新书",  "热门", "推荐"],
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
    var tag1 = "新书";
    var tag2 = "热门";
    var tag3 = "推荐";
    var fields = "id,title,subtitle,origin_title,rating,author,translator,publisher,pubdate,summary,images,pages,price,binding,isbn13,series,alt";
    var count =10;
    var start = 0;
    var newBookUrl = app.globalData.doubanBase +
      "/v2/book/search" + "?start=" + start + "&count=" + count + "&tag=" + tag1 + "&fields=" + fields;
    var hotBookUrl = app.globalData.doubanBase +
      "/v2/book/search" + "?start=" + start + "&count=" + count + "&tag=" + tag2 + "&fields=" + fields;
    var tuijianBookUrl = app.globalData.doubanBase +
      "/v2/book/search" + "?start=" + start + "&count=" + count + "&tag=" + tag3 + "&fields=" + fields;

    this.getBookListData(newBookUrl, "newBook",tag1);
    this.getBookListData(hotBookUrl, "hotBook", tag2);
    this.getBookListData(tuijianBookUrl, "tuijianBook", tag3);
  },

  getBookListData: function (url,settedKey, categoryTitle) {
    var that = this;
    console.log(url)
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res)
        that.processDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: function (error) {
        // fail
        console.log(error)
      }
    })
  },
  processDoubanData: function (booksDouban, settedKey,categoryTitle) {
    var books = [];
    for (var idx in booksDouban.books) {
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
        summary = "&nbsp;&nbsp;"+summary.substring(0, 30) + "...";
      }
      // [1,1,1,1,1] [1,1,1,0,0]
      var temp = {
        stars: util.convertToStarsArray(subject.rating.average/2),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        bookId: subject.id,
        publisher: author+"/"+publisher+"/"+pubdate,
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