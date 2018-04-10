import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { NativeServiveProvider }from '../../providers/native-servive/native-servive';
import { SERVER_URL }from '../../providers/constants/constants';
import { APP_NUM } from  '../../providers/constants/constants';
import { VERSION_NUM } from '../../providers/constants/constants';
/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'MorePage'
})
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage implements OnInit {
  public isLogin:boolean;     //是否登录状态
  public verson:any;    //版本号
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public api:ApiServiceProvider,
     public alertCtrl :AlertController,
     public nav:NativeServiveProvider,
     ) {
  }

  ngOnInit() {
    this.loginstate();
    this.verson=VERSION_NUM;
  }

  //登录状态
  loginstate(){
    if(localStorage.getItem('personal')){
      this.isLogin=true;
    }else{
      this.isLogin=false;
    }
  }

  //跳转到关于我们的页面
  aboutUs(){
    this.nav.themeable(SERVER_URL + 'app/wap/helpCenter/aboutUs.screen').on('closeevent').subscribe(data => {
        // this.all_data();      //重新查询数据
    });
  }
  //客服电话
  callPhone(mobilePhone){
    window.location.href='tel:'+mobilePhone;
  }

  //当前的版本更新
  dangqian(){
     this.api.timing().map(data => data.json()).subscribe(data => {
          console.log(data);
          let serverAppVersion = data.data.version[0]; //从服务端获取最新版本
          if (this.nav.isAndroid()) {
            if (serverAppVersion.id != APP_NUM) {
              if(localStorage.getItem('updata')=='true'){

              }else{
                this.showConfirm(serverAppVersion.id, serverAppVersion.verNO,serverAppVersion.localUrl,serverAppVersion.mark);
              }
              // this.nav.isUpdata(serverAppVersion.id, serverAppVersion.version[0].appVersion,serverAppVersion.localUrl,serverAppVersion.mark);
              // this.native.isUpdata(data.data.appVersion, data.data.isupdate, data.msg, data.data.downloadUrl);
              // serverAppVersion.mark//升级内容
              // serverAppVersion.version[0].appVersion//版本号
              // serverAppVersion.localUrl//下载地址
            }else{
              this.nav.showToast('当前是最新的版本！');
            }
          }else if (this.nav.isIos()) {
            if (data.data.iosVer != APP_NUM) {
               this.showConfirm(serverAppVersion.id, serverAppVersion.verNO,serverAppVersion.localUrl,serverAppVersion.mark);
              // this.native.iosUp(data.data.iosVer,data.data.iosIsupdateVer);
            }else{
               this.nav.showToast('当前是最新的版本！');
            }
          }
        })
  }



  //安全退出
  showExitConfirm(){
    this.presentConfirm();
  }

  //清除所有缓存数据
  safeExit(){
    this.api.logout().map(data => data.json()).subscribe(data => {
        console.log(data);
        if(data.code=='000000'){
            localStorage.clear();
            localStorage.setItem('state','true');
            localStorage.setItem('updata','false');
            this.navCtrl.pop();
        }else{
           console.log(data.description);
        }
    })
  }

  //版本更新的弹窗
  showConfirm(id,appVersion,localUrl,mark) {
    let confirm = this.alertCtrl.create({
      title: '更新最新版本?',
      enableBackdropDismiss:false,
      // message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('不更新');
          }
        },
        {
          text: '更新',
          handler: () => {
           this.nav.isUpdata(id,appVersion,localUrl,mark);
          }
        }
      ]
    });
    confirm.present();
  }

    //弹窗
  presentConfirm() {
    let alert = this.alertCtrl.create({
      // title: '退出当前账户',
      message: '您确定要安全登出当前账户吗',
      enableBackdropDismiss:false,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
          this.safeExit();
          }
        }
      ]
    });
    alert.present();
  }

  //返回
  return(){
    this.navCtrl.pop();
  }
  


}
