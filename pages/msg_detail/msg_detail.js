// pages/msg_detail/msg_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [
      { url: "https://subscription-oss.oss-cn-beijing.aliyuncs.com/2020-04-26-003046-KFL4Da.xlsx", name: '审核.xlsx' },
      { url: "https://subscription-oss.oss-cn-beijing.aliyuncs.com/2020-04-25-140747-vCW4OJ.jpeg", name: '图片1' },

    ]
  },
  try: function(res){
    console.log(res)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})