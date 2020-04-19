import config from "../utils/config"
import util from "../utils/util"

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


module.exports = {
    getSchoolList: getSchoolList, // 获取学校列表
    getDepartmentList: getDepartmentList, // 获取对应院系列表
    getMajorList: getMajorList, // 获取对应专业列表
    getClassList: getClassList, // 获取对应的班级
}