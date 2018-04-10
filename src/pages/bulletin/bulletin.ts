import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import  {SERVER_URL }  from '../../providers/constants/constants';
import { NativeServiveProvider } from '../../providers/native-servive/native-servive';
@IonicPage({
  name:'BulletinPage'
})
@Component({
  selector: 'page-bulletin',
  templateUrl: 'bulletin.html',
})
export class BulletinPage {

  public bulletin_title;   //公告标题
  public bulletin_time;    //公告时间
  public bulletin_all;  //公告内容
  public bulletin_piture;   //公告图

  constructor(public navCtrl: NavController, public navParams: NavParams,public api :ApiServiceProvider,
    public appurl:NativeServiveProvider) {
  }   
//公告内容
  Bulletin_content(id){
      this.api.findNoticeAll_byId(id)
      .map(data=>data.json())
      .subscribe(
        data=>{
          this.bulletin_title =data.data.title;
          this.bulletin_time  =data.data.releaseTime;
          this.bulletin_all   =data.data.content;
          console.group('公告活动')
          console.log(data.data);    
           console.groupEnd();
         }
      )
  }

    //更多公告
    on_more(){
      this.navCtrl.push('MoreBulletinPage');
    }
    ionViewWillEnter(){
      let id_value  =this.navParams.get('id');  //接受发现页面传过来的：id
       console.group('公告接受的值')
       console.log(id_value);
       console.groupEnd();
      this.Bulletin_content(id_value);
      
    }
   //返回上一页
   return(){
    this.navCtrl.popToRoot();
   }

  // 组件视图脏检查完成之后
  ionViewDidEnter	() {
     var img = document.querySelectorAll("img");
   
    //  console.group('获取content里的图片元素')     
    //  console.log(img.length);  
    //  console.groupEnd();      
     //判断一个字符串有多少字串
     function  isContains(str, substr) {
       return str.indexOf(substr) >= 0;
     };
     if(img!=null&&img!=undefined&&img.length!=0){
      
       for(let i =0; i<img.length; i++){
       //拼接
       if (isContains(img[i].src, "/app")) {
       let img_before = img[i].src.split("/app")[0];
       let img_after  = img[i].src.split("/app")[1];
       if (img_before != 'https://www.rongyudai.cn') {
          img_before = 'https://www.rongyudai.cn';
     }
       img[i].src =img_before+"/app"+img_after;
       console.group('获取img[i]里的src内容');
       console.log( img[i].src);
       console.groupEnd(); 
       }
     }
 }
 var label = document.querySelectorAll("a");
 console.group('获取content里的a元素')     
 console.log(label.length);  
 console.groupEnd();    

 if(label!=null&&label!=undefined&&label.length!=0){
   for (let i = 0; i < label.length; i++) {
       label[i].href = "javascript:;";
     }
   }
  }
} 
