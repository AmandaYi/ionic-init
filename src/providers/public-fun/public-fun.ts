import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/**
 * @name 公共方法
 */
 
@Injectable()
export class PublicFunProvider {

  constructor(public http: Http, public navCtrl: NavController) {
    console.log('Hello PublicFunProvider Provider');
  }

 
  /**
   * @name 跳转公共方法
   * @param page 
   */
  
  pubiicPush(page,obj={}){
    this.navCtrl.push(page,obj)
  }
  
  
}
