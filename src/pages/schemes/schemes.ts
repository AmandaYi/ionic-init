import { Component,ChangeDetectorRef ,NgZone ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,Content } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';


/**
 * Generated class for the SchemesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'SchemesPage'
})
@Component({
  selector: 'page-schemes',
  templateUrl: 'schemes.html',
})
export class SchemesPage {

 @ViewChild(Content) content: Content;
 @ViewChild('one') stickone;
 @ViewChild('two') sticketwo;
 @ViewChild('three') stickhree;
  public arrss1:any;            //已回款的重装数据
  public arrss2:any;            //未回款的重装数据
  public reserve1:any;          //已回款的总数金额
  public reserve2:any;          //未回款的总数金额

  public newdate:any;           //2017-05
  public newdated:any;          //截取（05）
  public newdated3:any;         //截取（2017）
  public newdated4:any;         //获取日期（2017年11月）

  public title:any;             //回款的标题
  public type:any;              //回款的类型
  public money:any;             //回款的金额
  public dsStatus:any;          //回款的操作

  public left:any;              //左开始的坐标
  public right:any;             //右开始的坐标
  public top:any;
  public bottom:any;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public api:ApiServiceProvider,
     public cd:ChangeDetectorRef
     ) {
  }

  ionViewDidLoad() {
    this.content.ionScroll.subscribe(($event: any) => {
        // console.log($event);
        // console.log($event.scrollTop)
        // this.ngzone.run(() => {//如果在页面滑动过程中对数据进行修改，页面是不会重构的。所以在对应的操作中需要使用如下方法，使页面能够重构。
        //     $event.scrollTop;//当前滑动的距离
        //     console.log($event.scrollTop);
        //     this.stickone.nativeElement//获取html中标记为one的元素
        //     this.sticktwo.nativeElement//获取html中标记为two的元素
        //     this.stickthree.nativeElement//获取html中标记为three的元素
        // })
    })
}



  //返回上一页
  return(){
    this.navCtrl.pop();
  }

  //数组重装
  reinstall(res){
     let arrs1 = [];
     let arrs2 = [];
     let arrss1 = [];
     let arrss2 = [];
      // 迭代循环函数
      for (let id = 0; id < 31; id++) {
          arrs1[id] = [];
          for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].receiveDate.substr(8, 2) < 10) {
                  if ((id + 1) == res.data[i].receiveDate.substr(9, 1) && res.data[i].dsStatus == '已收') {
                      let f = res.data[i].F01;
                      let receiveDate = res.data[i].receiveDate;
                      let title = res.data[i].title;
                      let titleShort = res.data[i].titleShort;
                      let type = res.data[i].type;
                      let money = res.data[i].money;
                      if (res.data[i].dsStatus == "已收") {
                          res.data[i].dsStatus = "已回款";
                      } else {
                          res.data[i].dsStatus = "未回款";
                      }
                      let dsStatus = res.data[i].dsStatus;
                      let currentPage = res.data[i].currentPage;
                      let pageCount = res.data[i].pageCount;
                      //把后台各个数据，存在单独的json
                      let BigData = { "F01": f, "receiveDate": receiveDate, "title": title, "titleShort": titleShort, "type": type, "money": money, "dsStatus": dsStatus, "currentPage": currentPage, "pageCount": pageCount };
                      arrs1[id].push({ "BigData": BigData, "time": receiveDate });
                  }
              }


              if (res.data[i].receiveDate.substr(8, 2) == 10) {
                  if ((id + 1) == res.data[i].receiveDate.substr(8, 2) && res.data[i].dsStatus == '已收') {
                      let f = res.data[i].F01;
                      let receiveDate = res.data[i].receiveDate;
                      let title = res.data[i].title;
                      let titleShort = res.data[i].titleShort;
                      let type = res.data[i].type;
                      let money = res.data[i].money;
                      if (res.data[i].dsStatus == "已收") {
                          res.data[i].dsStatus = "已回款";
                      } else {
                          res.data[i].dsStatus = "未回款";
                      }
                      let dsStatus = res.data[i].dsStatus;
                      let currentPage = res.data[i].currentPage;
                      let pageCount = res.data[i].pageCount;
                      //把后台各个数据，存在单独的json
                      let BigData = { "F01": f, "receiveDate": receiveDate, "title": title, "titleShort": titleShort, "type": type, "money": money, "dsStatus": dsStatus, "currentPage": currentPage, "pageCount": pageCount };
                      arrs1[id].push({ "BigData": BigData, "time": receiveDate });
                  }
              }


              if (res.data[i].receiveDate.substr(8, 2) > 10) {
                  if ((id + 1) == res.data[i].receiveDate.substr(8, 2) && res.data[i].dsStatus == '已收') {
                      let f = res.data[i].F01;
                      let receiveDate = res.data[i].receiveDate;
                      let title = res.data[i].title;
                      let titleShort = res.data[i].titleShort;
                      let type = res.data[i].type;
                      let money = res.data[i].money;
                      if (res.data[i].dsStatus == "已收") {
                          res.data[i].dsStatus = "已回款";
                      } else {
                          res.data[i].dsStatus = "未回款";
                      }
                      let dsStatus = res.data[i].dsStatus;
                      let currentPage = res.data[i].currentPage;
                      let pageCount = res.data[i].pageCount;
                      //把后台各个数据，存在单独的json
                      let BigData = { "F01": f, "receiveDate": receiveDate, "title": title, "titleShort": titleShort, "type": type, "money": money, "dsStatus": dsStatus, "currentPage": currentPage, "pageCount": pageCount };
                      arrs1[id].push({ "BigData": BigData, "time": receiveDate });
                  }
              }

          }
      }
      for (let gd = 0; gd < 31; gd++) {
          arrs2[gd] = [];
          for (let j = 0; j < res.data.length; j++) {

              if (res.data[j].receiveDate.substr(8, 2) < 10) {
                  if ((gd + 1) == res.data[j].receiveDate.substr(9, 1) && res.data[j].dsStatus == '待收') {
                      let f = res.data[j].F01;
                      let receiveDate = res.data[j].receiveDate;
                      let title = res.data[j].title;
                      let titleShort = res.data[j].titleShort;
                      let type = res.data[j].type;
                      let money = res.data[j].money;
                      if (res.data[j].dsStatus == "待收") {
                          res.data[j].dsStatus = "未回款";
                      }
                      let dsStatus = res.data[j].dsStatus;
                      let currentPage = res.data[j].currentPage;
                      let pageCount = res.data[j].pageCount;
                      //把后台各个数据，存在单独的json
                      let BigData = { "F01": f, "receiveDate": receiveDate, "title": title, "titleShort": titleShort, "type": type, "money": money, "dsStatus": dsStatus, "currentPage": currentPage, "pageCount": pageCount };
                      arrs2[gd].push({ "BigData": BigData, "time": receiveDate });
                  }
              }


              if (res.data[j].receiveDate.substr(8, 2) == 10) {
                  if ((gd + 1) == res.data[j].receiveDate.substr(8, 2) && res.data[j].dsStatus == '待收') {
                      let f = res.data[j].F01;
                      let receiveDate = res.data[j].receiveDate;
                      let title = res.data[j].title;
                      let titleShort = res.data[j].titleShort;
                      let type = res.data[j].type;
                      let money = res.data[j].money;
                      if (res.data[j].dsStatus == "待收") {
                          res.data[j].dsStatus = "未回款";
                      }
                      let dsStatus = res.data[j].dsStatus;
                      let currentPage = res.data[j].currentPage;
                      let pageCount = res.data[j].pageCount;
                      //把后台各个数据，存在单独的json
                      let BigData = { "F01": f, "receiveDate": receiveDate, "title": title, "titleShort": titleShort, "type": type, "money": money, "dsStatus": dsStatus, "currentPage": currentPage, "pageCount": pageCount };
                      arrs2[gd].push({ "BigData": BigData, "time": receiveDate });
                  }
              }


              if (res.data[j].receiveDate.substr(8, 2) > 10) {
                  if ((gd + 1) == res.data[j].receiveDate.substr(8, 2) && res.data[j].dsStatus == '待收') {
                      let f = res.data[j].F01;
                      let receiveDate = res.data[j].receiveDate;
                      let title = res.data[j].title;
                      let titleShort = res.data[j].titleShort;
                      let type = res.data[j].type;
                      let money = res.data[j].money;
                      if (res.data[j].dsStatus == "待收") {
                          res.data[j].dsStatus = "未回款";
                      }
                      let dsStatus = res.data[j].dsStatus;
                      let currentPage = res.data[j].currentPage;
                      let pageCount = res.data[j].pageCount;
                      //把后台各个数据，存在单独的json
                      let BigData = { "F01": f, "receiveDate": receiveDate, "title": title, "titleShort": titleShort, "type": type, "money": money, "dsStatus": dsStatus, "currentPage": currentPage, "pageCount": pageCount };
                      arrs2[gd].push({ "BigData": BigData, "time": receiveDate });
                  }
              }
          }
      }

      //重组过后的json数据
      // this.arrs=arrs;
      // console.log(arrs);               //包括没有数据添加
      for (let z = 0; z < arrs1.length; z++) {
          if (arrs1[z].length > 0) { //只要是拿来重装数组
              arrss1.push(arrs1[z]);
          }
      }

      for (let l = 0; l < arrs2.length; l++) {
          if (arrs2[l].length > 0) { //只要是拿来重装数组
              arrss2.push(arrs2[l]);
          }
      }

      this.arrss1 = arrss1; //已回款
      this.arrss2 = arrss2; //未回款

      console.log(arrs1);
      console.log(arrs2);

  }

  //请求后台数据
  all_data(val_1,val_2,ref){
    this.api.backMoneyCalendar(val_1,val_2).map(data => data.json()).subscribe(res => {
       console.log(res);
       console.log(ref);
      if (res.code == "000000") {
          this.reserve1 = res.reserve;
          this.reserve2 = res.reserve2;
          this.reinstall(res);//数组重装

          if(ref){
              ref.complete();
          }else{
              console.log(123)
          } 

      }; 
    });
  }

    //进入页面
  ionViewWillEnter(){
    this.getNowFormatDate();
  }

   //获取当前的时间年和月---》2017-05
   getNowFormatDate(){
      let date = new Date();
      let seperator1 = "-";
      let month = date.getMonth() + 1;
      let monthed;
      if (month >= 1 && month <= 9) {
          monthed ='0'+month ;
      }else{
          monthed=month;
      }
      let currentdate = `${date.getFullYear()}${ seperator1 }${ monthed }`; 

      this.newdate=currentdate;                                    //2017-11
      this.newdated=this.newdate.substr(5, 2);                     //截取（11）
      this.newdated3=this.newdate.substr(0, 4);                    //截取（2017）
      this.newdated4=`${this.newdated3}年${this.newdated}月`;      //获取日期（2017年11月）

      console.log(this.newdated)

      this.all_data(this.newdate,this.newdate,'');
   }


   // 向左的公共方法
   zuo(){
       if (this.newdated == 1) {
            this.newdated3--;
            this.newdated = 13;
        }
        this.newdated--;
        console.log(this.newdated)

        if (this.newdated < 10) {
            this.newdated =`0${this.newdated}`;
            this.newdate =`${this.newdated3}-${this.newdated}`;
            this.newdated4=`${this.newdated3}年${this.newdated}月`;   //获取日期（2017年11月）
            this.all_data(this.newdate,this.newdate,'')
        } 
        else if (this.newdated == 10) {
            this.newdate =`${this.newdated3}-${this.newdated}`;
            this.newdated4=`${this.newdated3}年${this.newdated}月`;   //获取日期（2017年11月）
            this.all_data(this.newdate,this.newdate,'')
        } 
        else {
            this.newdate =`${this.newdated3}-${this.newdated}`;
            this.newdated4=`${this.newdated3}年${this.newdated}月`;   //获取日期（2017年11月）
            this.all_data(this.newdate,this.newdate,'')
        }
   }


   // 向右的公共方法
   you(){
       if (this.newdated == 12) {
            this.newdated3++;
            this.newdated = 0;
        }
        this.newdated++;
        console.log(this.newdated)

        if (this.newdated < 10) {
            this.newdated =`0${this.newdated}`;
            this.newdate =`${this.newdated3}-${this.newdated}`;
            this.newdated4=`${this.newdated3}年${this.newdated}月`;   //获取日期（2017年11月）
            this.all_data(this.newdate,this.newdate,'')
        } 
        else if (this.newdated == 10) {
            this.newdate =`${this.newdated3}-${this.newdated}`;
            this.newdated4=`${this.newdated3}年${this.newdated}月`;   //获取日期（2017年11月）
            this.all_data(this.newdate,this.newdate,'')
        } 
        else {
            this.newdate =`${this.newdated3}-${this.newdated}`;
            this.newdated4=`${this.newdated3}年${this.newdated}月`;   //获取日期（2017年11月）
            this.all_data(this.newdate,this.newdate,'')
        }
   }

   //点向左按钮的
   goPreMonth(){
       this.zuo();
   }

   //点向右按钮的
   goNextMonth(){
       this.you();
   }


   swipeEvnet(e){
       if(e.direction==2){
            this.you();
       }else if(e.direction==4){
            this.zuo();
       }
   }

   //下拉刷新
   doRefresh(refresher) {
     this.all_data(this.newdate,this.newdate,refresher);            //2017-11
   }






}
