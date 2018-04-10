import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

/**
 * Generated class for the HytjPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:"HytjPage"
})
@Component({
  selector: 'page-hytj',
  templateUrl: 'hytj.html',
})
export class HytjPage {
  public data_1:any;                //邀请注册人数
  public data_2:any;                //已投资人数

  public pageindex:any;             //刷新的页数
  public all_list:any;              //获取好友数组的数据

  public shangla:boolean;             //上啦刷新
  public wujilu:boolean;              //暂无记录
  public moredata1:boolean;           //没有更多了
  public moredata2:boolean;           //上啦加载更多

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public api:ApiServiceProvider
     ) {
  }

  //返回上一页
  return(){
    this.navCtrl.pop();
  }

      //进入页面
  ionViewWillEnter(){
    this.all_data();
  }


  //获取所有的数据
  all_data(){
    //邀请注册数和投资人数
   this.yaoqing_data();

   //好友数组
   this.haoyou_data(this.pageindex=1,'','');
  }


  //邀请注册数和投资人数
  yaoqing_data(){
     this.api.inviteFriends().map(data => data.json()).subscribe(data => {
      if(data.code='000000'){
        this.data_1=data.data.yqCount;
        this.data_2=data.data.yxyqCount;
      }else{
        console.log('无数据')
      }
    })
  }

  //好友数组
  haoyou_data(pageindex,e1,e2){
      this.api.countFriends(pageindex,10).map(data => data.json()).subscribe(data => {
        if(data.data.length>0){
          if(e1){
            this.all_list=data.data;
            e1.complete();
          }else if(e2){
            this.all_list= this.all_list.concat(data.data);
            e2.complete();
          }else{
            this.all_list=data.data;
          }
          this.shangla=true;
          this.wujilu=false;
          this.moredata1=false;
          this.moredata2=true;
        }else{
          if(e1){
            e1.complete();

          }else if(e2){

          }else{

          }
          this.shangla=false;
          this.wujilu=true;
          this.moredata1=false;
          this.moredata2=false;
        }
      })
  }

  //上啦刷新
  doRefresh(e){
     this.haoyou_data(this.pageindex=1,e,'');
  }

  //下拉加载
  doInfinite(e){
    this.haoyou_data(++this.pageindex,'',e);
  }

}
