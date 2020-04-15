// pages/index/index.js
import user from '../../service/user_service'
import config from "../../utils/config";
import util from "../../utils/util";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    modalVisible: false
  },

  modalHandelOk: function () {
    util.modalHandelOk(this)
  },
  modalHandelNo: function(){
    util.modalHandelNo(this)
  },

  async startSbAsync(){
    try{
      const res = await user.getWxUserInfo();
      console.log("getWxUserInfo" , res)
      if (res) {
        let a = await user.setUserInfo(res.encryptedData , res.iv,this)
      }
    }catch (e) {
      console.log(e)
    }
  },

  startSb: function(){
    this.startSbAsync()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

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