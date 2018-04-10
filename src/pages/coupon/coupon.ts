import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
   /**
 * Generated class for the CouponPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'CouponPage'
})
@Component({
  selector: 'page-coupon',
  templateUrl: 'coupon.html',
})
export class CouponPage {

  public tzMoney: number;  //投资金额
  public allq = [];          //加息券
  public jxq = [];          //加息券
  public xjq = [];          //现金券
  
  public tojx: boolean = true;       //使用加息
  public toxj: boolean = true;       //使用现金
  
  public getID; //回调

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiServiceProvider,
    public viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {

    this.api.myTickets()
      .map(data => data.json().data)
      .subscribe(
      data => {
     this.allq = data;
        this.xjq = this.allq.filter(t => t.F35_10 == 'TR')
        this.jxq = this.allq.filter(t => t.F35_10 == 'JX')

        console.group("优惠券数据")
        console.log(this.allq)
        console.group("现金券")
        console.log(this.xjq)
        console.group("加息券")
        console.log(this.jxq)
        console.groupEnd()

      })



  }


  /**
   * @name 确定的回调，和右上角的返回一样功能
   */
  callback() {
    console.log(this.getID);
   this.viewCtrl.dismiss(this.getID);
    //关闭模态框方法
  }
  //返回键
  return(){
    this.viewCtrl.dismiss(this.getID);
  }
 
  getoutParam(e){
      this.getID = e;
      console.log("e:"+e);
    
  }
 


}
