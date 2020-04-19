// pages/user_info_complete/user_info_complete.js
import util from "../../utils/util"
import _service from "../../service/user_info_complete_service"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalVisible: false,
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

    formData: {
      schoolId: 0,
      departmentId: 0,
      majorId: 0,
      classId: 0
    },


  },

  // 响应错误
  modalHandelOk: function () {
    util.modalHandelOk(this)
  },
  modalHandelNo: function(){
    util.modalHandelNo(this)
  },

  // 选择学校
  onSelectSchoolShow: function(){
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
    _service.getClassList(this)
  },
  onClassSelectorClose: function(){
    this.setData({classSelectorShow: false})
  },
  onClassSelectorSelect: function(event){
    let _class = event.detail
    this.setData({className: _class.name, classSelectorShow: false, "formData.classId": _class.id})
  },

  submit(){
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _service.getSchoolList(this)

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