import { ApiServiceProvider } from './../../providers/api-service/api-service';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeServiveProvider } from './../../providers/native-servive/native-servive';
import { Content } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';

@IonicPage({
  name: 'ListPage'
})
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  @ViewChild(Content) content: Content;

  public icons: any = "2";   // 默认显示理财项目[普通标]
  public type: any;          //下拉加载；用于让组件识别

  net: boolean; //判断网络连接
  public view_Judges: boolean = true;  //判断没有更多数据...
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiservice: ApiServiceProvider,
    public native: NativeServiveProvider,
  ) {

  }
  //进入页面前执行
  ionViewWillEnter() {
    this.icons;
    this.net = this.native.getnetwork();//获取网络连接结果
  }





  //子类组件传给父类；
  return(group) {
    this.view_Judges = group;
  }

  willEnt() {
    this.ionViewWillEnter();
  }

  // 下拉刷新代码;
  doRefresh(refresher) {
    this.ionViewWillEnter();
    //下拉开始时启动;
    setTimeout(() => {
      //下拉刷新中启动;
      this.type = 1;
      refresher.complete();
    },200);
    this.type = 0;
  }

  onclick() {
    this.content.scrollToTop(0);
  }

//底部栏跳转
  home_click() {
    this.navCtrl.push('HomePage','', {animate:false})
  }
  list_click() {
    this.navCtrl.push('ListPage','', {animate:false})
  }
  concat_click() {
    this.navCtrl.push('ContactPage','', {animate:false})
  }
  me_click() {
    this.navCtrl.push('MePage','', {animate:false})
  }
}