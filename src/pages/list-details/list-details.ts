import { ApiServiceProvider } from './../../providers/api-service/api-service';
import { Content } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ViewController } from 'ionic-angular';
import { BusinessProvider } from './../../providers/business/business';



@IonicPage({
  name: 'ListDetailsPage'
})
@Component({
  selector: 'page-list-details',
  templateUrl: 'list-details.html',
})
export class ListDetailsPage {
  @ViewChild(Content) content: Content;

  /* 标里数据的载体 */
  public value_type;    //接受到的type
  public value_id;     //接受到的id
  public value_cid;    // 债券所需
  public project: any = [];    //接受project_record的数组  普通标和债券转让
  public rate;          //年化率
  public bidtype;       //判断年化收益
  public amount;         //总金额
  public remainAmount    //已投金额
  public bar;          //页面进度条的参数
  public tenthousand;  //万元收益
  public paymentTypeEnum; //还款方式

  /* 期限，万元收益，可投金额 */
  public isDay;    //判断月份或天
  public cycle;    //期限
  public syqx;     //债券转让天数
  public salePrice; //债券转让价格
  public profit;    //债券转让的预期收益

  /* 关于倒计时相关 */
  public status;        //标的状态，用来判断top—倒计时是否需要存在
  public ckEndTime;     //结束时间
  public TimeLeft;     //剩余时间
  public timer;      //方法调用

  /* 项目简介：是否存在这些属性，通过html里ngclass判断 */
  public db;      //本息保障
  public lx;     //投即计息
  public zr;    //90天可转
  public dy;   //资产抵押


  //上拉加载  所需...
  public enterprise: any = []; //企业

  public detailspicture = [];  //合同图片

  public record = []; //投标记录:三合一;体验标，投资标，

  public Pagesize = 1;  //页数

  public newproject: any = [];   //newproject  普通标和债券转让

  public sizeJudge: boolean = true;


