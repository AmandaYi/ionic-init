import { ApiServiceProvider } from './../../providers/api-service/api-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'RecordPage'
})
@Component({
  selector: 'page-record',
  templateUrl: 'record.html',
})
export class RecordPage {

  tranLists: any = [];//交易记录列表
  choose: boolean = false;//判断分类框显示
  num: number = 15;//页面加载条数
  isInfinite: boolean = true;//判断是允许上拉刷新
  noMore: boolean = false;//判断显示没有更多啦
  tranType: any;//交易记录类型
  infinite: any;//上拉刷新参数
  refresh: any;//下拉刷新的参数

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiServiceProvider
  ) {
  }

  ionViewWillEnter() {
    this.getLists(0, 'l1');
  }

  /**
  * 点击筛选
  */
  showChoose() {
    this.choose = !this.choose;
    // 每次选择类型回到顶部
    document.getElementById("topest").scrollIntoView();
  }

  /**
   * 下拉刷新
   */
  doRefresh($event) {
    // setTimeout(function () {
    //   $event.complete();
    // }, 500);
    this.refresh = $event;
    this.choose=false;
    this.getRefresh();
  }


  /**
  * 上拉刷新
  * 
  */
  doInfinite($event) {
    this.num = this.num + 15;
    this.infinite = $event;
    this.getInfiniteLists();
    // setTimeout(function () {
    //   $event.complete();
    // }, 200);
  }

  /**
   * 下拉刷新执行的加载方法
   */
  getRefresh() {

    this.api.tranRecordList(0, 1, this.num, this.tranType)
      .map(data => data.json())
      .subscribe(
      data => {

        if (data.code == '000000') {
          this.refresh.complete();//停止下拉刷新
          this.tranLists = data.data;
          console.log(this.tranLists);
        }

      }, err => { console.log(err) }
      )

    let lis = document.getElementById('chooseBox').style.top = '0';//为了兼容下拉刷新top的值改变

  }

  /**
   * 上拉刷新执行的加载方法
   */
  getInfiniteLists() {

    this.api.tranRecordList(0, 1, this.num, this.tranType)
      .map(data => data.json())
      .subscribe(
      data => {

        if (data.code == '000000') {
          this.infinite.complete();//停止上拉刷新
          this.tranLists = data.data;
          console.log(this.tranLists);
          // 判断显示没有更多了
          if (this.tranLists.length < this.num) {
            this.noMore = true;
            this.isInfinite = false;
          }
        }

      }, err => { console.log(err) }
      )
  }

  /**
   * 获取列表
   */
  getLists(type, id) {

    this.tranType = type;//为上拉刷新绑定类型
    this.num = 15;//初始化加载条数

    this.api.tranRecordList(0, 1, 15, type)
      .map(data => data.json())
      .subscribe(
      data => {
        if (data.code == '000000') {
          this.tranLists = data.data;
          console.log(this.tranLists);
        }

      }, err => { console.log(err) }
      )

    this.changeChoose(id);
    // 判断显示筛选框
    this.choose = false;
    this.noMore = false;
    this.isInfinite = true;
  }


  /**
   * 选择类型后的样式js
   */
  changeChoose(id) {
    if (this.choose) {

      // 每次选择类型回到顶部
      let element = document.getElementById("topest");
      if (element) {
        element.scrollIntoView();
      }
    }

    let lis = document.getElementById('chooseBox').getElementsByTagName('li');

    for (var i = 0; i < lis.length; i++) {
      lis[i].className = '';
    }

    let doneLi = document.getElementById(id);
    doneLi.className = 'done';
  }


  //隐藏模态框
  recode_hide(){
    this.choose=false;
  }


}
