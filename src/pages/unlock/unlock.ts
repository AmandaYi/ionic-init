import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the UnlockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'UnlockPage'
})
@Component({
  selector: 'page-unlock',
  templateUrl: 'unlock.html',
})
export class UnlockPage {
  public lock:boolean;        //true或者false
  public z_index:number;      //标记是否进入页面执行的滑动
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl:ModalController
    ) {
  }

      //进入页面
  ionViewWillEnter(){
    this.INT();
  }

  //初始滑
  INT(){
    if(this.navParams.get('type')=='未设置'){
      this.lock=false;
      this.z_index=2;
    }else{
       this.z_index=1;
       this.lock=true;
    }
  }

  //返回上一页
  return(){
    this.navCtrl.pop();
  }

  //滑动
  get_int(){
    if(this.lock){
      if(this.z_index==1){

      }else{
         this.to_gesture();
      }
    }else{
      this.z_index=2;
      localStorage.removeItem('handlock_passwd');
    }
  }

    //手势跳转
  to_gesture(){
    let modal = this.modalCtrl.create('SetGesturePage');
    modal.onDidDismiss(data => {
      if(!data){
        this.lock=false;
      }else{
        this.lock=true;
        this.navCtrl.popToRoot();
      }
    })
    modal.present();
  }


}
