// pages/leave/leave.js
import util from "../../utils/util";
import config from "../../utils/config";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        modalVisible: false,
        leaveTypeShow: false,
        leaveTypeValue: "事假",
        leaveDate: '',
        leaveDateShow: false,
        leaveDays: 0,
        leaveForm: {
            type: 1
        }, // 请假表单
        leaveTypes: [
            {
                typeId: 1,
                name: '事假'
            },
            {
                typeId: 2,
                name: '病假'
            },
            {
                typeId: 3,
                name: '其他',
            }
        ],
        fileList: ["https://subscription-oss.oss-cn-beijing.aliyuncs.com/2020-04-25-140747-vCW4OJ.jpeg"],
        verifierId: 0,
        verifierColumns: [],
        verifierSelectorShow: false,
        verifierList: [],
        verifierSelectorLoading: false,
        verifierListShow: []
    },
    // 上传文件
    afterRead(event) {
        const that = this
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        const {file} = event.detail;
        let openid = wx.getStorageSync('openid');
        wx.uploadFile({
            url: config.getConfig().adminHost + '/common/uploadFile',
            filePath: file.path,
            name: 'file',
            formData: {openid: openid},
            success(res) {
                let resData = util.requestResHandle({data: JSON.parse(res.data)}, that)
                console.log("上传结果:", resData)
                // 上传完成需要更新 fileList
                let fileList = that.data.fileList
                fileList.push({...file, url: resData.url});
                that.setData({fileList: fileList});
            },
            fail(res){
                console.log("uploadFile fail", res)
            }
        });
    },
    submit: function () {
    },
    modalHandelOk: function () {
        util.modalHandelOk(this)
    },
    modalHandelNo: function () {
        util.modalHandelNo(this)
    },
    onSelectShow: function () {
        this.setData({leaveTypeShow: true});
    },
    onLeaveTypeClose() {
        this.setData({leaveTypeShow: false});
    },
    onLeaveTypeSelect(event) {
        this.setData({
            leaveTypeValue: event.detail.name,
            "leaveForm.type": event.detail.typeId
        })
        console.log(this.data.leaveForm)
    },
    onDateShow() {
        this.setData({leaveDateShow: true});
    },
    onDateClose() {
        this.setData({leaveDateShow: false});
    },

    formatDate(date) {
        date = new Date(date);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    setLeaveDays(faultDate, completeTime) {
        let stime = Date.parse(new Date(faultDate));
        let etime = Date.parse(new Date(completeTime));
        let usedTime = etime - stime;
        return Math.floor(usedTime / (24 * 3600 * 1000));
    },
    // 设置日期
    onConfirm(date) {
        const [start, end] = date.detail;
        this.setData({
            leaveDateShow: false,
            leaveDate: `${this.formatDate(start)} - ${this.formatDate(end)}`,
            leaveDays: this.setLeaveDays(start, end)
        });
    },
    // 输入请假备注
    serLeaveRemark(data) {
        console.log(data.detail)
    },

    // 设置审核人
    onVerifierShow: async function(){
        console.log("onVerifierShow")
        this.setData({
            verifierSelectorShow: true,
            verifierSelectorLoading: true,
        })
        let openid = wx.getStorageSync('openid');
        let res = await util._asyncPost(
            "/user/teacher_list",
            {
                "openid": openid
        },this)
        console.log("res",res)

        let teacherListShow = res.teacher_list_show
        let teacherList = res.teacher_list
        let first = teacherListShow[Object.keys(teacherListShow)[0]]
        let teacherColumns = [
            {
                values: Object.keys(teacherListShow),
                className: 'column1'
            },
            {
                values: first,
                className: 'column2',
                defaultIndex: 0
            }
        ]
        this.setData({
            verifierColumns: teacherColumns,
            verifierList: teacherList,
            verifierSelectorLoading: false,
            verifierListShow: teacherListShow
        })
        console.log(this.data.verifierSelectorShow)
    },
    verifierSelectorClose: function(){
        this.setData({verifierSelectorShow: false})
    },
    onVerifierPickerChange: function(event) {
        const { picker, value, index } = event.detail;
        picker.setColumnValues(1, this.data.verifierListShow[value[0]]);
    },
    onVerifierPickerConfirm: function(event){
        const { value, index } = event.detail
        console.log(value,"value")
        console.log(index, "index")
        if(this.data.verifierId !== this.data.verifierList[value[0]][index[1]].id){
            this.setData({
                verifierId: this.data.verifierList[value[0]][index[1]].userId,
                verifier: value[1],
            })
        }
        this.setData({verifierSelectorShow: false})
    },
    onSchoolPickerCancel: function(){
        this.setData({verifierSelectorShow:false})
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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