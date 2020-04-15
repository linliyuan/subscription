import config from '../utils/config'
import util from '../utils/util'

const getWorkSetList = async function (app) {
    return new Promise(function(resolve, reject) {
        let openid = wx.getStorageSync('openid');
        let WorkSetList = util._asyncPost(
            "/work/get_work_set_list",
            {
                "openid": openid
            },
            app
        );
        resolve(WorkSetList)
    })
}


module.exports = {
    getWorkSetList: getWorkSetList
}