//app.js
require("utils/vue.js");
import util from 'utils/util'
import user from 'service/user_service'
// import regeneratorRuntime from "./utils/runtime"
App({
  globalData: {
    // 固定的配置信息
    appid: "wx3685ea18873c54e5", // appid
    client_version: "0.0.1", // 版本号
  },
  onLaunch: function () {
    // user.checkLogin(this)
    // user.getUserStatus(this)
  },
  onShow: function () {
  },
  onHide: function () {
  },
});