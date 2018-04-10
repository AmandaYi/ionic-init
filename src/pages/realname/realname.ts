import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { NativeServiveProvider } from '../../providers/native-servive/native-servive';

/**
 * Generated class for the RealnamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'RealnamePage'
})
@Component({
  selector: 'page-realname',
  templateUrl: 'realname.html',
})
export class RealnamePage {
  public real_name:any;           //真实姓名
  public card:any;                //身份证
  public yzm:any;                 //验证码
  public bank_cad:any;            //银行卡号
  public bank_phone:any;          //银行手机号码
  public verBase64:any;           //图片验证码
  public submit_phone:boolean;    //确定禁止按钮

  public tianxie:boolean;         //判断是否已经填写
  public bid_name:any;            //已开通的真实姓名
  public bid_cad:any;            //已开通的真实姓名

  public ZC:boolean;              //判断是否从注册成功后那边过来的，从而判断返回键是返回到上一页还是根目录

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api:ApiServiceProvider,
    public alertCtrl:AlertController,
    public nav:NativeServiveProvider
    ) {
  }

    //进入页面
  ionViewWillEnter(){
    this.int();
    this.refreshCode();
  }

  //将要离开页面
  ionViewWillLeave(){
     this.api.user().map(data => data.json()).subscribe(data => {
      console.log(data);
      if (data.code == '000000') {
        let information ={
          'accountName':JSON.parse(localStorage.getItem('personal')).accountName,                   //保存没加密的手机号
          'phone':JSON.parse(localStorage.getItem('personal')).phone,                               //保存加密的手机号
          'password':JSON.parse(localStorage.getItem('personal')).password,                         //保存密码
          'realName':data.data.realName,                                                            //保存用户名字
          'riskId':JSON.parse(localStorage.getItem('personal')).riskId,                             //保存风险评估ID
          'ticketCount':JSON.parse(localStorage.getItem('personal')).ticketCount,                   //保存ID
          'accountId':JSON.parse(localStorage.getItem('personal')).accountId                         //保存账户Id
         };
         localStorage.setItem('personal',JSON.stringify(information));
      } else {
        console.log('没有个人信息')
      }

    })
  }

  //默认进入页面的
  int(){
    console.log(this.navParams.get('type'));
    console.log(this.navParams.get('name'));
    console.log(this.navParams.get('cad'));
    
    
    if(this.navParams.get('type')=='已开通'){
       this.tianxie=true;
       this.bid_name=this.navParams.get('name');
       this.bid_cad=this.navParams.get('cad');
     }else{
       this.tianxie=false;
       this.real_name='';
       this.card='';
       this.bank_cad='';
       this.bank_phone='';
       this.yzm='';
       this.verBase64='';
       this.submit_phone=false;
     }
  }

  //返回上一页
  return(){
    this.navCtrl.pop();
  }

   //刷新图片验证码
  refreshCode(){
    this.api.smrzVerify().map(data => data.json()).subscribe(data => {
        console.log(data);
        this.verBase64 = "data:image/jpg;base64," + data.data;
        this.yzm='';
    });
  }

  //确定
  submitPassword(real_name,card,yzm,bank_cad,bank_phone){
    if(!real_name || !card || !yzm){
         this.showAlert('消息提醒','请填写完整');
    }else if(!/^([\u4e00-\u9fa5]{2,6})$/.test(real_name)){
        this.showAlert('消息提醒','姓名格式不对');        
    }
    // else if(!/([\d]{4})([\d]{4})([\d]{4})([\d]{4})([\d]{0,})?/.test(bank_cad)) {
    //     this.showAlert('消息提醒',"银行卡号格式不对");
    // }
    // else if(!(/^(13|14|15|17|18)[0-9]{9}$/).test(bank_phone)){
    //     this.showAlert('消息提醒','您的银行手机号码格式错误!')
    // }
    else{
        this.submit_phone=true;
        this.api.setUserInfo(real_name,card,yzm,bank_cad,bank_phone).map(data => data.json()).subscribe(data => {
             console.log(data);
             console.log(real_name,card,yzm,bank_cad,bank_phone);
             if (data.code == '000000') {
               this.submit_phone=false;
               this.nav.fork(data.data.url).on('closeevent').subscribe(data => {
                  // this.zhifu_data();      //重新查询数据
                  this.navCtrl.pop();
                });
                // if(this.navParams.get('ZC_type')=='注册'){
                //     this.showAlert('开通银行存管成功','恭喜您获得130元现金券');
                //     this.navCtrl.pop();
                // }else{
                //     this.navCtrl.pop();
                // }
              } else {
                  this.showAlert('消息提醒',data.description);
                  this.refreshCode();
                  this.submit_phone=false;
              }
        })
    }
  }

   //弹窗接口
  showAlert(title,subTitle){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['确定']
    });
    alert.present();
  }



}
