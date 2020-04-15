import config from '../utils/config'
import util from '../utils/util'


const requestSubscribe = function(){
    return new Promise((resolve, reject) => {
        wx.requestSubscribeMessage({
            tmplIds: ["z-raFxtQPN04ZtEGrOn2_rhy5QVZ3qng3yM3gm1koIQ"],
            success: (res) => {
                if (res['z-raFxtQPN04ZtEGrOn2_rhy5QVZ3qng3yM3gm1koIQ'] === 'accept'){
                    wx.showToast({
                        title: '订阅OK！',
                        duration: 1000,
                        success(data) {
                            //成功
                            resolve()
                        }
                    })
                }
            },
            fail(err) {
                //失败
                console.error(err);
                reject()
            }
        })
    })
}

module.exports = {
    requestSubscribe: requestSubscribe
}