  public height;    //高度
  public allView;//页面高度宽度
  public eventJudge: boolean = false; //滚动到子类
  public  down_Judge:boolean=false; //禁止下拉

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiServiceProvider,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public business: BusinessProvider,
    public viewCtrl: ViewController,
  ) { }
  ionViewWillEnter() {
    this.value_type = this.navParams.get('type');  //接受发现页面传过来的：页面类型 0是普通标， 1是体验标， 2是债券转让
    this.value_id = this.navParams.get('id');    //接受发现页面传过来的：id
    this.value_cid = this.navParams.get('cid');
  
    console.group("接收到的数据:id,type,cid")
    console.log('id:' +   this.value_id + "----------" + "type:" + this.value_type + "--------" + 'cid:' +  this.value_cid);
    console.groupEnd();
    /* 运行： */
    this.details();
    this.newDetails();

    this.allView = this.content.getContentDimensions();
    this.height = this.allView.scrollHeight + 5;
    console.log(this.allView);
    console.group('测试报错')
    console.log( this.down_Judge)
    console.log(this.down_Judge)
  console.groupEnd();
  }
  //万元收益计算
  inCome() {
    this.tenthousand = this.business.jisuan(this.isDay, this.cycle, this.rate, 10000, this.paymentTypeEnum)
    console.log('万元收益:' + this.tenthousand);
  }

  //时间倒计时
  Time_End() {
    let endTime = new Date(this.ckEndTime).valueOf();  //转化成时间戳
    if (isNaN(endTime)) {
      endTime = 0;
    };
    //现在时间
    let nowTime: number;
    nowTime = new Date().getTime();
    //相减，则是剩余时间
    var surplus = endTime - nowTime;      //剩余天数时间戳，倒计时时间
    console.group("接口");
    console.log(endTime);
    console.log(nowTime);
    console.log(surplus);
    console.groupEnd();

    if (surplus <= 0) {
      this.TimeLeft = '0日00时00分';
    } else {
      this.TimeLeft = this.formatDate(surplus);
    }

    if (surplus <= 0) {
      let zero = 0;
      console.log('不存在的')
      this.formatDate(zero);
    } else {
      this.timer = setInterval(() => {
        if (surplus == 0) {
          clearInterval(this.timer);
        }
        surplus = surplus - 1000;
        this.TimeLeft = this.formatDate(surplus);
      }, 1000);
    }
  }
  //时间计算方式...
  formatDate(surplus) {
    var day = Math.floor(surplus / (24 * 3600 * 1000));

    var leave1 = surplus % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    var hour = Math.floor(leave1 / (3600 * 1000))

    var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
    var minute = Math.floor(leave2 / (60 * 1000))

    var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
    var second = Math.round(leave3 / 1000)

    return day + "日" + hour + "时" + minute + "分" + second + "秒";
  }

  //普通标。债权转让。体验标。详情
  details() {
    //普通标和体验标的共有接口
    if (this.value_type == 0 || this.value_type == 1) {
      this.api.bid(this.value_id)
        .map(data => data.json())
        .subscribe(data => {
          this.project = data.data;            //全部内容

          this.ckEndTime = data.data.ckEndTime;  //结束时间
          this.status = data.data.status;     //标的状态
          this.bidtype = data.data.bidtype;    //年化收益判断状态
          this.rate = data.data.rate;       //年化率
          this.amount = data.data.amount;     //总金额
          this.remainAmount = data.data.remainAmount; //已投金额
          this.bar = Math.round((this.amount - this.remainAmount) / this.amount * 100) + '%'; //进度条显示比率
          this.isDay = data.data.isDay;
          this.cycle = data.data.cycle;
          this.paymentTypeEnum = data.data.paymentTypeEnum;
          console.group('普通标的记录')
          console.log(this.bar);
          console.log(this.project);
          console.log(this.ckEndTime);
          console.log(this.status);
          console.groupEnd();
          this.inCome();
          this.Time_End();
          this.company();

        })
    };

    if (this.value_type == 2) {
      this.api.creditor(this.value_id, this.value_cid, this.value_type)
        .map(data => data.json())
        .subscribe(data => {
          if (data) {
            this.project = data.data;            //全部内容
            this.amount = data.data.amount;     //总金额
            this.ckEndTime = data.data.ckEndTime;  //结束时间
            this.syqx = data.data.syqx;
            this.salePrice = data.data.salePrice;
            this.profit = data.data.profit;
            this.rate = data.data.rate;
            this.status = data.data.status;     //标的状态
            console.group('债权转让')
            console.log(this.project)
            console.groupEnd();
            this.Time_End();
            this.company();
          } else {
            console.log('标不存在数据')
          }
        })
    }
  }

  //confirm弹窗--银行存管
  realnameConfirm() {
    let alert = this.alertCtrl.create({
      title: '还未开通银行存管',
      message: '现在去跳转到开通银行存管页面吗?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('不去银行存管')
          }
        },
        {
          text: '去开通',
          handler: () => {
            this.navCtrl.push('RealnamePage', { ZC_type: '个人', type: '未开通' })
          }
        }
      ]
    });
    alert.present();
  }

  //跳转到内页
  on_inner() {
    if (localStorage.getItem('personal')) {
      if (JSON.parse(localStorage.getItem('personal')).realName) {
        this.navCtrl.push('InsadeDetailsPage', { id: this.value_id, type: this.value_type, cid: this.value_cid });
        setTimeout(() => {
          document.getElementById('top_All').style.display = 'block';
          document.getElementById('child').style.display = 'none';
          this.down_Judge = false; //切换页面成功
        }, 500);

      
      } else {
        this.realnameConfirm();
      }
    } else {
      let modal = this.modalCtrl.create('LoginPage');
      modal.present();
    }
  }
  //点击打开万元收益计算方法
  on_window() {
    let alert = this.alertCtrl.create({
      title: '万元预期收益',
      subTitle: '指该项目每投资一万元,正常回款产生的收益。',
      buttons: ['确定']
    });
    alert.present();
  }



  //禁止滑动;
  onTouchMove(inFlag) {
    if (inFlag) {
      document.addEventListener('touchmove', this.onHandler, false);
    } else {
      document.removeEventListener('touchmove', this.onHandler, false);
    }
  }
  //通过onHandler(true)来禁止和关闭
  onHandler(e) {
    e.preventDefault();
  }

  /*  panEvent(e) {
     console.log(e);
      if (this.eventJudge == false) {
       if (e.additionalEvent == "panup") {
         console.log(e.center)
         if (e.center.y > 50) {
           let modal = this.modalCtrl.create('NewdetailsPage', { type: this.value_type, id: this.value_id, cid: this.value_cid, status: this.status });
           modal.present();
           this.eventJudge = true;
 
           //关闭模态框返回
           modal.onDidDismiss(data => {
             this.eventJudge = false;
             console.log('返回值:'+data);
             console.log(this.eventJudge);
 
             if(data==true){
               this.navCtrl.push('InsadeDetailsPage', { id: this.value_id, type: this.value_type, cid: this.value_cid });
             }
           });
         }
       }
     }
   }
    */
  panEvent(e) {
    if (e.additionalEvent == "panup") {
      if (e.center.y < 10) {
        if (!this.eventJudge) { // 允许上啦加载： false允许，true不允许
          this.onTouchMove(true);  //手势禁用
          this.eventJudge = true;    //不允许上啦加载
          setTimeout(() => {
            this.content.scrollTo(0, 0);
            document.getElementById('child').style.display = 'block'; //显示组件div
            document.getElementById('top_All').classList.add('view'),  //添加sss的class名，内写有移动动画
              setTimeout(() => {
               
                document.getElementById('top_All').classList.remove('view');  //移除sss的class名，内写有隐藏的移动动画
                document.getElementById('top_All').style.display = 'none';   //隐藏div
                this.down_Judge=true;  //已加载组件，允许下拉
                this.onTouchMove(false);//手势可以使用
              }, 250);
            console.log('滑动动画开启')
          
          }, 200);
          console.log('0.7秒内只允许执行一次')
        }
      }
    }
    setTimeout(() => {       //0.7秒后开放，允许再次执行
      this.eventJudge = false;
    }, 700);
  }

 //下拉页面
 doRefresh(event) {
  if (this.down_Judge == true) {
    setTimeout(() => {
       document.getElementById('top_All').style.display = 'block';
      this.content.scrollTo(0, 0,300);
      event.complete();
    });
    setTimeout(() => {
      document.getElementById('child').style.display = 'none';
      this.down_Judge = false; //切换页面成功
    }, 300);
    console.log('下拉返回执行次数')
  } else {
    console.log('不执行')
    event.complete();
  };
}



  //  借款企业状态
  company() {
    this.api.bidItem(this.value_id)
      .map(data => data.json())
      .subscribe(data => {
        if (data) {
          this.db = data.data.db;     //本息保障
          this.lx = data.data.lx;    //投即计息
          this.zr = data.data.zr;   //90天可转
          this.dy = data.data.dy;  //资产抵押
          console.group('项目简介--是否隐藏[保，计，转，抵] F=隐藏，S=显示')
          console.log(this.db);
          console.log(this.lx);
          console.log(this.zr);
          console.log(this.dy);
          console.groupEnd();
        } else {
          console.log('更多详情为空')
        }
      })
  }


  // 更多详情。。 借款企业信息详情
  company_C() {
    this.api.bidItem(this.value_id)
      .map(data => data.json())
      .subscribe(data => {
        if (data) {
          this.enterprise = data.data;
          console.log(data)
        } else {
          console.log('更多详情为空')
        };

        if (data.data.hasRelevant=='false') {
        } else {
          this.detailspicture = data.data.wapBidRelevant.relevant;
        }
        console.group('借款企业信息详情')
        console.log(this.detailspicture);
        console.log(this.enterprise);
        console.groupEnd();
      })
  }

  //体验标历史记录
  taste_way() {
    //体验标独有接口
    if (this.value_type == 1) {
      //投标历史记录
      let current = 1;
      let id = this.value_id;
      this.api.bidAsynTbjlTYB(id, current)
        .map(data => data.json())
        .subscribe(data => {
          if (data.data.length > 0) {
            this.record = data.data;
            this.sizeJudge = true;
          } else {
            console.log('历史记录为空')
            this.sizeJudge = false;
          }
        })
    };
  }
  //普通标和债券转让的购买历史记录
  record_way(id, size) {
    this.api.bidAsynTbjl(id, size)
      .map(data => data.json())
      .subscribe(data => {
        if (data.data.length > 0) {
          this.record = data.data;
          this.sizeJudge = true;
        } else {
          console.log('历史记录为空')
          this.sizeJudge = false;
        }
      })
  }

  // 新项目详情
  newDetails() {
    //普通标和债券标的基本数据
    this.api.newbid(this.value_id)
      .map(data => data.json())
      .subscribe(data => {
        if (data.code == "000000") {
          this.newproject = data.data;
        }else{
          '数据不存在'
        };
        this.company_C();
        this.record_way(this.value_id, this.Pagesize);
        //体验标历史记录
        this.taste_way();
        console.group('新项目详情')
        console.log(data)
        console.groupEnd();
      })
  }

}

 //上啦页面
  // doInfinite(event) {
  //   if (this.eventJudge == false) {
  //     let modal = this.modalCtrl.create('NewdetailsPage', { type: this.value_type, id: this.value_id, cid: this.value_cid, status: this.status });
  //     modal.present();
  //     this.eventJudge = true;

  //     modal.onDidDismiss(data => {
  //       this.eventJudge = false;
  //       this.content.scrollToTop(300);
  //       console.log(this.eventJudge);
  //       console.log(this.content.isScrolling);
  //     })
  //   }
  //   event.complete();
  // };



