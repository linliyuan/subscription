// pages/msg/msg.js
import user from '../../service/user_service'
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    modalVisible: false,
    arr: [
      {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
      },
      {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
      },
      {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
      },
      {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
      },
      {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
      },
      {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
      }
    ],
    active: 'home'
  },

  modalHandelOk: function () {
    util.modalHandelOk(this)
  },
  modalHandelNo: function(){
    util.modalHandelNo(this)
  },

  onChange (e) {
    this.value = e.detail
  },

  onSearch () {
    console.log(this.globalData.sessionKeyExpireTime)
    wx.Toast('搜索' + this.value)
  },

  onClick () {
    wx.Toast('搜索' + this.value)
  },

  tabBarChang (e) {
    wx.redirectTo({
      url: '/pages/' + e.detail + '/' + e.detail,
    })
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