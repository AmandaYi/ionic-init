import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { NativeServiveProvider }from '../../providers/native-servive/native-servive';
import { SERVER_URL }from '../../providers/constants/constants';

/**
 * Generated class for the MyInvesDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'MyInvesDetailPage'
})
@Component({
  selector: 'page-my-inves-detail',
  templateUrl: 'my-inves-detail.html',
})
export class MyInvesDetailPage {
  public detailData1:any;            //合同内容
  public detailData2:any;            //合同内容
  public detailData3:any;            //合同内容
  public detailData4:any;            //合同内容
  public detailData5:any;            //合同内容
  public detailData6:any;            //合同内容
  public detailData7:any;            //合同内容
  public detailData8:any;            //合同内容
  public reserve:any;               //回款日期数组数据
  public reserveLength:any;         //回款的数组长度



  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public api:ApiServiceProvider,
     public nav:NativeServiveProvider,
     ) {
  }

    //返回上一页
  return(){
    this.navCtrl.pop();
  }

   //进入页面
  ionViewWillEnter(){
    this.all_data();
  }

  //获取数据
  all_data(){
     let id=this.navParams.get('id');
     let zqid=this.navParams.get('zqid');
     console.log(id,zqid);
     this.api.bidAndRepayList(id,zqid).map(data => data.json()).subscribe(res => {
       console.log(res);
        if (res.code == '000000') {
            this.detailData1 = res.data.bidTitle;
            this.detailData2 = res.data.tbje;
            this.detailData3 = res.data.rate;
            this.detailData4 = res.data.tzqx;
            this.detailData5 = res.data.paymentType;
            this.detailData6 = res.data.guarantee;
            this.detailData7 = res.data.yhbx;
            this.detailData8 = res.data.whbx;
            this.reserve = res.reserve;
            this.reserveLength = res.reserve.length;
        } else {
            console.log('没有数据')
        }
    })
  }

  //查看合同
  contract_btn(){
     this.nav.themeable(SERVER_URL+'app/agreement/index.htm?id='+this.navParams.get('id'));
  }

}
