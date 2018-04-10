import { URLSearchParams } from '@angular/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { SERVER_URL } from '../../providers/constants/constants';
import { IonicPage, NavController, NavParams, App, ModalController } from 'ionic-angular';
import { NativeServiveProvider } from '../../providers/native-servive/native-servive';
import { TabsPage } from '../tabs/tabs';
import { take } from 'rxjs/operator/take';
import { QRCodeModule } from 'angular2-qrcode';
import { Slides } from 'ionic-angular';

@IonicPage({
  name: 'HomePage'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  // @ViewChild(Slides) slides: Slides;
  @ViewChild('Slides') slides: Slides;


  public Viewpicture: boolean = true;

  public homeType: number;          //用于让组件接受识别出哪个页面
  public list: any[];                  //接受子类组件数据
  public type: any = 0;                   //下拉加载；用于让组件识别
  public activity = [];              //轮播图数据
  public topdata;                   //轮播图内数据
  public islogin: boolean = true;  //判断是否登录
  net: boolean;                   //判断网络连接
  public yaoqingma: any;        //获取验证码


  /* 图片4章， 因轮播的循环有问题各种问题，采取了分别读取。 轮播for循环可以使用，但本身循环loop有细微缺陷。 */
  public pic_first: string;
  public pic_second: string;
  public pic_third: string;
  public pic_fourth: string;
  //水花
  // private timer;
  // public time = 4;
  // public splash: boolean = true;
  // tabBarElement: any;
  constructor(
    public navCtrl: NavController,
    public api: ApiServiceProvider,
    public appurl: NativeServiveProvider,
    public app: App,
    public modalCtrl: ModalController,
  ) {
    //水花
    // this.tabBarElement = document.querySelector('.tabbar');
  }
  /* 开机只执行一次 */
  ionViewDidLoad() {
    // this.openspalsh(); //水花动画
  }
  //进入页面前执行
  ionViewWillEnter() {
    this.homeType = 1;
    this.login();
    //轮播图内的数据
    this.getdata();
    //是否登录
    this.net = this.appurl.getnetwork();//获取当前网络连接情况
    this.yongjin_data(1, 10);
    this.hot_activity();//轮播图 


  }
  /* 开启水花动画 */
  /* openspalsh() {
    this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.splash = false;
      this.tabBarElement.style.display = 'flex';
      // this.open();
     }, 4000);

    if (this.time > 0) {
      this.timer = setInterval(() => {
        this.time = this.time - 1
      }, 1000);
    }else if(this.time<0){
    };
  } */
  /* 水花 */
  // animation() {
  //   this.splash = false;
  //   this.tabBarElement.style.display = 'flex';
  // }
  willEnt() {
    this.ionViewWillEnter();
  }




  //回到首页再次启动自动轮播
  // ionViewDidEnter() {
  //   if (this.Viewpicture == false) {
  //     this.slides.autoplayDisableOnInteraction = false;
  //     this.slides.startAutoplay();
  //   };
  // }
  //页面离开时停止自动播放  
  // ionViewDidLeave() {
  //   this.slides.stopAutoplay();
  //   this.Viewpicture = false;
  // }
  //每次切换页面都可以做限制
  // slideChanged() {
  //   this.slides.startAutoplay();
  // }






  ngOnInit() {
    localStorage.setItem('risk', 'true')  //判断账号    
  }

  //下拉刷新代码;
  doRefresh(refresher) {
    //下拉开始时启动;
    setTimeout(() => {
      this.ionViewWillEnter();
      //下拉刷新中启动;
      this.type = 1;
      refresher.complete();
    }, 200);
    this.type = 0;
  }

  //首页轮播图
  hot_activity() {
    let hot = [];
    this.api.advServlet()
      .map(data => data.json())
      .subscribe(data => {
        console.log(data.data)
        if (data.data != 'null' && data.data) {
          for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].advImg) {
              data.data[i].advImg = SERVER_URL + data.data[i].advImg;
            }
            if (data.data[0]) {
              this.pic_first = data.data[0];
            }
            if (data.data[1]) {
              this.pic_second = data.data[1];
            }
            if (data.data[2]) {
              this.pic_third = data.data[2];
            }
            if (data.data[3]) {
              this.pic_fourth = data.data[3];
            }

          }
          this.activity = data.data;
          // console.group('首页轮播图')
          // console.log(this.pic_first)
          // console.log(this.pic_second)
          // console.log(this.pic_third)
          // console.log(this.pic_fourth)
          // console.groupEnd();
        } else {
          console.log('没有数据！！！！！！！！！！！！')
        }
      })
  }

  //佣金数据
  yongjin_data(pageindex, e) {
    this.api.awardCommission(pageindex, 10).map(data => data.json()).subscribe(data => {
      this.yaoqingma = data.reserve;
    })
  }

  //首页轮播图跳转
  on_hot_roundpicture(url) {
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

  //轮播图内的数据
  getdata() {
    this.api.bidExperIndex()
      .map(data => data.json())
      .subscribe(data => {
        this.topdata = data.reserve;
        document.getElementById('sumMoney').innerHTML = this.topdata.sumMoney2;
        document.getElementById('runday').innerHTML = this.topdata.runday;
      })
  }
  //icon图标的跳转
  //关于我们
  on_icon4() {
    this.appurl.themeable('https://www.rongyudai.cn/app/wap/helpCenter/aboutUs.screen');
  }
  //新手任务
  on_icon3() {
    this.appurl.themeable(SERVER_URL + 'fun/pj16027w/index.html');
  }
  //安全保障
  on_icon() {
    this.appurl.themeable('https://www.rongyudai.cn/app/wap/helpCenter/safety.screen');
  }
  //数据披露
  on_icon2() {
    this.appurl.themeable('https://www.rongyudai.cn/app/datapub/index.screen');
  }
  //邀请好友
  on_icon5() {
    let gg = this.appurl.themeable_yaoqing('https://www.rongyudai.cn/app/newbit/recommendPage.screen?type=app');
    gg.on('backevent').subscribe(data => {

    });
    gg.on('helloPressed').subscribe(data => {
      this.appurl.wechatShare2('我在用一个安全收益又不错的理财工具，推荐你也来试试！', '新用户注册就送8888元体验金，还有1880元红包可领！', '融裕贷', 'https://www.rongyudai.cn/fun/pj16027w/images/bg/banner.png', 'https://www.rongyudai.cn/app/newbit/newbieActive.screen?spreadCode=' + this.yaoqingma + '&APP=app');
    });   //分享到微信
    gg.on('testPressed').subscribe(data => {
      this.appurl.wechatShare1('我在用一个安全收益又不错的理财工具，推荐你也来试试！', '新用户注册就送8888元体验金，还有1880元红包可领！', '融裕贷', 'https://www.rongyudai.cn/fun/pj16027w/images/bg/banner.png', 'https://www.rongyudai.cn/app/newbit/newbieActive.screen?spreadCode=' + this.yaoqingma + '&APP=app');
    });   //分享到朋友圈
  }
  //是否登录状态
  login() {
    if (localStorage.getItem('personal')) {
      this.islogin = false;      //登录状态

      console.group('已登录')
      console.log(this.islogin);
      console.groupEnd();
    } else {
      this.islogin = true;      //未登录状态
      console.group('未登录')
      console.log(this.islogin);
      console.groupEnd();
    }
  }

//底部栏跳转
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
