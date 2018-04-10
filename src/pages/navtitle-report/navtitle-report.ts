import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import  {SERVER_URL }  from '../../providers/constants/constants';
import { NativeServiveProvider } from '../../providers/native-servive/native-servive';
 
 
@IonicPage({
  name:'NavtitleReportPage'
})
@Component({
  selector: 'page-navtitle-report',
  templateUrl: 'navtitle-report.html',
})
export class NavtitleReportPage {

  public report_all=[];  //运营报告数据

  public judge_report:Boolean =true; //运营页面判断是否有数据..
  constructor(public navCtrl: NavController, public navParams: NavParams,public api:ApiServiceProvider,
    public appurl:NativeServiveProvider) {
      this.report();
  }

  //运营报告
  report(){
   this.api.indexReport()
   .map(data=>data.json())
   .subscribe(
     data=>{
      if(data.data!=null&&data.data!=undefined){
      for (let i = 0; i < data.data.length; i++) {
          data.data[i].picUrl=SERVER_URL+data.data[i].picUrl;
          this.report_all.push(data.data[i]);
        }
       console.group('运营报告')
       console.log(data.data);
       console.log(this.report_all);
       console.groupEnd;
          this.judge_report==true;
      }else {
          this.judge_report==false;        
        }
     }  
   )
  }
  //跳转
  on_report_pic(url){
    this.appurl.themeable(url);
  }

}
