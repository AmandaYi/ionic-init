import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { SERVER_URL } from '../../providers/constants/constants';
import { NativeServiveProvider } from '../../providers/native-servive/native-servive';
@IonicPage({
  name: 'MediaCompanyPage'
})
@Component({
  selector: 'page-media-company',
  templateUrl: 'media-company.html',
})
export class MediaCompanyPage {


  //测试值
  public type;

  //媒体报道和公司动态
  public media_title;   //媒体标题
  public media_time;    //媒体时间
  public media_all;  //媒体内容
  public media_piture;   //媒体图

  // public img_src; //获取其content里的图片元素

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiServiceProvider,
    public appurl: NativeServiveProvider) {
  }
  ionViewWillEnter() {
    let type_value = this.navParams.get('type');  //接受发现页面传过来的：页面类型 GSDT=动态详情，MTBD=报道详情
    let id_value = this.navParams.get('id');  //接受发现页面传过来的：id
    this.type = type_value;

    console.group('media接受的值')
    console.log(type_value);
    console.log(id_value);
    console.log(this.type);
    console.groupEnd();

    this.media_company(type_value, id_value);
  }



  //媒体报道和公司报道内容
  media_company(type, id) {
    this.api.indexServiceInfoOne(type, id)
      .map(data => data.json())
      .subscribe(
      data => {
        this.media_title = data.data.title;
        this.media_time = data.data.releaseTime;
        this.media_all = data.data.content;
        console.group('媒体报道和公司报道内容')
        console.log(data.data);
        console.groupEnd();
      })
  }

  // 组件视图脏检查完成之后
  ngAfterViewChecked() {
    var img = document.querySelector(".media_content").getElementsByTagName("img");
    // console.group('获取content里的图片元素')     
    //  console.log(img.length);  
    // console.groupEnd();      
    //判断一个字符串有多少字串
    function isContains(str, substr) {
      return str.indexOf(substr) >= 0;
    };
    if (img != null && img != undefined && img.length != 0) {

      for (let i = 0; i < img.length; i++) {
        //拼接
        if (isContains(img[i].src, "/app")) {
          let img_before = img[i].src.split("/app")[0];
          let img_after = img[i].src.split("/app")[1];
          if (img_before != 'https://www.rongyudai.cn') {
            img_before = 'https://www.rongyudai.cn';
          }
          img[i].src = img_before + "/app" + img_after;
          console.group('获取img[i]里的src内容');
          console.log(img[i].src);
          console.groupEnd();
        }
      }
    }
    var label = document.querySelector(".media_content").getElementsByTagName("a");
    console.group('获取content里的a元素')
    console.log(label.length);
    console.groupEnd();

    if (label != null && label != undefined && label.length != 0) {
      for (let i = 0; i < label.length; i++) {
        label[i].href = "javascript:;";
      }
    }
  }
}
