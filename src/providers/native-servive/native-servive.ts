import { Network } from '@ionic-native/network';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController, LoadingController, Platform, Loading, AlertController, ModalController } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { APP_NUM } from '../constants/constants';
import 'rxjs/add/operator/map';
import { REQUEST_TIMEOUT } from '../constants/constants';

//下载插件
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { Autostart } from '@ionic-native/autostart';

declare let Wechat: any;


@Injectable()
export class NativeServiveProvider {

  private loadingIsOpen: boolean = false;
  private loading:Loading;
  constructor(
    public http: Http,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private inAppBrowser: InAppBrowser,
    private themeableBrowser: ThemeableBrowser,
    private platform: Platform,
    private network: Network,
    private loadingCtrl:LoadingController,
    private file: File,
    private transfer: FileTransfer,
    private fileOpener: FileOpener,
    private autostart: Autostart
  ) {
    console.log('Hello NativeServiveProvider Provider');
  }

  /**
 * 弹窗
 */
  showAlert(text: string = '操作成功') {
    let alert = this.alertCtrl.create({
      title: text,
      buttons: ['确定']
    });
    alert.present();
  }

  // /**
  //  * 黑色闪窗
  //  */
  // showBlock(text: string = '操作成功', time: number = 1200) {
  //   let toast = this.toastCtrl.create({
  //     message: text,
  //     duration: time,
  //     position: 'middle'
  //   });
  //   toast.present();
  // }

  /**
 * 统一调用此方法显示loading
 * @param content 显示的内容
 */
  showLoading(content: string = ''): void {
     
    if (!this.loadingIsOpen) {
      this.loadingIsOpen = true;
      this.loading = this.loadingCtrl.create({
        content: content
      });
      this.loading.present();
      setTimeout(() => {
        this.loadingIsOpen && this.loading.dismiss();
        this.loadingIsOpen = false;
      }, REQUEST_TIMEOUT);
    }
  };

  /**
   * 关闭loading
   */
  hideLoading(): void {
 
    if (this.loadingIsOpen) {
      setTimeout(() => {
        this.loading.dismiss();
        this.loadingIsOpen = false;
      }, 200);
    }
  };

  /**
 * 统一调用此方法显示提示信息
 * @param message 信息内容
 * @param duration 显示时长
 */
  showToast(message, duration: number = 2000){
      this.toastCtrl.create({
        message: message,
        duration: duration,
        position: 'middle',
        showCloseButton: false
      }).present();
  };


  /**
* 通过浏览器打开url
*/
  openUrlByBrowser(url: string): void {
    this.inAppBrowser.create(url, '_system');
  }


  /**
    * 浏览器打开2--返回箭头加X号
    */
  themeable(url: string) {
    let options: ThemeableBrowserOptions = {
      statusbar: {
        color: '#ffffffff'
      },
      toolbar: {
        height: 44,
        color: '#f0f0f0ff'
      },
      title: {
        color: '#003264ff',
        showPageTitle: true
      },
      backButton: {
        wwwImage: 'assets/image/back.png',
        wwwImagePressed: 'assets/image/back.png',
        wwwImageDensity: 2,
        align: 'left',
        event: 'backevent',

      },
      // forwardButton: {
      //   wwwImage: 'assets/images/go.png',
      //   wwwImagePressed: 'assets/images/go.png',
      //   wwwImageDensity: 2,
      //   align: 'left',
      // },
      closeButton: {
        wwwImage: 'assets/image/close.png',
        wwwImagePressed: 'assets/image/close.png',
        wwwImageDensity: 2,
        align: 'right',
        event: 'closeevent',
      },
      // customButtons: [
      //   {
      //     wwwImage: 'assets/images/ball4.png',
      //     wwwImagePressed: 'assets/images/ball4.png',
      //     wwwImageDensity: 2,
      //     align: 'right',
      //   }
      // ],
      // menu: {
      //  wwwImage: 'images/back.png',
      //   wwwImagePressed: 'assets/images/homeBg.png',
      //   wwwImageDensity: 2,
      //   title: 'Test',
      //   cancel: 'Cancel',
      //   align: 'right',
      //   items: [
      //     {
      //       event: 'helloPressed',
      //       label: 'Hello World!'
      //     },
      //     {
      //       event: 'testPressed',
      //       label: 'Test!'
      //     }
      //   ]
      // },
      backButtonCanClose: true
    };

    return this.themeableBrowser.create(url, '_blank', options);

  }


   /**
    * 浏览器打开2--去掉返回箭头加
    */

