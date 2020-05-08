// 通用方法 (一些缓存的数据写在这里)
import config from "./config";

const { $Toast } = require('../components/iview_weapp/base/index');

const _post = function (url,data) {
  let app = this
  wx.request({
    url: config.getConfig().adminHost + url,
    method: 'POST',
    data: data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success (res) {
      console.log(res)
      return requestResHandle(res,app)
    },
    fail (res) {
      console.log("res",res)
      if (typeof(app.data.modalVisible) != "undefined"){
        app.setData({
          modalVisible: true
        })
      }else {
        wx.showToast({
          title: '请联系开发人员！',
          duration: 1000,
        })
      }
    }
  })
}

const _asyncPost = function (url, data, app) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: config.getConfig().adminHost + url,
      method: 'POST',
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        resolve(requestResHandle(res, app))
      },
      fail (res) {
        if (typeof(app.data.modalVisible) != "undefined"){
          app.setData({
            modalVisible: true
          })
        }else {
          wx.showToast({
            title: '请联系开发人员！',
            duration: 1000,
          })
        }
      }
    })
  })
}

/**
 * 统一返回处理
 */
const requestResHandle = function (res,app) {
  let data = res.data
  if (data.errCode !== 0) {
    console.log(res)
    switch (data.errCode) {
      case 40010:
        wx.redirectTo({
          url: '/pages/index/index',
        })
    }
    if (data.isShow === 1) {
      $Toast({
        type: 'fail',
        message: data.errMsg
      })
      return false
    } else {
      if (typeof(app.data.modalVisible) != "undefined"){
        app.setData({
          modalVisible: true
        })
      }else {
        wx.showToast({
          title: '请联系开发人员！',
          duration: 1000,
        })
      }
      return false
    }
  }
  return data.data
}

const modalHandelOk = function(app){
  if (typeof(app.data.modalVisible) != "undefined"){
    wx.redirectTo({
      url: '/pages/feedback/feedback',
    })
  }
}

const modalHandelNo = function(app){
  if (typeof(app.data.modalVisible) != "undefined"){
    app.setData({
      modalVisible: false
    })
  }
}

const formatDate = function(date) {
  date = new Date(date);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function dateToDateString(date) {
  let year  = date.getFullYear()
  let month  = date.getMonth() + 1
  if (month < 10){
    month = "0" + month
  }
  let day  = date.getDate()
  return year + "-" + month + "-" + day
}

// time单位毫秒
const sleep = function(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

module.exports = {
  _post: _post,
  _asyncPost: _asyncPost,
  requestResHandle: requestResHandle,
  modalHandelOk: modalHandelOk,
  modalHandelNo: modalHandelNo,
  formatDate: formatDate,
  dateToDateString: dateToDateString,
  sleep: sleep
};
