import { NativeServiveProvider } from './../../providers/native-servive/native-servive';
import { ApiServiceProvider } from './../../providers/api-service/api-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'MessagePage'
})
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  show: boolean = false;//顶部已读和未读的显示隐藏
  messages: any = [];//消息列表数组
  changeClass: string = '';//点击阅读改变类名样式
  isInfinite: boolean = true;//判断是否允许上拉刷新
  noMore: boolean = false;
  num: number = 10;//页面加载条数

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiServiceProvider,
    public native: NativeServiveProvider
  ) {
  }


  isShow() {
    this.show = !this.show;
  }

  ionViewWillEnter() {
    this.num=10;
    if (this.show) {
      this.getMessage('YD', this.num);

    } else {
      this.getMessage('WD', this.num);
    }
    // console.log('消息中心');
    // this.getMessage('WD', 10);
  }

  /**
   * 下拉刷新
   */
  doRefresh($event) {
    this.ionViewWillEnter();
    setTimeout(function () {
      $event.complete();
    }, 500);
  }

 
  /**
   * 上拉刷新
   * 
   */
  doInfinite($event) {

    if (!this.show) {
    this.num = this.num + 10;

    this.getMessage('WD', this.num);

    setTimeout(function () {
      $event.complete();
    }, 500);

     // 判断上拉刷新是否允许
     if (this.messages.length < this.num) {
      this.noMore = false;
    }
    
  }else {
    this.num = this.num + 10;

    this.getMessage('YD', this.num);

    setTimeout(function () {
      $event.complete();
    }, 500);

     // 判断上拉刷新是否允许
     if (this.messages.length < this.num) {
      this.noMore = false;
    }

  }
}

  /**
   * 未读
   */
  unRead() {
    if (this.show) {
      this.getMessage('WD', 10);
      this.num = 10;
      this.isInfinite = true;

      // 每次选择类型回到顶部
      // let element = document.getElementById("topest");
      // if (element) {
      //   element.scrollIntoView();
      // }
    }
    this.show = false;
  }

  /**
   * 已读
   */
  isRead() {
    if (!this.show) {
      this.getMessage('YD', 10);
      this.num = 10;
      this.isInfinite = true;

      // 每次选择类型回到顶部
      // let element = document.getElementById("topest");
      // if (element) {
      //   element.scrollIntoView();
      // }
    }
    this.show = true;
  }

  /**
   * 获取消息列表
   * @param status 
   * @param num 
   */
  getMessage(status, num) {
    this.api.messagesList(status, num)
      .map(data => data.json())
      .subscribe(
      data => {
        this.messages = data.data;
        console.log(this.messages);

        // 判断上拉刷新是否允许
        if (this.messages.length < this.num) {
          this.isInfinite = false;
        }

      }, err => {
        this.native.showToast('服务器连接错误,请稍候重试');
      }
      )



  }


  /**
   * 查看详情
   * @param id 
   */
  detail(id) {
    if (this.show) {
      this.doneDetail(id);

    } else {
      this.unDetail(id);
    }
  }

  /**
   * 查看未读详情
   */
  unDetail(id) {

    // 点击改变样式
    let i = document.getElementById(id);
    let dis = i.getElementsByTagName('div')[0];
    let thisClass = i.className;

    if (!thisClass) {
      this.changeClass = 'open';
      dis.style.display = 'block';

      // 点击改为已读
      this.api.readLetter(id)
        .subscribe(
        data => { console.log(data) }
        )

    } else if (thisClass == 'open') {
      this.changeClass = 'down';
      dis.style.display = 'none';
    } else if (thisClass == 'down') {
      this.changeClass = 'open';
      dis.style.display = 'block';
    }

    i.className = this.changeClass;
  }

  /**
   * 查看已读详情
   */
  doneDetail(id) {
    console.log(id);

    // 点击改变样式
    let i = document.getElementById(id);
    let dis = i.getElementsByTagName('div')[0];
    let thisClass = i.className;

    if (!thisClass) {
      this.changeClass = 'open';
      dis.style.display = 'block';

    } else if (thisClass == 'open') {
      this.changeClass = '';
      dis.style.display = 'none';
    }

    i.className = this.changeClass;
  }
}
