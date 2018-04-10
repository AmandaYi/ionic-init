import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import  {SERVER_URL }  from '../../providers/constants/constants';
import { NativeServiveProvider } from '../../providers/native-servive/native-servive';
 

@IonicPage({
  name:'MoreBulletinPage'
})
@Component({
  selector: 'page-more-bulletin',
  templateUrl: 'more-bulletin.html',
})
export class MoreBulletinPage {

  public index:number=1; //显示页数--

  public size:number=10;  //显示条数--

  public  list_all=[];    //全部内容
  
  public  list_id=[];
  
   
  public loading_jugde:Boolean=true; //判断页面下拉功能是否隐藏；

  public id_jugde:Boolean=true; //根据id是否相同判断下拉是否可以继续；

  public list_content=[];
 


  public wrong='抱歉，服务器显示错误。请稍后再试...';

     //下拉刷新
 doRefresh(refresher){    
  setTimeout(() => {
    this.index=1;
     //下拉刷新中启动;  重新启动this.list()方法, 保持10条数
     this.list(this.index);
     this.loading_jugde=true;  
     this.id_jugde=true;  
     refresher.complete();
      }, 500);
    }

    //上啦加载
   doInfinite(infiniteScroll) {
    
     if(this.id_jugde==true) {
     setTimeout(() => { 
    this.index++;
     this.list_more(this.index);
     console.group('从发现页面接受到的值');
     console.log(this.index);
     console.groupEnd();
     infiniteScroll.complete();
   },300);
   } else{
     setTimeout(() => {    
       this.loading_jugde=false;
       infiniteScroll.complete();
     },300);
   }
 }

  constructor(public navCtrl: NavController, public navParams: NavParams,public api:ApiServiceProvider,
    public appurl:NativeServiveProvider) {
  }
  ionViewWillEnter(){
    this.list(this.index);
  }
   list(index){
     let id =[];
    this.api.findNoticeAll(index)
    .map(data=>data.json())
    .subscribe(
      data=>{   
        for(let i=0;i<data.data.length;i++){
            id.push(data.data[i].id);
        }
        this.list_id=id;
        this.list_all=data.data;  
        this.list_content= data.data;
          console.group('更多公告')
          console.log(this.list_all);    
          console.log(this.list_id);        
          console.groupEnd();
         } 
     )
  }

  list_more(index){
    let interim=[];
     this.api.findNoticeAll(index)
   .map(data=>data.json())
   .subscribe(
     data=>{   
          interim=data.data;
      if(data.data!='null'){
      for(let i=0; i<interim.length;i++){ 
        this.list_content.push(interim[i]);      
        }
        this.list_all=this.list_content; 
      
        } else {
          this.id_jugde=false;
          }
          console.group('叠加公告');
          console.log(data.data);
          console.log(this.list_all);    
          console.groupEnd();
         }
      )
    }

    on_list_content(id){
      console.group('点击进入公告详情所需id')
      console.log(id);
      console.groupEnd;
      this.navCtrl.push('BulletinPage',{id:id});           
  }

}