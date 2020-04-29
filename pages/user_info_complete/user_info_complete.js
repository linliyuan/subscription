// pages/user_info_complete/user_info_complete.js
import util from "../../utils/util"
import _service from "../../service/user_info_complete_service"
import user_service from "../../service/user_service"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    today: util.dateToDateString(new Date()),
    isComplete: 0,
    modalVisible: false,
    birthday: "",
    birthdayShow: false,
    genderSelectorShow: false,
    genderColumns: [
        {
          id: 1,
          name: "男"
        },
      {
        id: 2,
        name: "女"
      }
    ],

    schoolSelectorShow: false,
    departmentSelectorShow: false,
    majorSelectorShow: false,
    classSelectorShow: false,


    schoolName: "",
    departmentName: "",
    majorName: "",
    className: "",

    schoolList: {},
    schoolListShow: [],
    schoolColumns: [
      {
        values: ["广东省"],
        className: 'column1'
      },
      {
        values: ["惠州学院"],
        className: 'column2',
        defaultIndex: 2
      }
    ],

    departmentList: [],
    majorList: [],
    classList: [],


    identitySelectorShow: false,
    identityColumns: [
      {
        id: 1,
        name: "学生"
      },
      {
        id: 2,
        name: "教师"
      },
      {
        id: 3,
        name: "普通职工"
      }
    ],

    formData: {
      realName: "",
      miniPhone: "",
      birthday: "",
      gender: 0,
      schoolId: 0,
      departmentId: 0,
      majorId: 0,
      classId: 0,
      identity: 0,
    },


  },

  // 响应错误
  modalHandelOk: function () {
    util.modalHandelOk(this)
  },
  modalHandelNo: function(){
    util.modalHandelNo(this)
  },
  // 修改手机号
  onRealNameChange: function(event){
    console.log(event.detail.value)
    this.setData({
      "formData.realName": event.detail.value
    })
  },
  // 修改手机号
  onMiniPhoneChange: function(event){
    this.setData({
      "formData.miniPhone": event.detail.value
    })
  },

  // 生日
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      birthday: e.detail.value,
      "formData.birthday": e.detail.value,
    })
  },

  // 选择性别
  onSelectGenderShow: function(){
    this.setData({
      genderSelectorShow: true
    })
  },
  onGenderSelectorClose: function(){
    this.setData({genderSelectorShow: false})
  },
  onGenderSelectorSelect: function(event){
    let gender = event.detail
    this.setData({genderValue: gender.name, genderSelectorShow: false, "formData.gender": gender.id})
  },

  // 选择学校
  onSelectSchoolShow: function(){
    if (this.data.isComplete == 1){
      return;
    }
    this.setData({schoolSelectorShow: true})
  },
  schoolSelectorClose: function(){
    this.setData({schoolSelectorShow: false})
  },
  onSchoolPickerChange: function(event) {
    const { picker, value, index } = event.detail;
    picker.setColumnValues(1, this.data.schoolListShow[value[0]]);
  },
  // 清除下级选择
  clearSchoolLower: function(){
    this.setData({
      departmentName: "", departmentList: [], "formData.departmentId": 0,
      majorName: "", majorList: [], "formData.majorId": 0,
      className: "", classList: [], "formData.classId": 0,
    })
  },
  onSchoolPickerConfirm: function(event){
    const { value, index } = event.detail
    if(this.data.formData.schoolId !== this.data.schoolList[value[0]][index[1]].id){
      this.setData(
          {"formData.schoolId": this.data.schoolList[value[0]][index[1]].id,schoolName: this.data.schoolList[value[0]][index[1]].name,schoolSelectorShow:false}
      )
      this.clearSchoolLower()
    }else {
      this.setData({schoolSelectorShow: false})
    }
  },
  onSchoolPickerCancel: function(){
    this.setData({schoolSelectorShow:false})
  },

  // 院系选择
  onSelectDepartmentShow: function(){
    if (this.data.isComplete == 1){
      return;
    }
    _service.getDepartmentList(this)
  },
  onDepartmentSelectorClose: function(){
    this.setData({departmentSelectorShow: false})
  },

  // 清除下级选择
  clearDepartmentLower: function(){
    this.setData({
      majorName: "", majorList: [], "formData.majorId": 0,
      className: "", classList: [], "formData.classId": 0,
    })
  },
  onDepartmentSelectorSelect: function(event){
    let department = event.detail
    if (this.data.formData.departmentId !== department.id){
      this.setData({departmentName: department.name, departmentSelectorShow: false, "formData.departmentId": department.id})
      this.clearDepartmentLower()
    }else {
      this.setData({departmentSelectorShow: false})
    }
  },

  // 专业选择
  onSelectMajorShow: function(){
    if (this.data.isComplete == 1){
      return;
    }
    _service.getMajorList(this)
  },
  onMajorSelectorClose: function(){
    this.setData({majorSelectorShow: false})
  },

  // 清除下级选择
  clearMajorLower: function(){
    this.setData({
      className: "", classList: [], "formData.classId": 0,
    })
  },
  onMajorSelectorSelect: function(event){
    let major = event.detail
    if (this.data.formData.majorId !== major.id){
      this.setData({majorName: major.name, majorSelectorShow: false, "formData.majorId": major.id})
      this.clearMajorLower()
    }else {
      this.setData({majorSelectorShow: false})
    }
  },

  // 班级选择
  onSelectClassShow: function(){
    if (this.data.isComplete == 1){
      return;
    }
    _service.getClassList(this)
  },
  onClassSelectorClose: function(){
    this.setData({classSelectorShow: false})
  },
  onClassSelectorSelect: function(event){
    let _class = event.detail
    this.setData({className: _class.name, classSelectorShow: false, "formData.classId": _class.id})
  },

  // 选择身份
  onSelectIdentityShow: function(){
    if (this.data.isComplete == 1){
      return;
    }
    this.setData({
      identitySelectorShow: true
    })
  },
  onIdentitySelectorClose: function(){
    this.setData({identitySelectorShow: false})
  },
  onIdentitySelectorSelect: function(event){
    let identity = event.detail
    this.setData({identityValue: identity.name, identitySelectorShow: false, "formData.identity": identity.id})
  },

  // 完善用户信息
  submit: function(){
    let openid = wx.getStorageSync('openid');
    this.setData({
      "formData.openid": openid,
      submitModalShow: true,
    })
  },
  submitModalHandelOk: function(){
    this.setData({
      submitModalShow: false,
    })
    _service.completeUserInfo(this.data.formData, this)
  },
  submitModalHandelNo: function() {
    this.setData({
      submitModalShow: false,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _service.getSchoolList(this)
    _service.getCompleteUserInfo(this)

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