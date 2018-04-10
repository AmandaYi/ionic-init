import { HomePage } from './../pages/home/home';
import { MePage } from './../pages/me/me';
import { Component, OnInit } from '@angular/core';
import { Platform, ModalController, IonicApp, App, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { NativeServiveProvider } from './../providers/native-servive/native-servive';
import { APP_NUM } from '../providers/constants/constants';
import { VERSION_NUM } from '../providers/constants/constants';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  templateUrl: 'app.html',
})
export class MyApp implements OnInit {
  rootPage: any = 'HomePage';
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  public advertise = [];   //广告
  public daiji_code: number;      //启动的--》手势不能相互再次启动  
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private apiservice: ApiServiceProvider,
    private modalCtrl: ModalController,
    private native: NativeServiveProvider,
    private ionicApp: IonicApp,
    private keyboard: Keyboard,
    private app: App,
    private events: Events,


  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();


      //ios的selsect的确定键
      this.keyboard.disableScroll(false);
      this.keyboard.hideKeyboardAccessoryBar(false);

      this.gesure();         //手势验证
      this.adv();            //广告
      this.app_updata();        //版本更新和检查
      this.standby();        //待机状态的检测
      this.registerBackButtonAction();    //安卓返回键
      localStorage.setItem('zhifu', 'false');  //启动时支付模态框是不存在的
      localStorage.setItem('risk', 'true');        //风险评估
      localStorage.setItem('hide_qq', 'true');     //双乾
      localStorage.setItem('updata', 'false');      //app升级
    });
  }

  ngOnInit() {
    this.daiji_code = 1;    //启动的--》手势不能相互再次启动
    localStorage.setItem('state', 'true'); //监听待机下--在登录还有手势页面，不能重复出现

  }

  //待机状态的检测(应用从后台切换到前台)
  standby() {

    //(应用从前台切换到后台)
    document.addEventListener("pause", () => {
      this.daiji_code = 2;
    }, false)

    //(应用从后台切换到前台)
    document.addEventListener("resume", () => {
      //登录设置手势密码的
      if (localStorage.getItem('personal') && !localStorage.getItem('handlock_passwd')) {
        this.apiservice.account_data().map(data => data.json()).subscribe(data => {
          if (data.code == "000000") {
            console.log('有登录状态');
            localStorage.setItem('state', 'true');
          } else {
            if (localStorage.getItem('state') == 'true') {
              let modal = this.modalCtrl.create('LoginPage', { type: '登录状态失效' });
              modal.present();
              localStorage.setItem('state', 'false');
            } else {

            }
          }
        })
      }
      //登录没设置手势密码的
      else if (localStorage.getItem('personal') && localStorage.getItem('handlock_passwd')) {
        this.apiservice.account_data().map(data => data.json()).subscribe(data => {
          if (data.code == '000000') {
            console.log('有登录状态');
            localStorage.setItem('state', 'true');
          } else {
            if (localStorage.getItem('state') == 'true') {
              let modal = this.modalCtrl.create('SetGesturePage', { core: '待机广告失效' });
              modal.present();
              localStorage.setItem('state', 'false');
            } else {

            }
          }
        })
      }
    }, false);
  }

  //开启广告
  open() {
    this.apiservice.appAdvServlet()
      .map(data => data.json())
      .subscribe(data => {
        if (data.code == "000000") {
          this.advertise = data.data;
          let modal = this.modalCtrl.create('AdvertisePage', { data: data.data });
          modal.present();
          console.group('广告')
          console.log(data)
          console.groupEnd()
        } else {
          console.log('没有广告图片')
          console.log('不执行模态框')
        }
      })
  }

  //广告订阅
  adv() {
    this.events.subscribe('user:Ad', () => {
      this.open();
      console.log('广告已经发布');
    });
  };
  ionViewWillLeave() {
    this.events.unsubscribe('user:Ad', () => { });
  }


  //手势验证
  gesure() {
    if (localStorage.getItem('handlock_passwd') && localStorage.getItem('personal') && this.daiji_code == 1) {
      let modal = this.modalCtrl.create('SetGesturePage', { core: '待机广告失效' });
      modal.present();
      localStorage.setItem('state', 'false');
    } else if (localStorage.getItem('personal') && !localStorage.getItem('handlock_passwd') && this.daiji_code == 1) {
      this.apiservice.account_data().map(data => data.json()).subscribe(data => {
        if (data.code == "000000") {
          console.log('有登录状态');
          localStorage.setItem('state', 'true');
        } else {
          localStorage.removeItem('personal');
          localStorage.setItem('state', 'false');
        }
      })
    } else {
      // this.open();
    }


  }


  //版本更新
  app_updata() {
    this.apiservice.timing().map(data => data.json()).subscribe(data => {
      console.log(data);
      let serverAppVersion = data.data.version[0]; //从服务端获取最新版本
      if (this.native.isAndroid()) {
        if (serverAppVersion.id != APP_NUM) {
          this.native.isUpdata(serverAppVersion.id, serverAppVersion.verNO, serverAppVersion.localUrl, serverAppVersion.mark);
          // this.native.isUpdata(data.data.appVersion, data.data.isupdate, data.msg, data.data.downloadUrl);
          // serverAppVersion.mark//升级内容
          // serverAppVersion.version[0].appVersion//版本号
          // serverAppVersion.localUrl//下载地址
        }
      } else if (this.native.isIos()) {
        if (data.data.iosVer != APP_NUM) {
          // this.native.iosUp(data.data.iosVer,data.data.iosIsupdateVer);
        }
      }
    })
  }


  //返回键方法
  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      let activePortal = this.ionicApp._overlayPortal.getActive() || this.ionicApp._modalPortal.getActive();//呈现框和模态框
      let otherActive = this.ionicApp._loadingPortal.getActive();//加载框
      let is = this.app.getActiveNav().canGoBack();//是否可以返回

      if (otherActive) {//加载框的时候禁止返回键
        console.log('不需要返回')
      } else if (activePortal) {
        console.log('不需要返回')
      } else {
        if (is) {
          if (localStorage.getItem('zhifu') == 'true') {
            console.log('充值-提现-自动投标支付模态框不允许返回');
          } else {
            this.app.getActiveNav().pop();
          }
        } else {
          this.exit();
        }

      }
    }, 101)
  }

  //测试
  test() {
    console.log(this.platform.platforms());
    if (this.platform.is('mobileweb')) {
      alert('11111111');

    }
  };


  //退出app的方法
  exit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      this.native.showToast('再按一次退出应用', 2000);

      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }





}




