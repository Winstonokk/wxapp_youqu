var app = getApp();
let col1H = 0;
let col2H = 0;

var all_loadingCount=0;
var all_images=[];

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
    // loadingCount: 20,
    // images: [
    //   {
    //     id: "5c2dabdb9d21226e068debf9",
    //     url: "https://ws1.sinaimg.cn/large/0065oQSqly1fytdr77urlj30sg10najf.jpg",
    //     height: 0
    //   },

    //   {
    //     id: "5c25db189d21221e8ada8664",
    //     url: "https://ws1.sinaimg.cn/large/0065oQSqly1fymj13tnjmj30r60zf79k.jpg",
    //     height: 0
    //   },

    //   {
    //     id: "5c12216d9d21223f5a2baea2",
    //     url: "https://ws1.sinaimg.cn/large/0065oQSqgy1fy58bi1wlgj30sg10hguu.jpg",
    //     height: 0
    //   },

    //   {
    //     id: "5bfe1a5b9d2122309624cbb7",
    //     url: "https://ws1.sinaimg.cn/large/0065oQSqgy1fxno2dvxusj30sf10nqcm.jpg",
    //     height: 0
    //   },

    //   {
    //     id: "5bf22fd69d21223ddba8ca25",
    //     url: "https://ws1.sinaimg.cn/large/0065oQSqgy1fxd7vcz86nj30qo0ybqc1.jpg",
    //     height: 0
    //   },

    //   {
    //     id: "5be14edb9d21223dd50660f8",
    //     url: "https://ws1.sinaimg.cn/large/0065oQSqgy1fwyf0wr8hhj30ie0nhq6p.jpg",
    //     height: 0
    //   },

    //   {
    //     id: "5bcd71979d21220315c663fc",
    //     url: "https://ws1.sinaimg.cn/large/0065oQSqgy1fwgzx8n1syj30sg15h7ew.jpg",
    //     height: 0
    //   },

    //   {
    //     id: "5bc434ac9d212279160c4c9e",
    //     url: "https://ws1.sinaimg.cn/large/0065oQSqly1fw8wzdua6rj30sg0yc7gp.jpg",
    //     height: 0
    //   },

    //   {
    //     id: "5bbb0de09d21226111b86f1c",
    //     url: "https://ws1.sinaimg.cn/large/0065oQSqly1fw0vdlg6xcj30j60mzdk7.jpg",
    //     height: 0
    //   },

    //   {
    //     id: "5ba206ec9d2122610aba3440",
    //     url: "https://ws1.sinaimg.cn/large/0065oQSqly1fvexaq313uj30qo0wldr4.jpg",
    //     height: 0
    //   },

    //   {
    //     id: "5b9771a29d212206c1b383d0",
    //     url: "https://ws1.sinaimg.cn/large/0065oQSqly1fv5n6daacqj30sg10f1dw.jpg",
    //     height: 0
    //   },

    //   {
    //     id: "5b830bba9d2122031f86ee51",
    //     url: "https://ws1.sinaimg.cn/large/0065oQSqly1fuo54a6p0uj30sg0zdqnf.jpg",
    //     height: 0
    //   },

    //   {
    //     id: "5b7b836c9d212201e982de6e",
    //     url: "https://ws1.sinaimg.cn/large/0065oQSqly1fuh5fsvlqcj30sg10onjk.jpg",
    //     height: 0
    //   },

    //   {
    //     id: "5b74e9409d21222c52ae4cb4",
    //     url: "https://ws1.sinaimg.cn/large/0065oQSqly1fubd0blrbuj30ia0qp0yi.jpg",
    //     height: 0
    //   },

    //   {
    //     id: "5b7102749d2122341d563844",
    //     url: "https://ww1.sinaimg.cn/large/0065oQSqly1fu7xueh1gbj30hs0uwtgb.jpg",
    //     height: 0
    //   },

    //   {
    //     id: "5b6bad449d21226f45755582",
    //     url: "https://ww1.sinaimg.cn/large/0065oQSqgy1fu39hosiwoj30j60qyq96.jpg",
    //     height: 0
    //   },

    //   {
    //     id: "5b67b7fd9d2122195bdbd806",
    //     url: "https://ww1.sinaimg.cn/large/0065oQSqly1ftzsj15hgvj30sg15hkbw.jpg",
    //     height: 0
    //   },

    //   {
    //     id: "5b63cd4e9d21225e0d3f58c9",
    //     url: "https://ww1.sinaimg.cn/large/0065oQSqgy1ftwcw4f4a5j30sg10j1g9.jpg",
    //     height: 0
    //   },

    //   {
    //     id: "5b6151509d21225206860f08",
    //     url: "https://ww1.sinaimg.cn/large/0065oQSqly1ftu6gl83ewj30k80tites.jpg",
    //     height: 0
    //   },

    //   {
    //     id: "5b60356a9d212247776a2e0e",
    //     url: "http://ww1.sinaimg.cn/large/0065oQSqgy1ftt7g8ntdyj30j60op7dq.jpg",
    //     height: 0
    //   }
    // ]
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

    // let images = this.data.images;
    // let images = this.data.girlData.images;
    let images = this.all_images;

    console.log("hhhhhhhhhhhhhhhhhhh");
    console.log(images);

    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }

    imageObj.height = imgHeight;

    // let loadingCount = this.data.loadingCount - 1;
    // let loadingCount = this.data.girlData.loadingCount - 1;
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
    console.log("ggggggggggggggggggg");
    console.log(data);
  },

  getGirlListData: function() {
    var that = this;

    var size = 20;
    var page = 1;
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
        console.log(res)
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