import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BankLimtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'BankLimtPage'
})
@Component({
  selector: 'page-bank-limt',
  templateUrl: 'bank-limt.html',
})
export class BankLimtPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankLimtPage');
  }

    //返回上一页
    return(){
      this.navCtrl.pop();
    }
}
