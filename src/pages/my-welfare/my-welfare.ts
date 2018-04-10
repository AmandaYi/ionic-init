import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

/**
 * Generated class for the MyWelfarePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'MyWelfarePage'
})
@Component({
  selector: 'page-my-welfare',
  templateUrl: 'my-welfare.html',
})
export class MyWelfarePage {
  public change:any;
  public all_list:any;        //所有的shuju


  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public api:ApiServiceProvider
     ) {
       this.change='weishiyong';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyWelfarePage');
  }

  //返回上一页
  return(){
    this.navCtrl.pop();
  }


 //进入页面
  ionViewWillEnter(){
   this.all_data(0);
  }

  all_data(val){
    this.api.cashcouponList(val,1,50).map(data => data.json()).subscribe(data => {
        console.log(data);
        if(data.code=='000000'){
          this.all_list=data.data;
        }else{

        }
    })
  }

  go_weishiyong(){
    this.all_data(0);
  }

  go_yishiyong(){
     this.all_data(1);
  }

  go_guoqi(){
    this.all_data(2);
  }
}
