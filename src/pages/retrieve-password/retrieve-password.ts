import { Component ,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

/**
 * Generated class for the RetrievePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:"RetrievePasswordPage"
})
@Component({
  selector: 'page-retrieve-password',
  templateUrl: 'retrieve-password.html',
})
export class RetrievePasswordPage implements OnInit {
    public phone:any;                      //帐号
    public yzm:any;                        //图片验证码
    public dxyzm:any;                      //验证码
    public phone_icon:boolean;             //隐藏帐号的删除键
    public verBase64:any;                 //图片
    public disabled_type:boolean;         //短信都按钮的disabled
    public disabled_state:boolean;         //注册按钮的disabled
    public code_title:any;                 //验证码的title



  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api:ApiServiceProvider,
    public alertCtrl:AlertController,
    public viewCtrl:ViewController
  ) {
  }

 //初始化
  ngOnInit(){

  }

    //进入页面
  ionViewWillEnter(){
    this.int();
    this.refreshCode();
  }

    //默认进入页面的
  int(){
     this.phone='';
     this.yzm='';
     this.dxyzm='';
     this.phone_icon=false;
     this.disabled_type=false;
     this.disabled_state=true;
     this.code_title='获取验证码';

  }

    //返回上一页
  return(){
    this.viewCtrl.dismiss();
  }

    //监听帐号的输入
  phone_key(ph){
    if(ph){
      this.phone_icon=true;
    }else{
      this.phone_icon=false;
    }
  }

    //删除账户的输入
  phone_hide(){
    this.phone='';
    this.phone_icon=false;
  }

  //刷新图片验证码
  refreshCode(){
    this.api.forgetPassVerify().map(data => data.json()).subscribe(data => {
        console.log(data);
        this.verBase64 = "data:image/jpg;base64," + data.data;
        this.yzm='';
    });
  }

  //获取短信接口
  getVerify(telNumber,imgVercode){
    console.log(telNumber,imgVercode);
    if (!telNumber || !imgVercode) {
      this.showAlert('消息提醒','请填写完整')
    }else{
      this.api.forgetSmsNewApp(telNumber,imgVercode).map(data => data.json()).subscribe(data => {
          if(data.code == '000000'){
            this.disabled_type=true;
            this.disabled_state=false;
            this.time();
          }else{
            this.showAlert('消息提醒',data.description);
            this.refreshCode();
            this.disabled_type=false;
            this.disabled_state=true;
          }
      })
    }
  }

  //下一步
  register(phone,yzm,dxyzm){
    if(!phone || !yzm || !dxyzm){
      this.showAlert('消息提醒','请填写完整');
    }else{
      this.all_data(yzm,phone,dxyzm);
    }
  }

  //下一步接口申请
  all_data(yzm,phone,dxyzm){
    this.api.forgetPassNewApp(yzm,phone,dxyzm).map(data => data.json()).subscribe(data => {
        console.log(data);
        if (data.code == '000000') {
          if(this.navParams.get('state')){
              this.navCtrl.push('NewPasswordPage', {'state':'账户信息', tel: phone, code: dxyzm, type: yzm });
          }else{
               this.navCtrl.push('NewPasswordPage', { 'state':'其余页面',tel: phone, code: dxyzm, type: yzm });
               this.viewCtrl.dismiss();
          }
        } else {
          this.showAlert('消息提醒',data.description);
        }
    });
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
          this.disabled_type=false;
          this.disabled_state=true;
      }
    },1000)
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
