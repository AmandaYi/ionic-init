import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import  {SERVER_URL }  from '../../providers/constants/constants';
import { NativeServiveProvider } from '../../providers/native-servive/native-servive';
 
@IonicPage({
  name:'NavtitleHelpPage'
})
@Component({
  selector: 'page-navtitle-help',
  templateUrl: 'navtitle-help.html',
})
export class NavtitleHelpPage {

  public  help_all=[];  //帮助中心内容

  public show:boolean;

  public  help_title=[];
  public  help_nr=[];

  public Index:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public api:ApiServiceProvider,
    public appurl:NativeServiveProvider) {
      this.help_content();
      
    }

  
  //帮助中心 热门问题
  help_content(){
    this.api.helpHotQA()
    .map(data=>data.json())
    .subscribe(
      data=>{
        for(let i=0; i<data.data.length;i++){
          this.help_title.push(data.data[i].title);
          this.help_nr.push(data.data[i].content);
        } 
        this.help_all=data.data;        
          console.group('帮助中心');
        console.log(this.help_title)
        console.log(this.help_all);
        console.groupEnd;
       }
    )
  }

  isshow(index){
    

    if(this.show){
      this.show=false;
       this.Index=index;
       console.group('true的情况下')
       console.log(this.Index);
       console.log(index);
       console.log(this.show);
       console.groupEnd();       
    }else{
      if(index==this.Index){
      this.show=true;
      this.Index=index+100;
      console.group('false的情况下')
      console.log(this.Index);
      console.log(index);
      console.log(this.show);
      console.groupEnd();     
       }else {
         this.show=false;
        this.Index=index;
        console.group('再次点击，下角标不同情况下')
        console.log(this.Index);
        console.log(index);
        console.log(this.show);
        console.groupEnd();     
      }
    }
   }
   on_classify(type){
    console.group('点击问题分类,获得相应的type')
    console.log(type);
    console.groupEnd();     
    this.navCtrl.push('ClassifyListPage',{type:type});
   }
  
}
