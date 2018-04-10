import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the QrcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'QrcodePage'
})
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {
  public code:any;        //地址
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrcodePage');
  }

    //返回上一页
  return(){
    this.navCtrl.pop();
  }


    //进入页面
  ionViewWillEnter(){
    this.code="https://www.rongyudai.cn/app/newbit/newbieActive.screen?spreadCode=" + this.navParams.get('qcode') + "&APP=app";
  }


}
