import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PrivilegeDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'PrivilegeDetailPage'
})
@Component({
  selector: 'page-privilege-detail',
  templateUrl: 'privilege-detail.html',
})
export class PrivilegeDetailPage {
  public task_id:any;         //判断title类型

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams
     ) {
  }

  //返回上一页
  return(){
    this.navCtrl.pop();
  }

 //进入页面
  ionViewWillEnter(){
    this.int();
  }

  //初始化
  int(){
    console.log(this.navParams.get('title'));
    if(this.navParams.get('title')=='短信提醒'){
          this.task_id=1;
    }else if(this.navParams.get('title')=='投资管理费'){
          this.task_id=2;
    }else if(this.navParams.get('title')=='生日礼金'){
          this.task_id=3;
    }else if(this.navParams.get('title')=='升级礼金'){
          this.task_id=4;
    }else if(this.navParams.get('title')=='自动投标'){
          this.task_id=5;
    }else if(this.navParams.get('title')=='提现费率'){
          this.task_id=6;
    }else if(this.navParams.get('title')=='免费提现额度'){
          this.task_id=7;
    }else if(this.navParams.get('title')=='专属客服'){
          this.task_id=8;
    }else if(this.navParams.get('title')=='年会参与特权'){
          this.task_id=9;
    }else if(this.navParams.get('title')=='好友佣金系数'){
          this.task_id=10;
    }else if(this.navParams.get('title')=='会员礼包'){
          this.task_id=11;
    }
  }

}
