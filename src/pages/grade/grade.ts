import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GradePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'GradePage'
})
@Component({
  selector: 'page-grade',
  templateUrl: 'grade.html',
})
export class GradePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GradePage');
  }
  //返回上一页
  return(){
    this.navCtrl.pop();
  }
  
  //去成长任务中心
  go_renwu(){
    this.navCtrl.push('TaskPage');
  }

}
