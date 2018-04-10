import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ApiServiceProvider } from './../../providers/api-service/api-service';



@IonicPage({
  name: 'RiskPage'
})
@Component({
  selector: 'page-risk',
  templateUrl: 'risk.html',
})
export class RiskPage {
  public userId: number;
  public safeType;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public api: ApiServiceProvider
  ) {
  }
  ionViewWillEnter() {
    let userId_value = this.navParams.get('userID');
    this.userId = userId_value;

    console.log('用户ID:' + this.userId);
  }




  close() {
    this.safeType = 0;
    this.viewCtrl.dismiss(this.safeType);
  }
  bottom_true() {
    this.api.safeType_Judge(Number(this.userId))
      .map(data => data.json())
      .subscribe(data => {
        console.log(data);
      });
    this.safeType = 1;
    this.viewCtrl.dismiss(this.safeType);
  }
}
