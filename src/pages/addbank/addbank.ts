import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

/**
 * Generated class for the AddbankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'AddbankPage'
})
@Component({
  selector: 'page-addbank',
  templateUrl: 'addbank.html',
})
export class AddbankPage {
  public cardNumber:any;                 //卡号
  public selectedBankId:any;             //银行
  public cityName:any;                   //开户城市
  public cityId:any;                     //开户城市
  public subbranch:any;                  //开户分行
  public subbranch1:any;                 //开户支行
  public phone_code:any;                 //预留手机号
  public verifyCode:any;                 //图片验证码
  public phone_code1:any;                //手机验证码
  public verBase64:any;                  //图片
  public sms_data:boolean;               //是否禁用客户点击获取短信后的所有操作

  public person:any;                     //持卡人
  public bankList:any;                   //银行列表

  public code_title:any;                 //验证码的title
  public add_z:number;                   //短信的第一次发生，还是第二次发生
  public huoqu_btn:boolean;              //获取验证码按钮禁止
  public tijiao_btn:boolean;             //提交按钮禁止

  public bank_number:any;                //点击短信后，获取的银行名
  public add_description:any;            //短信获取的订单号
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public api:ApiServiceProvider,
     public modalCtrl: ModalController,
     public alertCtrl:AlertController
     ) {
  }
  
  //返回上一页
  return(){
    this.navCtrl.pop();
    localStorage.removeItem('city');
    localStorage.removeItem('data_cy');
  }

  //进入页面
  ionViewWillEnter(){
    this.init();
    this.refreshCode();
    this.bank_data();
    this.person_data();
  }

  //初始化
  init(){
    this.person='';
    this.cardNumber='';
    this.cityName='';
    this.cityId='';
    this.subbranch='';
    this.subbranch1='';
    this.verifyCode='';
    this.phone_code1='';
    this.sms_data=false;

    this.add_z=1;
    this.code_title='获取验证码'
    this.huoqu_btn=false;
    this.tijiao_btn=true;
    this.add_description='';

  }

  //持卡人接口查询
  person_data(){
    this.api.user().map(data => data.json()).subscribe(data => {
      this.person=data.data.realName;
   })
  }

  //获取银行列表
  bank_data(){
    this.api.bankList().map(data => data.json()).subscribe(data => {
      console.log(data);
      this.bankList = data.data;
    })
  }

  //刷新图片验证码
  refreshCode(){
    this.api.yhkbandVerify().map(data => data.json()).subscribe(data => {
        console.log(data);
        this.verBase64 = "data:image/jpg;base64," + data.data;
        this.verifyCode='';
    });
  }

  //去开户城市
  city(){
      let modal = this.modalCtrl.create('AddbankModalPage',{ all_data : localStorage.getItem('city') });
      modal.present();
      modal.onDidDismiss(data => {
        if(!data){
          console.log('没有选择')
        }else{
          this.cityName=data.data_city; 
          this.cityId=data.data_cityId;
      }
    })
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

  //短信提交
  add_gettime(){
     if (!/([\d]{4})([\d]{4})([\d]{4})([\d]{4})([\d]{0,})?/.test(this.cardNumber)) {
        this.showAlert('消息提醒',"银行卡不能为空或者格式不对");
      }else if (this.selectedBankId == '') {
        this.showAlert('消息提醒',"请输入银行选项");
      }else if (this.cityName == '') {
        this.showAlert('消息提醒',"请输入开户城市");
      }else if (this.subbranch == '') {
        this.showAlert('消息提醒',"请输入开户分行");
      }else if (this.subbranch1 == '') {
        this.showAlert('消息提醒',"请输入开户支行");
      }else if (this.verifyCode == "") {
         this.showAlert('消息提醒',"图片验证码输入不能为空");
      }else if (!/^1(3|4|5|7|8)\d{9}$/.test(this.phone_code)) {
         this.showAlert('消息提醒',"手机格式有误或者不能为空");
      }else {
         this.duanxin_data();
      }
  }

  //短信接口
  duanxin_data(){
    this.huoqu_btn=true;
     let add_params = {
        banknumber: this.cardNumber,    //银行卡号
        bankname: this.selectedBankId,  //银行ID
        xian: this.cityId,              //开户城市
        subbranch: this.subbranch,      //分行
        subbranch1: this.subbranch1,    //支行
        yhkCode: this.verifyCode,       //图片验证码
        phone: this.phone_code,         //手机预留号码
        newAPP: 'true'
    };
    console.log(add_params);

    // if(this.add_z == 1){
    //   this.api.bindBankCard(this.cardNumber,this.selectedBankId,this.cityId,this.subbranch,this.subbranch1,this.verifyCode, this.phone_code).map(data => data.json()).subscribe(data => {
    //       if(data.code == '000000'){
    //         // this.bank_number=
    //         this.huoqu_btn = true; //短信禁止按钮
    //         this.tijiao_btn=false;
    //         this.time();
    //         this.add_z=2;
    //         this.add_description=data.description;
    //         this.showAlert('消息提醒', "短信已发送到您的手机，请注意查收。");
    //         this.sms_data=true;
    //       }else{
    //         this.showAlert('消息提醒',data.description);
    //         this.refreshCode();
    //         this.huoqu_btn = false; //短信禁止按钮
    //       }
    //   })
    // }else{
    //    this.api.smsBankCard(this.add_description).map(data => data.json()).subscribe(data => {
    //       if(data.code == '000000'){
    //         this.huoqu_btn = true; //短信禁止按钮
    //         this.tijiao_btn=false;
    //         this.time();
    //         this.showAlert('消息提醒', "短信已发送到您的手机，请注意查收。");
    //       }else{
    //         this.showAlert('消息提醒',data.description);
    //         this.refreshCode();
    //         this.huoqu_btn = false; //短信禁止按钮
    //       }
    //   })
    // }


  }

  //倒计时
  time(){
    let second=59;
    let title='s后重发'
    this.code_title=second+title;
    let timed=setInterval(()=>{
       if (second > 0) {
         this.code_title=second+title;
         second--;
      } else {
          clearInterval(timed);
          second = 59;
          this.code_title = "获取验证码";
          this.huoqu_btn=false;
          this.tijiao_btn=true;
      }
    },1000)
  }

  //确认提交
  submit(){
    console.log(this.cardNumber,this.selectedBankId,this.cityId,this.subbranch,this.subbranch1,this.add_description, this.phone_code1)
    this.api.confirmBankCard(this.cardNumber,this.selectedBankId,this.cityId,this.subbranch,this.subbranch1,this.add_description, this.phone_code1).map(data => data.json()).subscribe(data => {
         if (data.code == "000000") {
              this.showAlert('消息提醒', data.description);
              this.navCtrl.popToRoot();
          }else {
              this.showAlert('消息提醒', data.description);
          }
    })
  }

  


}
