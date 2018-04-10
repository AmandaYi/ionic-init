import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the RegisterSuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:"RegisterSuccessPage"
})
@Component({
  selector: 'page-register-success',
  templateUrl: 'register-success.html',
})
export class RegisterSuccessPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl:ViewController
    ) {
  }

  //返回上一页
  return(){
      this.viewCtrl.dismiss();
  }

  //跳转银行存管
  realname(){
    this.navCtrl.push('RealnamePage',{ZC_type : '注册'});
    this.viewCtrl.dismiss();
  }



}
