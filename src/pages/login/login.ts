import { Component ,OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ModalController,ViewController, Events} from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { Md5 } from 'ts-md5/dist/md5';
import { Http } from '@angular/http';
import { SERVER_URL } from '../../providers/constants/constants';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
   name:'LoginPage'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  public phone:any;                      //帐号
  public phone_icon:boolean;             //隐藏帐号的删除键
  public psw:any;                        //密码
  public pass:string;                    //密码的显隐性
  public password_icon:boolean;          //隐藏密码的删除键
  public flag1:boolean;                  //密码的眼睛显隐性
  public verBase64:any;                  //图片
  public yzm:any;                        //验证码
  public login_state:boolean;            //登录状态的disabled
  public information:any;                //存储数据

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public api:ApiServiceProvider,
     public alertCtrl:AlertController,
     public viewCtrl: ViewController,
     public modalCtrl: ModalController,
     public http:Http,
     public events: Events,
     ) {
}


  ngOnInit() {
    // this.refreshCode();
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
     this.login_state=true;
  }


  //监听帐号的输入
  phone_key(ph){
    if(ph){
      this.phone_icon=true;
      this.login_state=false;
    }else{
      this.phone_icon=false;
       this.login_state=true;
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
       this.login_state=false;
    }else{
      this.password_icon=false;
       this.login_state=true;
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
    this.api.loginVerify().map(data => data.json()).subscribe(data => {
        console.log(data);
        if(data){
           this.verBase64 = "data:image/jpg;base64," + data.data;
           this.yzm='';
        }else{

        }
    });
  }


  //点击登录
  login(ph,ps,yz){
    this.login_interface(ph,ps,yz);
  }

  //登录接口
  login_interface(ph,ps,yz){
    if(!ph){
      this.showAlert('消息提醒','请您输入帐号')
    }else if(!ps){
      this.showAlert('消息提醒','请您输入密码')
    }else if(!yz){
      this.showAlert('消息提醒','请您输入验证码')
    }else{
      console.log(ph,Md5.hashStr(ps),yz);
      console.log(typeof ph,typeof Md5.hashStr(ps),typeof yz );

      if(localStorage.getItem('personal')){       //登录状态下，再次显示登录
          if(ph == JSON.parse(localStorage.getItem('personal')).accountName){
            console.log('已登录帐号，相同帐号登录，不清除手势')
          }else{
            localStorage.removeItem('handlock_passwd');
            console.log('已登录帐号，不同帐号登录，清除手势')
          }
          this.LOGIN_STATE(ph,Md5.hashStr(ps),yz);
      }else{                                       //第一次登录
        this.LOGIN_STATE(ph,Md5.hashStr(ps),yz);
        localStorage.removeItem('handlock_passwd');
      }
    }

  }

  //最终登录接口
  LOGIN_STATE(val_1,val_2,val_3){
    this.api.login_DATA(val_1,val_2,val_3).map(data => data.json()).subscribe(data => {
    // this.api.login(val_1,val_2).map(data => data.json()).subscribe(data => {
      console.log(data);
      console.log(this.psw);
      if (data.code == '000000') {
        this.information ={
          'accountName':data.data.phoneApp,      //保存没加密的手机号
          'phone':data.data.phone,               //保存加密的手机号
          'password':this.psw,                   //保存密码
          'realName':data.data.realName,         //保存用户名字
          'riskId':data.accountId,               //保存风险评估ID
          'ticketCount':data.data.ticketCount,   //保存福利券ID
          'accountId':data.accountId             //保存账户Id
        };
        // alert(JSON.stringify(this.information));
        localStorage.setItem('personal',JSON.stringify(this.information));
        localStorage.setItem('risk','true');                    //默认显示风险评测
        localStorage.setItem('hide_qq','true');                 //双乾
        localStorage.setItem('state','true');                   //待机--登录
        // localStorage.removeItem('handlock_passwd');
        if(localStorage.getItem('handlock_passwd')){
          console.log('已有的登录状态，不在弹出设置手势');
          this.viewCtrl.dismiss('登录成功');
        }else{
          console.log('没有的登录状态，弹出设置手势');
          this.to_gesture();
        }

        if(this.navParams.get('type')=='登录状态失效'){
            this.events.publish('user:tzc');
        }


      }else{
        this.showAlert('消息提醒',data.description);
        this.refreshCode();
      }
    });
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

  //关闭登录页面
  return(){
    if(this.navParams.get('type')=='登录状态失效'){
       localStorage.removeItem('personal');
        this.events.publish('user:tzc');
    }
    this.viewCtrl.dismiss().then(
      ()=>{
        // this.navCtrl.popAll();
      }
    )
  }


  //找回密码
  findPassword(){
    if(this.navParams.get('type')=='登录状态失效'){
      localStorage.removeItem('personal');
      this.events.publish('user:tzc');
    }
    let modal = this.modalCtrl.create('RetrievePasswordPage');
    modal.present();
    this.viewCtrl.dismiss();
  }

  //注册账户
  register(){
    if(this.navParams.get('type')=='登录状态失效'){
      localStorage.removeItem('personal');
      this.events.publish('user:tzc');
    }
     let modal = this.modalCtrl.create('RegisterPage',{ type:'登录状态失效'});
      modal.present();
     this.viewCtrl.dismiss();
  }

  //手势跳转
  to_gesture(){
    let modal = this.modalCtrl.create('SetGesturePage');
    modal.present();
    this.viewCtrl.dismiss('登录成功');
  }


}
