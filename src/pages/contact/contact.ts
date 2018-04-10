import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { SERVER_URL } from '../../providers/constants/constants';
import { NativeServiveProvider } from '../../providers/native-servive/native-servive';
import { QRCodeModule } from 'angular2-qrcode';
import { ViewChild } from '@angular/core';

@IonicPage({
  name: 'ContactPage'
})
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})

export class ContactPage {
  @ViewChild(Slides) slides: Slides;


  public bulletin_new: any[];    //公告
  public bulletin_time;        //公告时间
  public bulletin_title;       //公告标题
  public bulletin_id;        //公告id

  public Company_new: any[]; //公司动态
  public media_up: any[]     //媒体动态

  public hot_activity: any[]; //热门活动

  public network: boolean;

  public yaoqingma: any;        //获取验证码

  /* 图片4章， 因轮播的循环有问题各种问题，采取了分别读取。 轮播for循环可以使用，但本身循环loop有细微缺陷。 排除loop循环的话，可以用for直接输出*/
  /* 媒体和公司动态的图片 */
  public media_P1;
  public media_P2;
  public media_P3;
  public media_P4;

  public company_P1;
  public company_P2;
  public company_P3;
  public company_P4;




  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiServiceProvider,
    public appurl: NativeServiveProvider) {


  }


  ionViewWillEnter() {

    //公告
    this.bulletin_data();
    // 热门活动
    this.activity_data();

    this.network = this.appurl.getnetwork();//获取网络连接结果

  }

  willEnt() {
    this.ionViewWillEnter();
  }

  //佣金数据
  yongjin_data(pageindex, e) {
    this.api.awardCommission(pageindex, 10).map(data => data.json()).subscribe(data => {
      this.yaoqingma = data.reserve;
    })
  }

   


  /**
   * 下拉刷新
   */
  doRefresh(refresher) {
    setTimeout(() => {
       this.ionViewWillEnter();
       refresher.complete();
      });
   }

  //获取公告信息,公司动态和媒体动态
  bulletin_data() {
    this.api.indexServiceInfo()
      .map(data => data.json())
      .subscribe(
      data => {
        data.reserve[0].releaseTime = data.reserve[0].releaseTime.substr(5);
        // 此接口包含了3个json，仔细观察
        //图片加上地址。。
        if (data.reserve2 != 'null' && data.reserve2) {
          for (let i = 0; i < data.reserve2.length; i++) {
            data.reserve2[i].picUrl = SERVER_URL + data.reserve2[i].picUrl;

          }
          this.media_P1 = data.reserve2[0];
          this.media_P2 = data.reserve2[1];
          this.media_P3 = data.reserve2[2];
          this.media_P4 = data.reserve2[3];
        } else {
          console.log('图片没有数据')
        };
        if (data.data != 'null' && data.data) {
          for (let j = 0; j < data.data.length; j++) {
            data.data[j].picUrl = SERVER_URL + data.data[j].picUrl;
          }
          this.company_P1 = data.data[0];
          this.company_P2 = data.data[1];
          this.company_P3 = data.data[2];
          this.company_P4 = data.data[3];

        } else {
          console.log('图片没有数据')
        };
        this.media_up = data.reserve2;             //媒体动态
        this.Company_new = data.data;             //公司动态


        this.bulletin_new = data.reserve[0]; //all公告
        this.bulletin_time = data.reserve[0].releaseTime; //公告时间
        this.bulletin_title = data.reserve[0].title;      //公告标题
        this.bulletin_id = data.reserve[0].id;   //公告id

        console.group('广告');
        console.log(this.bulletin_new);
        console.groupEnd();


        console.group('媒体动态');
        console.log(this.media_up);
        console.groupEnd();

        console.group('公司动态');
        console.log(this.Company_new);
        console.groupEnd();


      }
      )
  }
  //热门活动
  activity_data() {
    let hot = [];
    this.api.advServlet()
      .map(data => data.json())
      .subscribe(
      data => {
        if (data.data != 'null') {
          for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].advImg) {
              data.data[i].advImg = SERVER_URL + data.data[i].advImg;
              hot.push(data.data[i]);
            }
          }
          this.hot_activity = hot;
          console.group('热门活动');
          console.log(this.hot_activity);
          console.groupEnd();
        } else {
          console.log('热门活动图没用数据')
        }
      }
      )
  }

  //热门活动图片点击
  on_hot_pic(url) {
    console.group('热门活动');
    console.log(url);
    console.groupEnd();
    if (url) {
      if (url.indexOf('wechatShare') != -1) {
        let gg = this.appurl.themeable_yaoqing(url)
        gg.on('backevent').subscribe(data => {

        });
        gg.on('helloPressed').subscribe(data => {
          this.appurl.wechatShare2('我在用一个安全收益又不错的理财工具，推荐你也来试试！', '新用户注册就送8888元体验金，还有1880元红包可领！', '融裕贷', 'https://www.rongyudai.cn/fun/pj16027w/images/bg/banner.png', 'https://www.rongyudai.cn/app/newbit/newbieActive.screen?spreadCode=' + this.yaoqingma + '&APP=app');
        });   //分享到微信
        gg.on('testPressed').subscribe(data => {
          this.appurl.wechatShare1('我在用一个安全收益又不错的理财工具，推荐你也来试试！', '新用户注册就送8888元体验金，还有1880元红包可领！', '融裕贷', 'https://www.rongyudai.cn/fun/pj16027w/images/bg/banner.png', 'https://www.rongyudai.cn/app/newbit/newbieActive.screen?spreadCode=' + this.yaoqingma + '&APP=app');
        });   //分享到朋友圈
      } else {
        this.appurl.themeable(url);
      }
    } else {
      console.log('空')
    }

  }



  //  媒体报道
  on_media_and_Company(type, id) {
    // 转成json
    let page = { type: type, id: id };
    console.group('媒体报道和公司动态传输的数据')
    console.log(page);
    console.groupEnd();
    this.navCtrl.push('MediaCompanyPage', page);
  }
  //活动公告
  on_Bulletin(id) {
    console.group('活动公告传输的id')
    console.log(id);
    console.groupEnd();
    this.navCtrl.push('BulletinPage', { id: id });
  }
  on_media_jump(type) {
    console.group('媒体报道和公司动态传输的type')
    console.log(type);
    console.groupEnd();
    this.navCtrl.push('MediaListPage', { type: type });
  }
  //帮助中心
  on_bangzhu() {
    this.navCtrl.push('NavtitleHelpPage');
  }
  //关注微信
  on_weixin() {
    this.navCtrl.push('NavtitleWeChatPage');
  }
  //运营报告
  on_yunyingbaogao() {
    this.navCtrl.push('NavtitleReportPage');
  }


// 底部栏跳转
  home_click() {
    this.navCtrl.push('HomePage','', {animate:false})
  }
  list_click() {
    this.navCtrl.push('ListPage','', {animate:false})
  }
  concat_click() {
    this.navCtrl.push('ContactPage','', {animate:false})
  }
  me_click() {
    this.navCtrl.push('MePage','', {animate:false})
  }
}

