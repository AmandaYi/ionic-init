import { Http } from '@angular/http';
import { ApiServiceProvider } from './../../providers/api-service/api-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyPropertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ name: 'MyPropertPage' })
@Component({
  selector: 'page-my-propert',
  templateUrl: 'my-propert.html',
})
export class MyPropertPage {

  propert: any = {};//资产统计数组
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiServiceProvider,
    public http: Http
  ) {
  }

  ionViewWillEnter() {
    this.getPropert();
  }

  /**
   * 查询资产统计
   */
  getPropert() {
    this.api.propertyAll()
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);
        if (data.code == '000000') {
          this.propert = data.data;
          console.log(this.propert);
        }
      }, err => {
        console.log(err);
      }
      )
  }

}
