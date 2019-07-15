/**
 * Created by huai on 2019-06-25
 */
'use strict';

export default{
    'baseHost':  'https://ms.51lianc.com/',
    'register': '/port/index/addMember', // 注册
    'login': '/port/index/login', // 登录
    'passwordModify': '/port/member/changePwd', // 修改密码
    'uploadImg': '/port/member/Upload',  // 新版上传图接口
    'upload': '/admin/api/upload', // 上传图片
    'uploadRegister':'/port/index/upload',
    'imgUpload': '/port/member/imgUpload', // 修改商户上传图片用
    'getDefaultAddress': '/port/seller/getDefaultAddress', //获取默认地址和联系方式
    'checkInfo': '/port/seller/checkInfo',  // 兑奖
    'changePwd': '/port/member/changePwd', //修改密码
    'getAwardInfo': '/port/seller/getAwardInfo', //获取具体获奖信息
    'awardList': '/port/seller/awardList', //中奖人列表
    'mess': '/port/member/mess', //留言提交
    'delAddr': '/port/member/delAddr', //删除商家地址（暂无使用）
    'getChangeAddr': '/port/member/getChangeAddr', //获取要修改的商家地址（暂无使用）
    'addressAdd': '/port/member/addressAdd', //商家信息修改
    'delActive': '/port/seller/delActive', //删除活动信息
    'getEditActive': '/port/seller/getEditActive', //获取活动信息
    'changeMemberInfo': '/port/member/changeMemberInfo',  /// 商家信息获取与修改
    'activeEdit': '/port/seller/activeEdit',  //首页活动编辑或添加
    'delMenu': '/port/seller/delMenu',  //删除菜单
    'getMenuInfo': '/port/seller/getMenuInfo', //获取菜单信息
    'menuEdit': '/port/seller/menuEdit',  //菜单信息编辑与添加
    'ajaxStatus': '/port/seller/ajaxStatus', //推送状态更新
    'getLists': '/port/seller/getLists', //获取商家列表
    'getSlide': '/port/seller/getSlide', //首页轮播图
    'changeLogo': '/port/member/changeLogo', // 修改头像
    'memberUpload': '/port/member/upload', // 用户头像上传
    'userAvatar': '/port/index/upload', // 用户头像上传
    'getMemberInfo': '/port/member/getMemberInfo', /// 获取用户信息
}