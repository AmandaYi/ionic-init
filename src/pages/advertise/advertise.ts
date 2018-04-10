import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { SERVER_URL } from '../../providers/constants/constants';
import { NativeServiveProvider } from '../../providers/native-servive/native-servive';


@IonicPage({
  name:'AdvertisePage'
})
@Component({
  selector: 'page-advertise',
  templateUrl: 'advertise.html',
})
export class AdvertisePage {

  public picture; //图片地址
  public advUrl; //点击跳转地址
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public appurl: NativeServiveProvider
  ) {
  }
 
  ionViewWillEnter() {
    let data_value = this.navParams.get('data');
        this.picture=SERVER_URL+data_value.advImg
        this.advUrl=data_value.advUrl;
    console.group("接收到的数据广告数据")
    console.log(data_value);
    console.log('图片显示:'+this.picture);
    console.log('跳转地址:'+this.advUrl)
    console.groupEnd();
   }

   oncheck(){
    this.appurl.openUrlByBrowser(this.advUrl);

   }

      //关闭广告
    close(){
      this.viewCtrl.dismiss();
    }
}
