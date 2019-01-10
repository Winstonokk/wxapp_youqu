var app = getApp();
let col1H = 0;
let col2H = 0;

var all_loadingCount=0;
var all_images=[];
var start_page = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    girlData: {}, //美女数据集
    scrollH: 0,
    imgWidth: 0,
    col1: [],
    col2: [],
    // loadingCount: 0,
    // images: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });

        this.getGirlListData();
      }
    })

  },

  onImageLoad: function(e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width; //图片原始宽度
    let oImgH = e.detail.height; //图片原始高度
    let imgWidth = this.data.imgWidth; //图片设置的宽度
    let scale = imgWidth / oImgW; //比例计算
    let imgHeight = oImgH * scale; //自适应高度

    let images = this.all_images;

    // console.log("hhhhhhhhhhhhhhhhhhh");
    // console.log(images);

    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }

    imageObj.height = imgHeight;

    let loadingCount = this.all_loadingCount - 1;
   
    let col1 = this.data.col1;
    let col2 = this.data.col2;

    if (col1H <= col2H) {
      col1H += imgHeight;
      col1.push(imageObj);
    } else {
      col2H += imgHeight;
      col2.push(imageObj);
    }

    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };

    if (!loadingCount) {
      data.images = [];
    }

    this.setData(data);
    // console.log("ggggggggggggggggggg");
    // console.log(data);
  },

  getGirlListData: function() {
    var that = this;

    var size = 20;
    var page = start_page +1;
    var girlUrl = app.globalData.gankBase +
      "/api/data/福利/" + size + "/" + page;
    var settedKey = "girlData";

    console.log(girlUrl)
    wx.request({
      url: girlUrl,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        start_page=start_page+1;
        console.log(res)
        console.log("wwwwww" + start_page)
        that.processGirlData(res.data, settedKey)
      },
      fail: function(error) {
        // fail
        console.log(error)
      }
    })
  },
  processGirlData: function(girlRes, settedKey) {
    var girls = [];
    for (var idx in girlRes.results) {
      var subject = girlRes.results[idx];
      var girlUrl = subject.url;
      var id = subject._id;

      var temp = {
        id: id,
        url: girlUrl,
        height: 0
      }
      girls.push(temp)
    }

    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: "福利美女",
      loadingCount: girls.length,
      images: girls
    }
    this.setData(readyData);
    console.log(readyData);
    
    // this.setData({
    //   loadingCount: girls.length,
    //   images: girls
    // });
    // console.log(images);

    this.all_images=girls;
    this.all_loadingCount=girls.length;
    console.log(this.all_images)
    console.log(this.all_loadingCount)
  }

})