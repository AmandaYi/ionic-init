import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
  

@IonicPage({
name:'ClassifyListPage'
  })
@Component({
  selector: 'page-classify-list',
  templateUrl: 'classify-list.html',
})
export class ClassifyListPage {

    public index:number=1; //页数
    public size:number=20; //条数
    public types;         //复制获取的type类型
    public list_all=[];   //全部内容

    public show:boolean;
    public Index:any;

  constructor(public navCtrl: NavController, public navParams: NavParams ,public api:ApiServiceProvider
    ) {
    let type_value =this.navParams.get('type');  //接受帮助中心页面传过来的：页面类型  
   
        if (type_value == "TZYHK") {
        this.types = '投资安全';
      } else if (type_value == "CZYTX") {
        this.types = '充值提现';
      } else if (type_value == "ZCYDL") {
        this.types = '注册登录';
      } else if (type_value == "JHYHH") {
        this.types = '借款回款';
      } else if (type_value == "LXHFY") {
        this.types = '利息费用';
      } else if (type_value == "ZQZR") {
        this.types = '债权转让';
      } else if (type_value == "HDDY") {
        this.types = '投资攻略';
      } else if (type_value == "MCJS") {
        this.types = '名词解释';
      };

      console.group('从帮助中心获取的type');
      console.log(type_value);
      console.log(this.types);
      console.groupEnd();
      this.help_list(type_value,this.size,this.index);
  }
  //list帮助中心传过来的数据
    help_list(type,size,index){
      this.api.helpAllQA(type,size,index)
      .map(data=>data.json())
      .subscribe(data=>{
        this.list_all=data.data;
        console.group('列表');
        console.log(data.data);
        console.groupEnd();
      })
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

      // 组件视图脏检查完成之后
  ionViewDidEnter	() {
    var img = document.querySelectorAll("img");
  
    console.group('获取content里的图片元素')     
    console.log(img);
    console.log(img.length);  
    console.groupEnd();      
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
      console.log(img_before);
      console.log(img_after);
      console.log( img[i].src);
      console.groupEnd(); 
      }
    }
}


//A标签
// var label = document.querySelectorAll("a");
// console.group('获取content里的a元素')     
// console.log(label);
// console.log(label.length);  
// console.groupEnd();    

// if(label!=null&&label!=undefined&&label.length!=0){
//   for (let i = 0; i < label.length; i++) {
//       label[i].href = "javascript:;";
//     }
//   }


 }

}
