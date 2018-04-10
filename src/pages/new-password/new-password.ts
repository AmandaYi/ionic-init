import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { Md5 } from 'ts-md5/dist/md5';

/**
 * Generated class for the NewPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'NewPasswordPage'
})
@Component({
  selector: 'page-new-password',
  templateUrl: 'new-password.html',
})
export class NewPasswordPage {
  public new_psw1:any;        //新密码
  public new_psw2:any;        //确认密码

  public pass1:any;           //新密码的类型
  public pass2:any;           //确认密码的类型

  public password_icon1:boolean;    //新密码眼睛的显示
  public password_icon2:boolean;    //确认密码眼睛的显示

  public flag1:boolean;        //新密码的密文
  public flag2:boolean;        //新密码的密文

  public login_state:boolean;  //下一步的按钮
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public api:ApiServiceProvider,
     public alertCtrl:AlertController,
     public viewCtrl:ViewController
     ) {
  }

  //进入页面
  ionViewWillEnter(){
    this.int();
  }
  //默认进入页面的
  int(){
    this.new_psw1='';
    this.new_psw2='';
    this.pass1='password';
    this.pass2='password';
    this.password_icon1=false;
    this.password_icon2=false;
    this.flag1=false;
    this.flag2=false;
    this.login_state=true;

  }
  //返回上一页
  return(){
     if(this.navParams.get('state')=='账户信息'){
       this.navCtrl.popToRoot();
     }else{
       this.navCtrl.pop();
     }
  }
  //监听密码的输入
  password_key1(ps){
    console.log(ps);
    if(ps){
      this.password_icon1=true;
       this.login_state=false;
    }else{
      this.password_icon1=false;
       this.login_state=true;
    }
  }
  //删除密码的输入
  password_hide1(){
    this.new_psw1='';
    this.password_icon1=false;

  }
   //眼睛显示密码的显隐性
  passwordCtrl1(){
    this.flag1=!this.flag1;
    if(this.flag1){
      this.pass1='text';
    }else{
      this.pass1='password';
    }
  }

   //监听密码的输入
  password_key2(ps){
    console.log(ps);
    if(ps){
      this.password_icon2=true;
       this.login_state=false;
    }else{
      this.password_icon2=false;
       this.login_state=true;
    }
  }
  //删除密码的输入
  password_hide2(){
    this.new_psw2='';
    this.password_icon2=false;

  }
   //眼睛显示密码的显隐性
  passwordCtrl2(){
    this.flag2=!this.flag2;
    if(this.flag2){
      this.pass2='text';
    }else{
      this.pass2='password';
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

  //下一步
  login(){
    if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/).test(this.new_psw1)){
      this.showAlert('消息提醒','密码必须由6-20位(字母+数字)且不能带有特殊字符组成！');
    }else if(this.new_psw1 != this.new_psw2){
      this.showAlert('消息提醒','新密码两次输入不一致')
    }else{
      this.all_data();
    }
  }
  //下一步的接口
  all_data(){
     var params = {
          password: Md5.hashStr(this.new_psw1),
          rePassword: Md5.hashStr(this.new_psw1),
          phone: this.navParams.get('tel'),
          code: this.navParams.get('code'),
          type: this.navParams.get('type')
      };
      console.log(params);
      this.api.resetLoginPwdNewApp(Md5.hashStr(this.new_psw1),Md5.hashStr(this.new_psw1),this.navParams.get('tel'),this.navParams.get('code'),this.navParams.get('type')).map(data => data.json()).subscribe(data => {
        if(data.code == '000000'){
          this.showAlert('消息提醒','操作成功，请重新登录');
          localStorage.clear();
          if(this.navParams.get('state')=='账户信息'){
            this.navCtrl.popToRoot();
          }else{
            this.navCtrl.pop();
          }
        }else{
          this.showAlert('消息提醒',data.description);
        }
      })
  }
}
