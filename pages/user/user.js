// pages/user/user_service.js
import user from '../../service/user_service'
import subscribe from '../../service/subscribe_service'
import util from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 'user',
    avatarUrl: "/static/img/default.jpg",
    nickName: "请重新登陆",
    schoolName: "未绑定学校",
    subscribeStatus: false,
    modalVisible: false
  },

  modalHandelOk: function () {
    util.modalHandelOk(this)
  },
  modalHandelNo: function(){
    util.modalHandelNo(this)
  },
  tabBarChang(e) {
    wx.redirectTo({
      url: '/pages/' + e.detail + '/' + e.detail,
    })
  },

  switchSubscribeMessage: async function (e){
    let currentSubscribeStatus = !this.data.subscribeStatus
    console.log("currentSubscribeStatus", currentSubscribeStatus)
    if (currentSubscribeStatus){
      // 执行的是关闭

    }else {
      // 执行订阅
      subscribe.requestSubscribe()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let userInfo = await user.getUserInfo(this)
    console.log(userInfo)
    if (userInfo) {
      if (userInfo.nickName) {
        this.setData({
          nickName: userInfo.nickName,
        })
      }
      if (userInfo.schoolName) {
        this.setData({
          school: userInfo.schoolName,
        })
      }
      if (userInfo.subscribeStatus === 1) {
        this.setData({
          subscribeStatus: userInfo.subscribeStatus,
        })
      }
    }
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