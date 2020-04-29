import config from '../utils/config'
import util from '../utils/util'


const wxSubscribe = function(app){
    return new Promise((resolve, reject) => {
        wx.requestSubscribeMessage({
            tmplIds: ["z-raFxtQPN04ZtEGrOn2_rhy5QVZ3qng3yM3gm1koIQ"],
            success: (res) => {
                if (res['z-raFxtQPN04ZtEGrOn2_rhy5QVZ3qng3yM3gm1koIQ'] === 'accept'){
                    wx.showToast({
                        title: '订阅OK！',
                        duration: 1000,
                    })
                    resolve(true)
                }else {
                    resolve(false)
                }
            },
            fail(err) {
                //失败
                resolve(false)
                console.error(err);
            }
        })
    })
}

const requestSubscribe = function(app, subscribeStatus){
    let openid = wx.getStorageSync('openid');
    util._asyncPost(
        "/user/change_subscribe_status",
        {
            openid: openid,
            subscribeStatus: subscribeStatus
        },
        app
    )
}

module.exports = {
    wxSubscribe: wxSubscribe,
    requestSubscribe: requestSubscribe,
}