  fork(url: string) {
    let options: ThemeableBrowserOptions = {
      statusbar: {
        color: '#ffffffff'
      },
      toolbar: {
        height: 44,
        color: '#f0f0f0ff'
      },
      title: {
        color: '#003264ff',
        showPageTitle: true
      },
      // backButton: {
      //   wwwImage: 'assets/image/back.png',
      //   wwwImagePressed: 'assets/image/back.png',
      //   wwwImageDensity: 2,
      //   align: 'left',
      //   event: 'backevent',

      // },
      // forwardButton: {
      //   wwwImage: 'assets/images/go.png',
      //   wwwImagePressed: 'assets/images/go.png',
      //   wwwImageDensity: 2,
      //   align: 'left',
      // },
      closeButton: {
        wwwImage: 'assets/image/close.png',
        wwwImagePressed: 'assets/image/close.png',
        wwwImageDensity: 2,
        align: 'right',
        event: 'closeevent',
      },
      // customButtons: [
      //   {
      //     wwwImage: 'assets/images/ball4.png',
      //     wwwImagePressed: 'assets/images/ball4.png',
      //     wwwImageDensity: 2,
      //     align: 'right',
      //   }
      // ],
      // menu: {
      //  wwwImage: 'images/back.png',
      //   wwwImagePressed: 'assets/images/homeBg.png',
      //   wwwImageDensity: 2,
      //   title: 'Test',
      //   cancel: 'Cancel',
      //   align: 'right',
      //   items: [
      //     {
      //       event: 'helloPressed',
      //       label: 'Hello World!'
      //     },
      //     {
      //       event: 'testPressed',
      //       label: 'Test!'
      //     }
      //   ]
      // },
      backButtonCanClose: true
    };

    return this.themeableBrowser.create(url, '_blank', options);

  }


  /**
    * 邀请好友-浏览器打开2
    */
  themeable_yaoqing(url: string) {
    let options: ThemeableBrowserOptions = {
      statusbar: {
        color: '#ffffffff'
      },
      toolbar: {
        height: 44,
        color: '#f0f0f0ff'
      },
      title: {
        color: '#003264ff',
        showPageTitle: true
      },
      backButton: {
        wwwImage: 'assets/image/back.png',
        wwwImagePressed: 'assets/image/back.png',
        wwwImageDensity: 2,
        align: 'left',
        event: 'backevent',

      },
      // forwardButton: {
      //   wwwImage: 'assets/images/go.png',
      //   wwwImagePressed: 'assets/images/go.png',
      //   wwwImageDensity: 2,
      //   align: 'left',
      // },
      // closeButton: {
      //   wwwImage: 'assets/images/close.png',
      //   wwwImagePressed: 'assets/images/close.png',
      //   wwwImageDensity: 2,
      //   align: 'right',
      //   event: 'closeevent'
      // },
      // customButtons: [
      //   {
      //     wwwImage: 'assets/images/ball4.png',
      //     wwwImagePressed: 'assets/images/ball4.png',
      //     wwwImageDensity: 2,
      //     align: 'right',
      //   }
      // ],
      menu: {
        image: 'menu',  
        imagePressed: 'menu_pressed',  
        title: 'Test',  
        cancel: 'Cancel',  
        align: 'right',  
        items: [  
          {  
            event: 'helloPressed',  
            label: '分享到微信'  
          },  
          {  
            event: 'testPressed',  
            label: '分享到朋友圈'  
          }  
        ]  
      },
      backButtonCanClose: true
    };

    return this.themeableBrowser.create(url, '_blank', options);

  }

  /**
   * 分享
   * @return 
   */



