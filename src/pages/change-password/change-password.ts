import { Component ,OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { Md5 } from 'ts-md5/dist/md5';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'ChangePasswordPage'
})
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage implements OnInit {
  public originalPassword:any;          //原密码
  public newPassword:any;               //新密码
  public confirmPassword:any;           //确认密码
  public clean_btn1:boolean;            //原密码删除键显示与隐藏
  public clean_btn2:boolean;            //新密码删除键显示与隐藏
  public clean_btn3:boolean;            //确认密码删除键显示与隐藏
  public isActive1:boolean;             //原密码的显隐性隐藏
  public isActive2:boolean;             //新密码的显隐性隐藏
  public isActive3:boolean;             //确认密码的显隐性隐藏
  public type1:any;                     //原密码的类型
  public type2:any;                     //新密码的类型
  public type3:any;                     //确认密码的类型

  public submit_phone:any;              //禁止按钮

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl:AlertController,
    public api:ApiServiceProvider,
    public modalCtrl:ModalController
    ) {
  }

  //初始化
  ngOnInit(){
    this.originalPassword='';
    this.newPassword='';
    this.confirmPassword='';
    this.clean_btn1=false;
    this.clean_btn2=false;
    this.clean_btn3=false;
    this.isActive1=false;
    this.isActive2=false;
    this.isActive3=false;
    this.type1='password';
    this.type2='password';
    this.type3='password';
    this.submit_phone=true;
  }

    //返回上一页
  return(){
     this.navCtrl.pop();
  }



  //监听原密码input的键
  jz1(originalPassword){
    if(originalPassword){
      this.clean_btn1=true;
      this.submit_phone=false;
    }else{
      this.clean_btn1=false;
      this.submit_phone=true;
    }
  }

   //监听新密码input的键
  jz2(newPassword){
    if(newPassword){
       this.clean_btn2=true;
       this.submit_phone=false;
    }else{
       this.clean_btn2=false;
       this.submit_phone=true;
    } 
  }

   //监听确认密码input的键
  jz3(confirmPassword){
    if(confirmPassword){
       this.clean_btn3=true;
       this.submit_phone=false;
    }else{
       this.clean_btn3=false;
       this.submit_phone=true;
    }
  }


  //原密码删除键
  clean1(){
   this.originalPassword='';
  }

  //新密码删除键
  clean2(){
   this.newPassword='';
  }

  //确认密码删除键
  clean3(){
   this.confirmPassword='';
  }
  
  //原密码显隐性点击
  Active1(){
    this.isActive1=!this.isActive1;
    if(this.isActive1){
      this.type1='text';
    }else{
      this.type1='password';
    }
  }

   //新密码显隐性点击
  Active2(){
    this.isActive2=!this.isActive2; 
    if(this.isActive2){
      this.type2='text';
    }else{
      this.type2='password';
    }
  }

   //确认密码显隐性点击
  Active3(){
    this.isActive3=!this.isActive3;
     if(this.isActive3){
      this.type3='text';
    }else{
      this.type3='password';
    }
  }

  //确定提交
  submitPassword(val_1,val_2,val_3){
     let patrn2 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;

    if(!val_1 || !val_2 || !val_3){
       this.showAlert('消息提醒','信息不完整')
    }else if(!patrn2.test(val_2)){
      this.showAlert('消息提醒','新密码必须由6-20位(字母+数字)且不能带有特殊字符组成！')
    }else if(val_2!=val_3){
        this.showAlert('消息提醒','两次输入的密码不一致')
    }else{
      this.all_data(Md5.hashStr(val_1),Md5.hashStr(val_2),Md5.hashStr(val_3))
    }
  }

  // 确定提交接口
  all_data(val_1,val_2,val_3){
    this.api.changePass(val_1,val_2,val_3).map(data => data.json()).subscribe(data => {
        if (data.code == '000000') {
             localStorage.clear();
             let alert = this.alertCtrl.create({
              title: '密码修改成功',
              message: '请重新登录',
              enableBackdropDismiss:false, 
              buttons: [
                {
                  text: '确定',
                  handler: () => {
                    this.navCtrl.popToRoot();
                    // let modal = this.modalCtrl.create('LoginPage');
                    // modal.present();
                    // modal.onDidDismiss(data => {
                    //   if(!data){
                    //     console.log('没有登录');
                    //     this.navCtrl.popToRoot();
                    //   }else if(JSON.parse(data)){
                    //     this.navCtrl.popToRoot();
                    //   }else{
                    //     console.log('没有登录')
                    //     this.navCtrl.popToRoot();
                    //   }})
                  }
                }
              ]
            });
            alert.present();
        } else if (data.code == '000031') {
           this.showAlert('消息提醒','原密码错误')
        } else {
          this.showAlert('消息提醒',data.description)
        }
    })
  }

  //跳转忘记密码
  modifyPassword(){
    this.navCtrl.push('RetrievePasswordPage',{ state : '账户信息'});
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
