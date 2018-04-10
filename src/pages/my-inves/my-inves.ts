import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

/**
 * Generated class for the MyInvesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'MyInvesPage'
})
@Component({
  selector: 'page-my-inves',
  templateUrl: 'my-inves.html',
})
export class MyInvesPage implements OnInit {
  public change:any;            //选项
  public huikuan_list:any;      //回款数组数据
  public jieqing_list:any;      //结清数组数据
  public toubiao_list:any;      //投标数组数据

  public isdata_1:boolean;      //回款是否有数据
  public isdata_2:boolean;      //结清是否有数据
  public isdata_3:boolean;      //投标是否有数据

  public pageIndex_1:number;    //回款中页数
  public pageIndex_2:number;    //结清中页数
  public pageIndex_3:number;    //投标中页数

  public scroll_first:boolean;  //回款上拉刷新
  public scroll_two:boolean;    //结清上拉刷新
  public scroll_three:boolean;  //投标上拉刷新

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api:ApiServiceProvider
    ) {
  }

  ngOnInit() {
  //  this.change='huikuan';
  //  this.huikuan_data(1,'','');
  //  this.scroll_first=true;
  //  this.scroll_two=true;
  //  this.scroll_three=true;
  //  this.pageIndex_1=1;
  if(this.navParams.get('type')==0){
         this.change='toubiao';
         this.toubiao_data(1,'','');
         this.scroll_first=true;
         this.scroll_two=true;
         this.scroll_three=true;
         this.pageIndex_3=1;
    }else{
        this.change='huikuan';
        this.huikuan_data(1,'','');
        this.scroll_first=true;
        this.scroll_two=true;
        this.scroll_three=true;
        this.pageIndex_1=1;
    }
  }

  //进入页面
  ionViewWillEnter(){
    // if(this.navParams.get('type')==0){
    //      this.change='toubiao';
    //      this.toubiao_data(1,'','');
    //      this.scroll_first=true;
    //      this.scroll_two=true;
    //      this.scroll_three=true;
    //      this.pageIndex_3=1;
    // }else{
    //     this.change='huikuan';
    //     this.huikuan_data(1,'','');
    //     this.scroll_first=true;
    //     this.scroll_two=true;
    //     this.scroll_three=true;
    //     this.pageIndex_1=1;
    // }
  }

  //返回上一页
  return(){
    this.navCtrl.popToRoot();
    // this.navCtrl.parent.select(3);
  }

  //回款中
  go_huikuan(){
    this.huikuan_data(this.pageIndex_1=1,'','');
  }

  //结清中
  go_jieqing(){
    this.jieqing_data(this.pageIndex_2=1,'','');
  }

  //投标中
  go_toubiao(){
    this.toubiao_data(this.pageIndex_3=1,'','');
  }

  //回款接口
  huikuan_data(index,e1,e2){
    this.api.myCreditorList(3,index,10).map(data => data.json()).subscribe(data => {
      if(data.code=='000000'){
        console.log(data.data);
        console.log(index);
        if(data.data.length>0){
          if(e1){
            this.huikuan_list=data.data;
            this.scroll_first=true;
            e1.complete();
          }else if(e2){
            this.huikuan_list=this.huikuan_list.concat(data.data);
            this.scroll_first=true;
            e2.complete();
          }else{
             this.huikuan_list=data.data;
             this.scroll_first=true;
             this.isdata_1=true;
          }
        }else{
          if(e1){
             e1.complete();
          }else if(e2){
             this.scroll_first=false;
          }else{
             this.isdata_1=false;
          }
        }
      }else{
        console.log('服务器没有')
      }
    });
  }


  //结清接口
  jieqing_data(index,e1,e2){
    this.api.myCreditorList(2,index,10).map(data => data.json()).subscribe(data => {
       if(data.code=='000000'){
        console.log(data.data);
        console.log(index);
        if(data.data.length>0){
          if(e1){
            this.jieqing_list=data.data;
            this.scroll_two=true;
            e1.complete();
          }else if(e2){
            this.jieqing_list=this.jieqing_list.concat(data.data);
            this.scroll_two=true;
            e2.complete();
          }else{
             this.jieqing_list=data.data;
             this.scroll_two=true;
             this.isdata_2=true;
          }
        }else{
           if(e1){
             e1.complete();
            }else if(e2){
              this.scroll_two=false;
            }else{
              this.isdata_2=false;
            }
        }
      }else{
        console.log('服务器没有')
      }
    });
  }

  //投标接口
  toubiao_data(index,e1,e2){
    this.api.myCreditorList(1,index,10).map(data => data.json()).subscribe(data => {
      if(data.code=='000000'){
        console.log(data.data);
        console.log(index);
        if(data.data.length>0){
           if(e1){
            this.toubiao_list=data.data;
            this.scroll_three=true;
            e1.complete();
          }else if(e2){
            this.toubiao_list=this.toubiao_list.concat(data.data);
            this.scroll_three=true;
            e2.complete();
          }else{
             this.toubiao_list=data.data;
             this.scroll_three=true;
             this.isdata_3=true;
          }

        }else{
           if(e1){
              e1.complete();
            }else if(e2){
              this.scroll_three=false;
            }else{
              this.isdata_3=false;
            }
        }
      }else{
        console.log('服务器没有')
      }
    });
  }

  //回款下拉刷新
  doRefresh1(e){
     this.huikuan_data(this.pageIndex_1=1,e,'');
  }

  //结清下拉刷新
  doRefresh2(e){
     this.jieqing_data(this.pageIndex_2=1,e,'');
  }

  //投标下拉刷新
  doRefresh3(e){
    this.toubiao_data(this.pageIndex_3=1,e,'');
  }

  //回款上啦加载
  doInfinite1(e){
    this.huikuan_data(++this.pageIndex_1,'',e);
  }

  //结清上啦加载
  doInfinite2(e){
    this.jieqing_data(++this.pageIndex_2,'',e)
  }

   //投标上啦加载
  doInfinite3(e){
     this.toubiao_data(++this.pageIndex_3,'',e)
  }


  //点击各自的详情页
  toMyInvesDetail(id, zqid){
      this.navCtrl.push('MyInvesDetailPage',{id: id, zqid: zqid})
  }

}
