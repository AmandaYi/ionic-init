import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NavtitleWeChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'NavtitleWeChatPage'
})
@Component({
  selector: 'page-navtitle-we-chat',
  templateUrl: 'navtitle-we-chat.html',
})
export class NavtitleWeChatPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NavtitleWeChatPage');
  }

}
