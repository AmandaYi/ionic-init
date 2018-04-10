import { Component ,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { NativeServiveProvider }from '../../providers/native-servive/native-servive';
import { SERVER_URL }from '../../providers/constants/constants';

/**
 * Generated class for the ModifyphonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'ModifyphonePage'
})
@Component({
  selector: 'page-modifyphone',
  templateUrl: 'modifyphone.html',
})
export class ModifyphonePage implements OnInit {
  public submit_phone:boolean;          //禁止按钮
  public new_phone:any;                 //输入框的值

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public api:ApiServiceProvider,
     public alertCtrl:AlertController,
     public nav:NativeServiveProvider,
     ) {
  }

  //初始化
   ngOnInit() {
    this.submit_phone=true;
    this.new_phone='';
  }

  //返回上一页
  return(){
    this.navCtrl.pop();
  }


  //监听input的输入键
  myKeyup(val){
    if(val){
      this.submit_phone=false;
    }else{
      this.submit_phone=true;
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

  //提交按钮
  olve_phone(new_phone){
    if(!(/^1[34578]\d{9}$/).test(new_phone)){
      this.showAlert('消息提醒', "新的手机号码格式不对！")
    }else{
      this.nav.themeable(SERVER_URL+'app/user/phoneModify.htm?phone=' + new_phone + '').on('closeevent').subscribe(data => {
        
      });

    }
  }
}
