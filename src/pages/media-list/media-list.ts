import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeServiveProvider } from '../../providers/native-servive/native-servive';
import { SERVER_URL } from '../../providers/constants/constants';

@IonicPage({
  name: 'MediaListPage'
})
@Component({
  selector: 'page-media-list',
  templateUrl: 'media-list.html',
})
export class MediaListPage {

  public type;  //区分是媒体还是公司； 
  public index: number = 1; //显示页数--
  public size: number = 10;  //显示条数--

  public list_all = [];    //全部内容

  public list_size: number;  //得出id总条数；以此判断上拉加载的极限

  public size_jugde: Boolean = true; //判断上拉加载

  public jugde: Boolean; //判断list是否有值

  public wrong = '抱歉，服务器显示错误。请稍后再试...';



  //下拉刷新
  doRefresh(refresher) {
    setTimeout(() => {
      this.size = 10;
      this.list_size = 10;
      //下拉刷新中启动;  重新启动this.list()方法, 保持10条数
      this.list(this.type, this.index, this.size);
      this.size_jugde = true;
      refresher.complete();
    }, 300);

  }

  //上啦加载
  doInfinite(infiniteScroll) {
    let ten = 10;             //每次上啦添加10个
    let nowsize = this.list_size;   //统计未执行时的次数。。为之后判断结尾做伏笔;

    if (this.size <= nowsize) {
      setTimeout(() => {
        this.size = nowsize + ten;
        this.list_size = nowsize + ten;
        this.list(this.type, this.index, this.size);
        console.group('从发现页面接受到的值');
        console.log(this.size);
        console.log(nowsize);
        console.log(this.list_size);
        console.groupEnd();
        infiniteScroll.complete();
      }, 300);
    } else {
      setTimeout(() => {
        this.size_jugde = false;
        infiniteScroll.complete();
      }, 300);
    }
  }


  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiServiceProvider,
    public appurl: NativeServiveProvider) {
  }
  ionViewWillEnter() {
    const type_value = this.navParams.get('type');  //接受发现页面传过来的：type类型；

    this.type = type_value;
    console.group('从发现页面接受到的值')
    console.log(type_value);
    console.groupEnd();

    this.list(type_value, this.index, this.size);
  }


  //媒体报道和公司报道列表
  list(type, index, size) {
    this.api.indexServiceInfoList(type, index, size)
      .map(data => data.json())
      .subscribe(
      data => {
        if (type != null && type != undefined) {
          for (var i = 0; i < data.data.length; i++) {
            data.data[i].picUrl = SERVER_URL + data.data[i].picUrl;
          }
          this.list_all = data.data;
          this.jugde = true;
          this.list_size = data.data.length;
          console.group('媒体或公司报道列表')
          console.log(this.list_all);
          console.log(this.list_size);
          console.groupEnd();
        } else {
          this.jugde = false;
          console.group('媒体或公司报道列表')
          console.log(this.wrong)
          console.groupEnd();
        }
      }
      )
  }



  on_list_content(id) {
    let page = { id: id, type: this.type };
    console.group('从发现页面接受到的id值')
    console.log(page);
    console.groupEnd();
    this.navCtrl.push('MediaCompanyPage', page);
  }

}
