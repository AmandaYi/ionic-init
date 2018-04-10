import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpServiceProvider } from '../http-service/http-service';
import { SERVER_URL } from '../constants/constants';
/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {

  constructor(
    private http: HttpServiceProvider,
  ) {
  }

  aa() {
    return this.http.postFormData('app/bid/publics/bidExperList.htm')
  }
  /*----------------------------------------公共----------------------------------------*/

  /**
* @name 检查版本更新
*/
  timing() {
    return this.http.postFormData('app/timing.htm')
  }

  /**
 * @name 用户id存在，先查询当前用户的账户信息
 */
  account() {
    return this.http.postFormData('app/user/account.htm')
  }

  /**  
   * @name  是否已通过提示书 
   *   safeType=0未通过， =1 已通过
   *   userId 用户ID
  */
  safeType_Judge(userId,safeType: number = 1){
    let param = {
      userId: userId,
      safeType: safeType,
    }
    return  this.http.postFormData('/saveSafeTips.htm',param)
  }

   /**
 * @name 判断登录状态，唤醒手机
 */
  account_data() {
    return this.http.postFormData('app/user/account.htm?appIsLogin=app')
  }

   /**
 * @name 会员中心
 */
  associato() {
   return this.http.postFormData('app/user/associatorInformation.htm')
  }
   /**
 * @name 会员等级
 */
  member(){
     return this.http.postFormData('app/user/memberLvInfo.htm')
  }

  /**
   *  @name  从服务端获取当前用户银行卡列表
   *
   *
   */
  myBankList() {
    return this.http.postFormData('app/user/myBankList.htm')
  }

  /**
   * @name 从服务端获取用户信息
   */
  user() {
    return this.http.postFormData('app/user/user.htm')
  }


  /*----------------------------------------首页----------------------------------------*/
  /**
   * @name 首页广告（可能没用，里面没有数据）
   */
  appAdvServlet() {
    return this.http.postFormData('app/appAdvServlet.htm')
  }


  /**
  *   @name 获取热门活动
  */
  advServlet() {
    return this.http.postFormData('app/advServlet.htm')
  }

  /**
   * @name 首页所显示的标{首页仅显示其普通标和债券转让}
   */
  bidExperIndex() {
    return this.http.postFormData('app/bid/publics/bidExperIndex.htm')
  }

  /**
   * @name 全部普通标和债券转让和体验标{首页只读取其体验标[0]}
   */
  bidExperList() {
    return this.http.postFormData('app/bid/publics/bidExperList.htm')
  }


  /*----------------------------------------首页进入的投标详情  InvestmentCtrl----------------------------------------*/
    /**
   * @name 新项目详情
   * @param bidId:标id ;
   *
   */
   newbid(bidId){
    let param = {
      bidId: bidId,
    }
    return this.http.postFormData('app/bid/publics/bidMessage.htm',param)
  }
  
  /**
   * @name 体验标历史记录
   * @param bidId:标id ;
   * @param current:默认显示第一页；
   *
   */
  bidAsynTbjlTYB(bidId, current: number = 1) {
    let param = {
      bidId: bidId,
      current: current,
    }
    return this.http.postFormData('app/bid/publics/bidAsynTbjlTYB.htm', param)

  }

  /**
   * @name 标的历史记录
   * @param bidId:标id ;
   * @param current:默认显示第一页
   */
  bidAsynTbjl(bidId, current: number = 1) {
    let param = {
      bidId: bidId,
      current: current,
    }
    return this.http.postFormData('app/bid/publics/bidAsynTbjl.htm', param)

  }

  /**
   * @name 项目详情里--债权转让
   * @param bidId
   * @param creditorId
   * @param type
   */
  creditor(bidId, creditorId, type) {
    let param = {
      bidId: bidId,
      creditorId: creditorId,
      type: type,
    }
    return this.http.postFormData('app/creditor/publics/creditor.htm', param)

  }
 
  /**
   *  @name 项目详情-企业信息
   *  @param bidId
   */
  bidItem(bidId) {
    let param = {
      bidId: bidId,
    }
    return this.http.postFormData('app/bid/publics/bidItem.htm', param)

  }

  /**
   *  @name 标的详情
   *  @param bidId
   */
  bid(bidId) {
    let param = {
      bidId: bidId,
    }

    return this.http.postFormData('app/bid/publics/bid.htm', param)

  }

  /**
   *  @name 体验金
   */
  myExper() {
    return this.http.postFormData('app/user/myExper.htm')
  }

  /**
   *  @name 体验标购买
   *  @param bidId  体验金ID
   * @param loanId  标ID
   */
  buyBidExper(id, expId ) {
    let param = {
      loanId: id,
      expId: expId,
      type: "app"
    };
    return this.http.postFormData('app/bid/buyBidExper.htm', param)

  }



  /**
   * @name 购买债券
   */
  buyCreditor(creditorId, loanId, orderNo, orderId, checkCode) {
    let param = {
      creditorId: creditorId,
      loanId: loanId,
      orderNo: orderNo,
      orderId: orderId,
      checkCode: checkCode
    };
    return this.http.postFormData('app/creditor/buyCreditor.htm', param)

  }

  /**
   *  @name 确认购买
   */
  buyBid( amount, bidId, ticketNos) {
    let param = {
      // orderNo: orderNo,
      // checkCode: checkCode,
      amount: amount,
      bidId: bidId,
      ticketNos: ticketNos
    }
    return this.http.postFormData('app/bid/buyBid.htm', param)
  }

  /**
   *  @name 购买普通标短信
   */

  bidSMSAgain(orderNo, bidId, amount) {
    let param = {
      orderNo: orderNo,
      bidId: bidId,
      amount: amount
    }
    return this.http.postFormData('app/bid/bidSMSAgain.htm', param)
  }

  /**
   *  @name 购买债权标短信
   */
  buyCreditorSMSAgain(orderNo, creditorId) {
    let param = {
      orderNo: orderNo,
      creditorId: creditorId
    }
    return this.http.postFormData('app/creditor/buyCreditorSMSAgain.htm', param)
  }

  /*----------------------------------------注册 RegisterCtrl----------------------------------------*/
  /**
   * @name 获取图片验证码的方法定义
   */
  appRegisterVerify(type) {
    let param = {
      type: type,
    }
    return this.http.postFormData('app/appRegisterVerify.htm', param)
  }

  /**
   * @name 注册
   */
  newbitMobileCode(phone, type, txCode) {
    let param = {
      phone: phone,
      type: type,
      app: 'app',
      txCode: txCode
    }
    return this.http.postFormData('app/newbitMobileCode.htm', param)
  }

   /**
   * @name 注册确定接口
   */
  new_register(phoneCode, phone,password,verifyCode,code) {
    let param = {
      phoneCode: phoneCode,
      phone: phone,
      password: password,
      typeApp: 'app',
      verifyCode: verifyCode,
      code: code
    }
    return this.http.postFormData('app/register.htm', param)
  }


  /*----------------------------------------标的列表 InvestCtrl----------------------------------------*/
  /**
   * @name 普通标列表
   */
  bidList(pageIndex: number , pageSize: number ) {
    let param = {
      pageIndex: pageIndex,
      pageSize: pageSize
    }
    return this.http.postFormData('app/bid/publics/bidList.htm', param)
  }

  /**
   * @name 债券列表
   */
  creditorList(pageIndex: number, pageSize: number ) {
    let param = {
      pageIndex: pageIndex,
      pageSize: pageSize
    }
    return this.http.postFormData('app/creditor/publics/creditorList.htm', param)
  }


  /*----------------------------------------标的详情 InvestDetailCtrl----------------------------------------*/
  /**
   * @name 购买债券短信验证码
   * @param creditorId:债权标的Id
   * @param loanId:标的ID
   * @param orderNo:订单号
   */
  buyCreditorSMS(creditorId, loanId, orderNo) {
    let param = {
      creditorId: creditorId,
      loanId: loanId,
      orderNo: orderNo,
      type: "app"
    }
    
    // return this.http.postFormData('app/creditor/buyCreditorSMS.htm', param)
    return this.http.postFormData('app/creditor/buyCreditorForm.htm', param)
  }

  /**
 * @name 普通标短信验证码
 * @param bidId:标的Id
 * @param amount:投标金额
 * @param ticketNos:优惠卷
 */
  buyBidSMS(bidId, amount, ticketNos) {
    let param = {
      bidId: bidId,
      amount: amount,
      ticketNos: ticketNos,
      type: "app"
    }
    return this.http.postFormData('app/bid/buyBidSMS.htm', param)
  }

  /*----------------------------------------优惠券 WelfareCtrl----------------------------------------*/
  /**
   * @name 选择优惠券列表
   *
   */
  myTickets(state = 0) {
    let param = {
      state: state,
      newAPP: true
    };
    return this.http.postFormData('app/user/myTickets.htm', param)
  }

  /*----------------------------------------登录 LoginCtrl----------------------------------------*/
  /**
   * @name 获取图片验证码的方法定义
   */
  loginVerify() {
    let param = {
      type: 'app'
    };
    return this.http.postFormData('app/loginVerify.htm', param)
  }


  /**
   * @name 判断是否需要填写评级表
   */
  appPjb(userId) {
    let param = {
      userId: userId,
      App: 'app'
    };
    return this.http.postFormData('app/pjb/appPjb.htm', param)
  }

  /**
   * @name 登录
   */
  login_DATA(accountName, password, verCode) {
    let param = {
      accountName: accountName,
      password: password,
      verCode: verCode
    };
    return this.http.postFormData('app/login.htm', param)
  }


  login(accountName, password) {
    let param = {
      accountName: accountName,
      password: password,
    };
    return this.http.postFormData('app/gestureLogin.htm', param)
  }


  /*----------------------------------------个人中心 MeCtrl----------------------------------------*/
  /**
   * @name 下次回款
   */
  backMoneyCalendarNext() {

    return this.http.postFormData('app/user/backMoneyCalendarNext.htm')
  }

  /**
   * @name 获取站内消息数据
   */
  letterList() {
    let param = {
      status: 'WD',
    };
    return this.http.postFormData('app/user/letterList.htm', param)
  }

  /**
   * @name 定时器显示充值未到账金额
   */
  checkChargeMoney() {
    return this.http.postFormData('app/user/checkChargeMoney.htm')
  }

  /*----------------------------------------找回密码 PassWordCtrl----------------------------------------*/
  /**
   * @name 忘记密码获取图片验证码的方法
   */
  forgetPassVerify() {
    let param = {
      type: 'app',
    };
    return this.http.postFormData('app/forgetPassVerify.htm', param)
  }

  /**
   * @name 忘记密码获取短信验证码方法
   */
  forgetSmsNewApp(phone, txCode) {
    let param = {
      phone: phone,
      txCode: txCode,
      app: 'app'
    };
    return this.http.postFormData('app/forgetSmsNewApp.htm', param)
  }

  /**
   * @name 提交忘记密码
   */
  forgetPassNewApp(verifyCode, phone, code) {
    let param = {
      verifyCode: verifyCode,
      phone: phone,
      code: code
    };
    return this.http.postFormData('app/forgetPassNewApp.htm', param)
  }

    /**
   * @name 修改密码
   */
  changePass(pwd,onePwd,twoPwd){
    let param={
      pwd:pwd,
      onePwd:onePwd,
      twoPwd:twoPwd,
    }
     return this.http.postFormData('app/user/updatePwd.htm', param)
  }


  /*----------------------------------------找回密码 PassWordTwoCtrl----------------------------------------*/
  /**
   * @name 设置忘记密码
   */
  resetLoginPwdNewApp(password, rePassword, phone,code,type) {
    let param = {
      password: password,
      rePassword: rePassword,
      phone: phone,
      code:code,
      type: type
    };

    return this.http.postFormData('app/resetLoginPwdNewApp.htm', param)
  }

  /*----------------------------------------新闻中心 DiscoveryCtrl----------------------------------------*/
  /**
   * @name 获取公告信息,公司动态和媒体动态
   */
  indexServiceInfo() {

    return this.http.postFormData('app/indexServiceInfo.htm')
  }


  /*----------------------------------------充值 RechargeCtrl----------------------------------------*/

  /**
   * @name 充值最大值和最小值
   */
  fee() {

    return this.http.postFormData('app/user/fee.htm')
  }

  /**
   * @name 充值
   * @param amount
   */
  charge(amount) {
    let param = {
      amount: amount,
      type: 'app'
    };
    return this.http.postFormData('app/pay/charge.htm', param)
  }


  /*----------------------------------------消息中心 MessageCtrl----------------------------------------*/
  /**
   * @name 点击已读
   */
  readLetter(id) {
    let param = {id};
    return this.http.postFormData('app/user/readLetter.htm', param)
  }

  /*----------------------------------------消息中心 MessageCtrl----------------------------------------*/
  /**
   * @name 消息中心列表
   */
  messagesList(status,num) {
    let param = {
      status:status,
      pageIndex:1,
      pageSize: num
    };
    return this.http.postFormData('app/user/letterList.htm', param)
  }
  /*----------------------------------------提现 WithdrawalsCtrl----------------------------------------*/

  /**
   * @name 提现
   * @param cardId
   * @param amount
   */
  withdraw(cardId, amount) {
    let param = {
      cardId: cardId,
      amount: amount
    };
    return this.http.postFormData('app/rongbao/withdraw.htm', param)
  }

  with_zhifu(){
    return this.http.postFormData('app/user/cipherState.htm')
  }

  /*----------------------------------------交易记录 RecordCtrl----------------------------------------*/

  tranRecordList(appType = 0, pageIndex = 1, pageSize = 15, tranType) {
    let param = {
      appType: appType,
      pageIndex: pageIndex,
      pageSize: pageSize,
      tranType: tranType
    };
    return this.http.postFormData('app/user/tranRecordList.htm', param)
  }

  /*----------------------------------------选择银行卡 BankCardCtrl----------------------------------------*/
  /**
   * @name 删除银行卡
   */
  deleteBankCard() {
    return this.http.postFormData('app/pay/deleteBankCard.htm')
  }

  /*----------------------------------------开通银行存管 RealNameCtrl----------------------------------------*/
  /**
   * @name 银行存管
   */
  smrzVerify() {
    return this.http.postFormData('app/smrzVerify.htm')
  }

  /**
   * @name 银行存管提交开通
   * @param name
   * @param idCard
   * @param smrzCode
   */
  setUserInfo(name, idCard, smrzCode,bank_cad,bank_phone) {
    let param = {
      name: name,
      idCard: idCard,
      smrzCode: smrzCode,
      // bankAccountNo:bank_cad,
      // bankMobile:bank_phone,
      newAPP: 'true'
    };
    return this.http.postFormData('app/user/setUserInfo.htm', param)
  }

  /*---------------------------------------- 更多 MoreCtrl----------------------------------------*/
  /**
   * @name 退出登录
   */
  logout() {
    return this.http.postFormData('app/logout.htm')
  }

  /*---------------------------------------- 开通资金账户 CapitalCtrl----------------------------------------*/
  /**
   * @name 实名认证
   */
  payUserRegister() {
    let param = {
      type: 'app'
    };
    return this.http.postFormData('app/pay/payUserRegister.htm', param)
  }

  /*---------------------------------------- 绑定邮箱地址 BindmailboxCtrl----------------------------------------*/
  /**
   * @name 获取邮箱地址
   * @param email
   */
  getEmailCode(email) {
    let param = {
      email: email,
      type: 'RZ'
    };
    return this.http.postFormData('app/getEmailCode.htm', param)
  }

  /**
   * @name 绑定邮箱地址
   * @param email
   * @param emailCode
   */
  setUserEmail(email, emailCode) {

    let param = {
      email: email,
      emailCode: emailCode,
      type: 'RZ'
    };
    return this.http.postFormData('app/user/setUserEmail.htm', param)

  }



  /*---------------------------------------- 添加银行卡 AddbankCtrl----------------------------------------*/

  /**
   * @name 获取添加银行卡验证码
   */
  yhkbandVerify() {
    return this.http.postFormData('app/yhkbandVerify.htm')
  }

  /**
   * @name 获取银行列表
   */
  bankList() {

    return this.http.postFormData('app/user/bankList.htm')

  }

  /**
 * @name 获取开户行
 * @param name
 */
  searchAddress(name) {

    let param = {
      name: name,
      type: 'app'
    };
    return this.http.postFormData('app/pay/searchAddress.htm', param)

  }

  /**
   * @name 绑卡发短信
   * @param banknumber 银行卡号
   * @param bankname 银行ID
   * @param xian 开户城市
   * @param subbranch 分行
   * @param subbranch1 支行
   * @param yhkCode 图片验证码
   * @param phone 手机预留号码
   */
  // bindBankCard(banknumber, bankname, xian, subbranch, subbranch1, yhkCode, phone) {
  bindBankCard() {

    let param = {
      // banknumber: banknumber, //银行卡号
      // bankname: bankname, //银行ID
      // xian: xian, //开户城市
      // subbranch: subbranch, //分行
      // subbranch1: subbranch1, //支行
      // yhkCode: yhkCode, //图片验证码
      // phone: phone, //手机预留号码
      // newAPP: 'true'
    }
    return this.http.postFormData('app/pay/bindBankCardForm.htm', param)

  }


  /**
   * @name 绑卡确认
   * @param bdbanknumber
   * @param bdbankname
   * @param bdxian
   * @param bdsubbranch
   * @param bdsubbranch1
   * @param orderNo
   * @param sjyzm
   */
  confirmBankCard(bdbanknumber, bdbankname, bdxian, bdsubbranch, bdsubbranch1, orderNo, sjyzm) {

    let param = {
      bdbanknumber: bdbanknumber, //银行卡号
      bdbankname: bdbankname, //银行ID
      bdxian: bdxian, //开户城市
      bdsubbranch: bdsubbranch, //分行
      bdsubbranch1: bdsubbranch1, //支行
      orderNo: orderNo, //订单号
      sjyzm: sjyzm //手机验证码
    }
    return this.http.postFormData('app/pay/confirmBankCard.htm', param)

  }




  /**
* @name 绑定银行卡重新发短信
* @param orderNo //订单号
*/
  smsBankCard(orderNo) {

    let param = {
      orderNo: orderNo
    };
    return this.http.postFormData('app/pay/smsBankCard.htm', param)

  }



  /*---------------------------------------- 开户城市 CityCtrl----------------------------------------*/


  /**
* @name 城市列表
*/
  hotAddress() {

    let param = {
      type: '1'
    };
    return this.http.postFormData('app/pay/hotAddress.htm', param)

  }




  /*---------------------------------------- 我的投资 MyInvesCtrl----------------------------------------*/

  /**
* @name 我的投资列表
*/
  myCreditorList(creType, pageIndex = 1, pageSize = 10) {
    let param = {
      creType: creType,
      pageIndex: pageIndex,
      pageSize: pageSize,
      APP: 10,
    };
    return this.http.postFormData('app/user/myCreditorList.htm', param)

  }


  /*---------------------------------------- 我的投资详情 myInvesDetailCtrl----------------------------------------*/

  /**
* @name 我的投资详细内容
*/
  bidAndRepayList(bidId, zqid) {
    let param = {
      bidId: bidId,
      zqid: zqid,
    };
    return this.http.postFormData('app/bid/publics/bidAndRepayList.htm', param)

  }


  /*---------------------------------------- 邀请好友 InvitationCtrl----------------------------------------*/

  /**
 * @name 我的佣金
 */
  awardCommission(pageIndex, pageSize) {
    let param = {
      pageIndex: pageIndex,
      pageSize: pageSize
    };
    return this.http.postFormData('app/user/awardCommission.htm', param)

  }

  /**
 * @name 我的福利券
 */
  awardWelfare(pageIndex, pageSize) {
    let param = {
      pageIndex: pageIndex,
      pageSize: pageSize
    };
    return this.http.postFormData('app/user/awardWelfare.htm', param)

  }

  /**
 * @name 邀请好友
 */
  inviteFriends() {

    return this.http.postFormData('app/user/inviteFriends.htm')

  }

  /*---------------------------------------- 好友统计 hytjCtrl----------------------------------------*/

  /**
 * @name 好友统计
 */
  countFriends(pageIndex, pageSize) {
    let param = {
      pageIndex: pageIndex,
      pageSize: pageSize
    };
    return this.http.postFormData('app/user/countFriends.htm', param)

  }

  /*---------------------------------------- 我的优惠券 myWelfareCtrl----------------------------------------*/
  /**
  * @name 我的优惠券列表
  */
  cashcouponList(state, pageIndex, pageSize) {
    let param = {
      state: state,
      pageIndex: pageIndex,
      pageSize: pageSize,
      newAPP: 'app'
    };
    return this.http.postFormData('app/user/cashcouponList.htm', param)

  }


  /*---------------------------------------- 手势登录 GestureGetCtrl----------------------------------------*/
  /**
  * @name 手势登录
  */
  gestureLogin(accountName, password) {
    let param = {
      accountName: accountName,
      password: password,
    };
    return this.http.postFormData('app/gestureLogin.htm', param)

  }


  /*---------------------------------------- 回款计划 schemesCtrl----------------------------------------*/
  /**
  * @name 回款计划数据
  */
  backMoneyCalendar(timeStart, timeEnd) {
    let param = {
      timeStart: timeStart,
      timeEnd: timeEnd
    };
    return this.http.postFormData('app/user/backMoneyCalendar.htm', param)

  }

  /*---------------------------------------- 自动投标 AutoinvestCtrl----------------------------------------*/
  /**
  * @name 自动投标数据查询
  */
  zdtbSelect() {

    return this.http.postFormData('app/user/zdtbSelect.htm')

  }

  /**
  * @name 自动投标开启
  */
  zztb(fjq, saveMoney, rateStart, timeEnder2, timeEnder, jkqxStart, jkqxEnd) {
    let param = {
      fjq: fjq, //获取使用现金券或者加息券；
      saveMoney: saveMoney, //账户保留金额；
      rateStart: rateStart, //最低利率；
      timeEnder2: timeEnder2, //等于2就自定义
      timeEnder: timeEnder, //自定义时间）
      jkqxStart: jkqxStart, //开始投资期限；
      jkqxEnd: jkqxEnd, //结束投资期限；
    };
    return this.http.postFormData('app/user/zztb.htm', param)

  }

  /**
  * @name 自动投标关闭
  */
  zztbClose() {

    return this.http.postFormData('app/user/zztbClose.htm')

  }

  /*---------------------------------------- 个人信息 mycenterCtrl----------------------------------------*/

  /**
* @name 个人信息
*/
  selectUserBaseAPP() {
    return this.http.postFormData('app/user/selectUserBaseAPP.htm')
  }


  /**
* @name 保存，把个人信息数据存入数据库内，再查询渲染出来
*/
  updateUserBaseAPP(csrq, zgxl, hyzt, jzdz, qq, wxh, gsgm, zy, ysr, ywfc, ywcc, xm, lxdh, tswd) {
    let param = {
      csrq: csrq, //没生日
      zgxl: zgxl, //没学历
      hyzt: hyzt, //没结婚
      jzdz: jzdz, //没地址
      qq: qq, //没QQ
      wxh: wxh, //没微信
      gsgm: gsgm, //没公司
      zy: zy, //没职业
      ysr: ysr, //没收入
      ywfc: ywfc, //没房
      ywcc: ywcc, //没车
      xm: xm, //没有紧急联系人
      lxdh: lxdh, //没有电话
      tswd: tswd //没有联系关系
    };
    return this.http.postFormData('app/user/updateUserBaseAPP.htm', param)
  }

  /*---------------------------------------- 资产统计 propertyCtrl----------------------------------------*/
  /**
* @name 资产统计
*/
  propertyAll() {
    return this.http.postFormData('app/user/propertyAll.htm')
  }

  /*---------------------------------------- 公告列表 announcementCtrl----------------------------------------*/
  /**
* @name 公告列表
*/
  findNoticeAll(pageIndex = 1) {
    let param = {
      pageIndex: pageIndex
    }
    return this.http.postFormData('app/findNoticeAll.htm', param)
  }

  /*---------------------------------------- 公告列表详情页 announcement_detailsCtrl----------------------------------------*/
  /**
* @name 公告列表详情页内容跳转
*/
  findNoticeAll_byId(id) {
    let param = {
      id: id
    }
    return this.http.postFormData('app/findNoticeAll_byId.htm', param)
  }

  /*---------------------------------------- 媒体报道/公司动态列表 discoveryList1Ctrl----------------------------------------*/
  /**
* @name 媒体报道/公司动态列表
*/
  indexServiceInfoList(type, pageIndex = 1, pageSize = 10) {
    let param = {
      type: type,
      pageIndex: pageIndex,
      pageSize: pageSize
    }
    return this.http.postFormData('app/indexServiceInfoList.htm', param)
  }

  /*---------------------------------------- 媒体报道/公司动态详情 company_detailsCtrl----------------------------------------*/
  /**
* @name 媒体报道/公司动态详情内容跳转  【获取类型 GSDT=动态详情，MTBD=报道详情】

*/
  indexServiceInfoOne(type, id) {
    let param = {
      type: type, //获取类型--公司动态或者媒体报道
      id: id //获取相应的id
    }
    return this.http.postFormData('app/indexServiceInfoOne.htm', param)
  }


  /*---------------------------------------- 运营报告 operatingCtrl----------------------------------------*/
  /**
* @name 运营报告
*/
  indexReport() {

    return this.http.postFormData('app/indexReport.htm')
  }


  /*---------------------------------------- 帮助中心 HelpCenterCtrl----------------------------------------*/
  /**
* @name 帮助中心
*/
  helpHotQA() {

    return this.http.postFormData('app/help/helpHotQA.htm')
  }



  /*---------------------------------------- 帮助中心详情页面 HelpCenter_detailsCtrl----------------------------------------*/
  /**
* @name 帮助中心
* @param
*      if (type_value == "TZYHK") {
*        this.types = '投资安全';
*      } else if (type_value == "CZYTX") {
*        this.types = '充值提现';
*      } else if (type_value == "ZCYDL") {
*        this.types = '注册登录';
*      } else if (type_value == "JHYHH") {
*        this.types = '借款回款';
*      } else if (type_value == "LXHFY") {
*        this.types = '利息费用';
*      } else if (type_value == "ZQZR") {
*        this.types = '债权转让';
*      } else if (type_value == "HDDY") {
*        this.types = '投资攻略';
*      } else if (type_value == "MCJS") {
*        this.types = '名词解释';
*      };
*/

  helpAllQA(type, pageSize = 20, pageIndex = 1) {
    let param = {
      type: type,
      pageSize: pageSize,
      pageIndex: pageIndex
    }
    return this.http.postFormData('app/help/helpAllQA.htm', param)
  }


  /*---------------------------------------- 充值中心  pay_moneyCtrl----------------------------------------*/
  /**
* @name 启动充值按钮
*/
  kJCharge(amount) {
    let param = {
      reChargeType: '5',
      amount: amount
    }
    return this.http.postFormData('app/rongbao/kJCharge.htm', param)
  }


  /**
* @name 没有卡密的令牌--重发短信好判断
*/
  kmjqSelect(orderNo) {
    let param = {
      orderNo: orderNo
    }
    return this.http.postFormData('app/rongbao/kmjqSelect.htm', param)
  }


  /**
* @name 确认请求
*/
  kJChargeQR(orderNo, yhkPhoneCode) {
    let param = {
      orderNo: orderNo,
      yhkPhoneCode: yhkPhoneCode
    }
    return this.http.postFormData('app/rongbao/kJChargeQR.htm', param)
  }

  /**
* @name 重新获取
*/
  kJChargeCFDX(orderNo) {
    let param = {
      orderNo: orderNo,
    }
    return this.http.postFormData('app/rongbao/kJChargeCFDX.htm', param)
  }



}