  /**
   * 是否真机环境
   * @return {boolean}
   */
  isMobile() {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 是否android真机环境
   * @return {boolean}
   */
  isAndroid() {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否ios真机环境
   * @return {boolean}
   */
  isIos() {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }

  /**
   * 判断网络
   */
  getnetwork() {

    if (this.isMobile) {
      return this.network.type != 'none' ? true : false;
    }
  }

  /**
 * 获取网络类型 如`unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
 */
  getNetworkType(): string {
    if (!this.isMobile()) {
      return 'wifi';
    }
    return this.network.type;
  }

  /**
 * 判断是否有网络
 */
  isConnecting(): boolean {
    return this.getNetworkType() != 'none';
  }


  /**
   * 微信分享
   * @param title_  //标题
   * @param description_  //消息描述 （可选）
   * @param mediaTagName_  //媒体标签名称 （可选）
   * @param thumb_  //图片url
   * @param webpageUrl_ //分享地址
   * @param scene_ 1、Wechat.Scene.TIMELINE ：分享到朋友圈 ；2、Wechat.Scene.SESSION：分享到微信好友
   **/

  //分享到微信朋友圈
  wechatShare1(title_, description_, mediaTagName_, thumb_, webpageUrl_) {
    Wechat.share({
      message: {
        title: title_,
        description: description_, //消息描述 （可选）
        mediaTagName: mediaTagName_, //媒体标签名称 （可选）
        thumb: thumb_, //图片url
        media: {
          type: Wechat.Type.WEBPAGE, // webpage
          webpageUrl: webpageUrl_,
        }
      },
      scene: Wechat.Scene.TIMELINE// share to Timeline
    }, (data) => {
      //  alert("Success");
      this.showToast('分享成功');
    }, (reason) => {
      this.showToast('分享失败');
      // alert("Failed: " + reason);
    });
  }

  //分享到好友
  wechatShare2(title_, description_, mediaTagName_, thumb_, webpageUrl_) {
    Wechat.share({
      message: {
        title: title_,
        description: description_, //消息描述 （可选）
        mediaTagName: mediaTagName_, //媒体标签名称 （可选）
        thumb: thumb_, //图片url
        media: {
          type: Wechat.Type.WEBPAGE, // webpage
          webpageUrl: webpageUrl_,
        }
      },
      scene: Wechat.Scene.SESSION// share to Timeline
    }, (data) => {
      //  alert("Success");
       this.showToast('分享成功');
    }, (reason) => {
      // alert("Failed: " + reason);
       this.showToast('分享失败');
    });
  }

    /**clc
   * 判断是否要升级
   */
  isUpdata(id, appVersion, localUrl,msg) {
    this.alert_data(msg,localUrl);
    // if (APP_NUM < id) {
    //   this.showUptateApp('请更新到最新版本');
    //   // this.appDownLoad(dowmUrl);

    // } else {
    //   this.alert_data(msg,localUrl);
    // }

  }


  /**clc
   * 更新app弹窗
   */
  alert_data(msg,localUrl){
         let alert = this.alertCtrl.create({
          title: '版本升级',
          message: msg,
          enableBackdropDismiss:false,
          buttons: [
            {
              text: '取消',
              role: 'cancel',
            },
            {
              text: '升级',
              handler: () => {
                if (this.isAndroid()) {
                  this.appDownLoad(localUrl);
                }
                // if (this.isIos()) {
                //   this.iosDownLoad();
                // }

              }
            }
          ]
        });
        alert.present();
  }


    /**
   * 强制更新app显示弹窗
   * @param text 
   */
  showUptateApp(text) {
    const loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: text
    });

    loading.present();
  }


    /**
   *安卓app下载 
   */
  appDownLoad(dowmUrl) {
    localStorage.setItem('updata','true');
    //alt下载提示框
    let alt = this.alertCtrl.create({
      title: `<div class='title_all'>下载进度：0%<div>`,
      enableBackdropDismiss:false,
      buttons: ['后台下载']
    })
    alt.present();

    const fileTransfer: FileTransferObject = this.transfer.create();
    let directory = this.file.externalDataDirectory;//保存的目录 
    let date = new Date()
    let apkName = 'rongyudai.apk' + date;//保存的apk名称
    // const url = 'http://www.rongyudai.cn/app/fileStore/app/rongyudai-2.2.1.apk';
    const url = dowmUrl;
    // alert(url)
    fileTransfer.download('https://www.rongyudai.cn/app/downloadApp.htm', directory + apkName).then((entry) => {


      //打开app更新包
      this.fileOpener.open(directory + apkName, 'application/vnd.android.package-archive')
        .then(
        data => {
          //下载成功，关闭进度条
          this.autostart.enable();
        },
        err => {
          // this.utils.showAlert(err)
        })
        .catch(rc => {
          // this.utils.showAlert(rc)
        })


    }, (error) => {
      //  alert(JSON.stringify(error))

      this.alertCtrl.create({
        title: '失败!',
        subTitle: '下载安装包失败,请稍后再试!',
        buttons: ['确定']
      }).present();
      localStorage.setItem('updata','false');

    });


    fileTransfer.onProgress((event: ProgressEvent) => {

      let num = Math.floor(event.loaded / event.total * 100);
      if (num == 100) {
        alt.dismiss();
        localStorage.setItem('updata','false');
      } else {
        let title = document.getElementsByClassName('title_all')[0];
        title && (title.innerHTML = '下载进度：' + num + '%');
      }
    }
    )
  }



}
