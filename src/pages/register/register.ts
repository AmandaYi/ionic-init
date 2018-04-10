import { Component ,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ViewController, Events } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { Md5 } from 'ts-md5/dist/md5';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'RegisterPage'
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {
    public phone:any;                      //帐号
    public phone_icon:boolean;             //隐藏帐号的删除键
    public psw:any;                        //密码
    public pass:string;                    //密码的显隐性
    public password_icon:boolean;          //隐藏密码的删除键
    public flag1:boolean;                  //密码的眼睛显隐性
    public verBase64:any;                  //图片
    public yzm:any;                        //验证码
    public dxyzm:any;                      //短信验证码
    public yaoqingren:any;                 //邀请人
    public disabled_state:boolean;         //注册按钮的disabled
    public flag2:boolean;                  //三角形
    public disabled_code:boolean;          //短信的禁止按钮
    public code_title:any;                 //验证码的title


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api:ApiServiceProvider,
    public modalCtrl: ModalController,
    public alertCtrl:AlertController,
    public viewCtrl:ViewController,
    public events:Events
    ) {
  }

  ngOnInit() {

  }


  //进入页面
  ionViewWillEnter(){
    this.int();
    this.refreshCode();
  }

  //默认进入页面的
  int(){
     this.phone_icon=false;
     this.pass='password';
     this.password_icon=false;
     this.flag1=false;
     this.disabled_state=true;
     this.flag2=true;
     this.disabled_code=false;
     this.code_title='获取验证码';
     this.phone='';
     this.psw='';
     this.yzm='';
     this.yaoqingren='';
     this.dxyzm='';
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

  //监听密码的输入
  password_key(ps){
    console.log(ps);
    if(ps){
      this.password_icon=true;
    }else{
      this.password_icon=false;
    }
  }

  //删除密码的输入
  password_hide(){
    this.psw='';
    this.password_icon=false;

  }

  //眼睛显示密码的显隐性
  passwordCtrl(){
    this.flag1=!this.flag1;
    if(this.flag1){
      this.pass='text';
    }else{
      this.pass='password';
    }
  }

  //刷新图片验证码
  refreshCode(){
    this.api.appRegisterVerify('app').map(data => data.json()).subscribe(data => {
        console.log(data);
        this.verBase64 = "data:image/jpg;base64," + data.data;
        this.yzm='';
    });
  }

  //返回上一页
  return(){
    this.navCtrl.pop();
  }

  //去登录界面
  login(){
   let modal = this.modalCtrl.create('LoginPage',{ type :'登录状态失效' });
   modal.present();
   this.viewCtrl.dismiss();
    // modal.onDidDismiss(data => {
    //   if(!data){
    //      console.log('没有登录')
    //   }else{
    //     this.navCtrl.pop();
    //   }})
  }

  //去注册协议
  Agreement(){
    this.navCtrl.push('AgreementPage')
  }

  //短信
  getMessageCode(ph,ps,yz){
    if(!ph || !ps || !yz){
      this.showAlert('消息提醒','请先填写完整');
    }else if(!(/^(13|14|15|17|18)[0-9]{9}$/).test(ph)){
      this.showAlert('消息提醒','你的手机号码错误');
    }else if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/).test(ps)){
      this.showAlert('消息提醒','密码必须由6-20位(字母+数字)且不能带有特殊字符组成！');
    }else{
      this.all_data(ph,'RZ',yz);
    }
  }

  //点击短信接口
  all_data(ph,RZ,yz){
    console.log(ph,RZ,yz);
    this.disabled_code=true;
    this.api.newbitMobileCode(ph,RZ,yz).map(data => data.json()).subscribe(data => {
       if (data.code == '000000') {
            this.disabled_state=false;
            this.time();
        } 
        else {
            this.disabled_code=false;
            this.disabled_state=true;
            this.refreshCode();
            this.showAlert('消息提醒',data.description)
        }
    })
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
          this.disabled_code=false;
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

  //立即注册
  register(phone,psw,yzm,dxyzm,yaoqingren){
    if (!phone || !psw || !yzm || !dxyzm) {
       this.showAlert('消息提醒','请填写完整')
    }else if(!(/^(13|14|15|17|18)[0-9]{9}$/).test(phone)){
       this.showAlert('消息提醒','您的手机号码错误!')
    }else if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/).test(psw)){
      this.showAlert('消息提醒','密码必须由6-20位(字母+数字)且不能带有特殊字符组成！');
    }else{
      this.disabled_state=true;
      this.api.new_register(dxyzm,phone,Md5.hashStr(psw),yzm,yaoqingren).map(data => data.json()).subscribe(data => {
          console.log(data);
          if (data.code == "000000") {
                let  information ={
                'accountName':phone,                   //保存没加密的手机号
                'phone':phone,                         //保存加密的手机号
                'password':psw,                        //保存密码
                'realName':'',                         //保存用户名字
                'riskId':data.accountId,               //保存风险评估ID
                'ticketCount':data.data.ticketCount,   //保存ID
                'accountId':data.accountId             //保存账户Id
              };
              localStorage.setItem('personal',JSON.stringify(information))
              localStorage.setItem('risk','true');                    //默认显示风险评测
              localStorage.removeItem('handlock_passwd');

              let modal = this.modalCtrl.create('SetGesturePage',{ 'ZC_type' : '注册'});
              modal.present();
              this.viewCtrl.dismiss('注册成功');

               if(this.navParams.get('type')=='登录状态失效'){
                  this.events.publish('user:tzc');
              }
          } 
          else {
             this.showAlert('消息提醒', data.description);
             this.disabled_state=false;
          }
      })
    }

  }

}
