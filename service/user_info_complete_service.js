import config from "../utils/config"
import util from "../utils/util"
import user from "../service/user_service"

const getSchoolList = async function (app){
    let res = await util._asyncPost("/school/school_list",{},app)
    let schoolListShow = res.school_list.school_list_show
    let schoolList = res.school_list.school_list
    let schoolColumns = [
        {
            values: Object.keys(schoolList),
            className: 'column1'
        },
        {
            values: schoolListShow["广东省"],
            className: 'column2',
            defaultIndex: 0
        }
    ]
    app.setData({schoolListShow: schoolListShow})
    app.setData({schoolList: schoolList})
    app.setData({schoolColumns: schoolColumns})
}

const getDepartmentList = async function(app){
    if (app.data.formData.schoolId > 0){
        let res = await util._asyncPost("/school/department_list",{
            schoolId: app.data.formData.schoolId
        },app)
        app.setData({departmentList: res.departmentList,departmentSelectorShow: true})
    }else {
        wx.showToast({
          title: '请先选择学校'
        })
    }
}

const getMajorList = async function(app){
    if (app.data.formData.departmentId > 0){
        let res = await util._asyncPost("/school/major_list",{
            departmentId: app.data.formData.departmentId
        },app)
        app.setData({majorList: res.majorList, majorSelectorShow: true})
    }else {
        wx.showToast({
            title: '请先选择院系'
        })
    }
}

const getClassList = async function(app){
    if (app.data.formData.majorId > 0){
        let res = await util._asyncPost("/school/class_list",{
            majorId: app.data.formData.majorId
        },app)
        app.setData({classList: res.classList, classSelectorShow: true})
    }else {
        wx.showToast({
            title: '请先选择专业'
        })
    }
}

const getCompleteUserInfo = async function (app) {
    let openid = wx.getStorageSync('openid')
    if (openid === "") {
         openid = await user.checkLogin(app)
    }
    let userInfo = await util._asyncPost(
        "/user/get_complete_user_info",
        {
            openid: openid,
        },
        app
    )
    app.setData({
        isComplete: userInfo.isComplete,
        nickName: userInfo.nickName,
        realName: userInfo.realName,
        miniPhone: userInfo.miniPhone,
        birthday: userInfo.birthday,
        genderValue: userInfo.genderValue,
        identityValue: userInfo.identityValue,
        schoolName: userInfo.schoolName,
        departmentName: userInfo.departmentName,
        className: userInfo.className,
        majorName: userInfo.majorName,
        "formData.realName": userInfo.realName,
        "formData.miniPhone": userInfo.miniPhone,
        "formData.birthday": userInfo.birthday,
        "formData.gender": userInfo.gender,
        "formData.schoolId": userInfo.schoolId,
        "formData.departmentId": userInfo.departmentId,
        "formData.majorId": userInfo.majorId,
        "formData.classId": userInfo.classId,
        "formData.identity": userInfo.identity,
    })
    return userInfo
}

const completeUserInfo = async function(completeData, app){
    let res = await util._asyncPost(
        "/user/complete_user_info",
        completeData,
        app
    )
    console.log(res)
    if (res !== false){
        wx.redirectTo({
          url: '/pages/user/user'
        })
    }
}


module.exports = {
    getSchoolList: getSchoolList, // 获取学校列表
    getDepartmentList: getDepartmentList, // 获取对应院系列表
    getMajorList: getMajorList, // 获取对应专业列表
    getClassList: getClassList, // 获取对应的班级
    getCompleteUserInfo: getCompleteUserInfo, // 获取用户完整信息
    completeUserInfo: completeUserInfo, // 完善用户完整信息
}