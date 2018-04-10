import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

/**
 * Generated class for the BindmailboxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bindmailbox',
  templateUrl: 'bindmailbox.html',
})
export class BindmailboxPage {
  public email:any;         //邮箱
  public code_title:any;    //短信title
  public disabled_type:boolean;   //短信禁止按钮
  public disabled_state:boolean;  //下一步禁止按钮

  public isdata:boolean;      //判断有无有绑定邮箱
  public email_data:any;      //绑定后的邮箱
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public api:ApiServiceProvider,
     public alertCtrl:AlertController
     ) {
  }

  //返回上一页
  return(){
    this.navCtrl.pop();
  }

  //进入页面
  ionViewWillEnter(){
    this.init();
  }

  //初始化
  init(){
    console.log(this.navParams.get('type'));
    if(this.navParams.get('type') == '未绑定'){
        this.isdata=false;

        this.email='';
        this.code_title='获取验证码';
        this.disabled_type=false;
        this.disabled_state=true;
    }else{
         this.isdata=true;
         this.email_data=this.navParams.get('email');
    }
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

  //短信
  getCode(email){
    if (!email) {
      this.showAlert('消息提醒','邮箱格式不能为空');
    }else if(!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/).test(email)){
      this.showAlert('消息提醒','您的邮箱格式错误');
    }else{
      this.duanxin_data(email);
    }
  }

  //短信接口
  duanxin_data(email){
    this.api.getEmailCode(email).map(data => data.json()).subscribe(data => {
      if(data.code == '000000'){
        console.log(data);
        this.time();
        this.disabled_type=true;
        this.disabled_state=false;
      }else{
        this.showAlert('消息提醒',data.description);
        this.disabled_type=false;
        this.disabled_state=true;
      }
    })
  }

  //提交
  submit(email,dxyzm){
    if(!email || !dxyzm){
     this.showAlert('消息提醒','请填写完整');
    }else if(!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/).test(email)){
      this.showAlert('消息提醒','您的邮箱格式错误');
    }else{
      this.all_data(email,dxyzm)
    } 
  }

  //提交接口
  all_data(email,dxyzm){
    this.api.setUserEmail(email,dxyzm).map(data => data.json()).subscribe(data => {
        if(data.code == '000000'){
          this.showAlert('消息提醒','绑定邮箱成功');
          this.navCtrl.popToRoot();
        }else{
          this.showAlert('消息提醒',data.description);
        }
    })
  }

}
