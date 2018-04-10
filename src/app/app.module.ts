import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule, HammerGestureConfig } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Http, XHRBackend, RequestOptions, ConnectionBackend, HttpModule, JsonpModule } from "@angular/http";


import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { UtilsProvider } from '../providers/utils/utils';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { NativeServiveProvider } from '../providers/native-servive/native-servive';
import { BusinessProvider } from '../providers/business/business';
import { PublicFunProvider } from '../providers/public-fun/public-fun';
import { GesturePasswordModule } from "ngx-gesture-password";
import { Network } from '@ionic-native/network';
import { QRCodeModule } from 'angular2-qrcode';
import { Keyboard } from '@ionic-native/keyboard';
import { FileOpener } from '@ionic-native/file-opener';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Autostart } from '@ionic-native/autostart';
// import { MyhammerconfigProvider } from '../providers/myhammerconfig/myhammerconfig';

import * as ionicGalleryModal from 'ionic-gallery-modal';

import { ContactPage } from '../pages/contact/contact';
import { MePage } from '../pages/me/me'; 
import { HomePage } from './../pages/home/home';
import { ListPage } from '../pages/list/list';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    // ContactPage,
    // MePage,
    // HomePage,
    // ListPage
  ],
  imports: [
    ionicGalleryModal.GalleryModalModule,
    BrowserModule,
    GesturePasswordModule,
    HttpModule,
    // QRCodeModule,  
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: 'true',//所有子页面tabs隐藏
      backButtonText: '',
      iconMode: 'ios',
      mode: 'ios',
      cache: false,             //禁止应用缓存
      autoFocusassist: false,   //自动聚焦
      scrollAssist: false,      // 禁止智能滚动
      tabsHighlight: false,      //是否在选择该选项卡时显示高亮线。

      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition',
      backButtonIcon: 'backicon'

      // backButtonIcon:'arrow-back'
      // 后面这两是应对手机键盘弹出时会把界面撑上去的问题
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    // HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpServiceProvider,
    UtilsProvider,
    ApiServiceProvider,
    NativeServiveProvider,
    BusinessProvider,
    InAppBrowser,
    ThemeableBrowser,
    PublicFunProvider,
    Network,
    Keyboard,
    FileOpener,
    FileTransfer,
    File,
    Autostart,
    //上下滑动
    //  { provide: MyhammerconfigProvider, useClass: MyhammerconfigProvider }

  ],
})

export class AppModule { }
