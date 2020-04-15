import config from '../utils/config'
import util from '../utils/util'
import regeneratorRuntime from "../utils/runtime"

const wxCheckSession = function () {
    return new Promise(function(resolve, reject) {
        wx.checkSession({
            success: res => {
                let getSessionKeyExpireTime = wx.getStorageSync('getSessionKeyExpireTime')
                // session_key 未过期，并且在本生命周期一直有效
                console.log('Wx检测sessionKey未过期')
                // 后端检测sessionKey是否过期
                let now = Date.parse(new Date())
                now = now / 1000
                if (getSessionKeyExpireTime < now) {
                    resolve(false)
                }else {
                    resolve(true)
                }
            },
            fail () {
                resolve(false)
            }
        })
    })
}

const wxLogin = function () {
    return new Promise(function(resolve, reject) {
        // session_key 已经失效，需要重新执行登录流程
        wx.login({
            success: res => {
                console.log("code: " + res.code)
                resolve(res.code)
            },
        })
    })
}

const getOpenid = function(code,app) {
    return new Promise(function(resolve, reject) {
        let app = getApp()
        wx.request({
            url: config.getConfig().adminHost + '/user/login',
            method: 'POST',
            data: {
                appid: app.globalData.appid,
                client_version: app.globalData.client_version,
                code: code
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                const loginData = util.requestResHandle(res,app)
                console.log("获取 openid 结果", loginData)
                // 设置缓存
                if (loginData) {
                    try {
                        wx.setStorageSync(
                            "sessionKeyExpireTime",
                            loginData.expire_time
                        )
                        wx.setStorageSync(
                            "openid",
                            loginData.openid
                        )
                    } catch(e) {
                        console.log(e)
                    }
                    resolve(loginData.openid)
                }
            },
            fail(res) {
                console.log(res)
            }
        })
    })
}

async function checkLoginAsync(app){
    try{
        console.log("wxCheckSession")
        const sessionStatus = await wxCheckSession();
        console.log("sessionStatus",sessionStatus)
        if (!sessionStatus){
            console.log("wxLogin")
            const code = await wxLogin();
            console.log("code" , code)
            console.log("getOpenid")
            const openid = await getOpenid(code,app);
            console.log("openid" , openid)
        }
    }catch (e) {
        console.log(e)
    }
}

/**
 * 检测登陆
 */
const checkLogin = function (app) {
    checkLoginAsync(app)
}

const getUserStatus = function(app) {
    wx.showLoading({
        title: '玩命加载中',
        mask:true
    })
    var openid = wx.getStorageSync('openid')
    console.log("openid" , openid)
    console.log(app)
    wx.request({
        url: config.getConfig().adminHost + '/user/get_status',
        method: 'POST',
        data: {
            openid: openid,
        },
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success (res) {
            console.log("用户的状态为: " , res)
            const userStatus = util.requestResHandle(res,app)
            wx.hideLoading()
            if(userStatus.is_auth === 0){
                wx.redirectTo({
                    url: '/pages/index/index',
                })
            }else if (userStatus.is_auth === 1){
                wx.redirectTo({
                    url: '/pages/msg/msg',
                })
            }

        },
        fail (res) {
            console.log(res)
        }
    })
}

const getWxUserInfo = function() {
    console.log("getWxUserInfo")
    return new Promise(function(resolve, reject) {
        // 查看是否授权
        wx.getSetting({
            success (res){
                console.log(res.authSetting)
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    console.log("wx.getUserInfo")
                    wx.getUserInfo({
                        withCredentials: true,
                        lang: "zh_CN",
                        success: function(res) {
                            resolve(res)
                        },
                        fail(res){
                            console.log(res)
                        }
                    })
                }
            },
            fail(res){
                console.log(res)
            }
        })
    })
}

const setUserInfo = function(encryptedData,iv,app) {
    return new Promise(function(resolve, reject) {
        let openid = wx.getStorageSync('openid')
        let setRes = util._post(
                "/user/set_user_info",
                {
                    openid: openid,
                    encryptedData: encryptedData,
                    iv: iv
                },
                app
            )
        if (setRes !== false) {
            wx.redirectTo({
                url: '/pages/msg/msg',
            })
        }
    })
}

const getUserInfo = async function (app) {
    console.log("getUserInfo",app)
    let openid = wx.getStorageSync('openid')
    console.log("openid",openid)
    if (openid === "") {
        checkLogin()
    }
    let userInfo = await util._asyncPost(
        "/user/get_user_info",
        {
            openid: openid,
        },
        app
    )
    console.log("userInfo",userInfo)
    return userInfo
}

module.exports = {
    checkLogin: checkLogin, // 检测登陆
    getUserInfo: getUserInfo,// 获取用户信息
    setUserInfo: setUserInfo,// 设置用户信息
    getWxUserInfo: getWxUserInfo,// 获取微信用户信息
    getUserStatus: getUserStatus,// 获取用户状态
}