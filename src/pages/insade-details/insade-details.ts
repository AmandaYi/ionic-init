import { ApiServiceProvider } from './../../providers/api-service/api-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { BusinessProvider } from './../../providers/business/business';

@IonicPage({
  name: 'InsadeDetailsPage'
})
@Component({
  selector: 'page-insade-details',
  templateUrl: 'insade-details.html',
})
export class InsadeDetailsPage {
  public value_type;    //接受到的type
  public value_id;     //接受到的id
  public value_cid;    // 债券所需

  /* 标里数据的载体 */
  public project = [];    //接受project_record的数组  普通标和债券转让
  public rate;          //年化率
  public bidtype;       //判断年化收益
  public amount;         //总金额
  public remainAmount    //可投金额
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

  /* 当前用户信息 */
  public Use = [];
  public Bank: boolean;  //判断银行卡是否存在
  public user_realName: any;     //银行存管

  /* 子类回调 */
  public value = 0;    //子类回调， 为了重新执行查询接口方法

  //体验金
  public exp;


  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiServiceProvider
    , public modalCtrl: ModalController, public business: BusinessProvider, public alertCtrl: AlertController) {
  }
  //进入页面前执行
  ionViewWillEnter() {
    this.value_type = this.navParams.get('type');  //接受发现页面传过来的：页面类型 0是普通标， 1是体验标， 2是债券转让
    this.value_id= this.navParams.get('id');  //接受发现页面传过来的：id
    this.value_cid = this.navParams.get('cid');
   

    console.group("接收到的数据:id,type,cid")
    console.log('id:' +   this.value_id + "----------" + "type:" + this.value_type + "--------" + 'cid:' +  this.value_cid);
    console.groupEnd();
    this.inside_details();  //上半部分的数据
    this.account();   //用户信息

  }
  //万元收益计算
  inCome() {
    this.tenthousand = this.business.jisuan(this.isDay, this.cycle, this.rate, 10000, this.paymentTypeEnum)
    console.log('万元收益:' + this.tenthousand);
  }

  //普通标。债权转让。体验标。详情   
  inside_details() {
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
          console.log(this.project);
          console.log(this.status);
          console.groupEnd();
          this.inCome();
          this.Time_End();
        })
    }
    if (this.value_type == 2) {
      this.api.creditor(this.value_id, this.value_cid, this.value_type)
        .map(data => data.json())
        .subscribe(data => {
          this.ckEndTime = data.data.ckEndTime;  //结束时间
          this.syqx = data.data.syqx;
          this.salePrice = data.data.salePrice;
          this.profit = data.data.profit;
          this.rate = data.data.rate;
          this.status = data.data.status;     //标的状态
          this.project = data.data;            //全部内容
          console.group('债权转让')
          console.log(this.project)
          console.groupEnd();
          this.Time_End();
        })
    }
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

  //子类返回参数
  return(group) {
    this.value = group;
    console.log(this.value);
    if (this.value == 1) {
      this.inside_details();    //查询标的接口
      this.account();      //查询用户数据
    } else {
      console.log('不执行任何方法');
    };
  }

  // 全部用户信息接口;  
  account() {
    this.api.account().map(data => data.json()).subscribe(data => {
      if (data.code == "000000") {
        this.Use = data.data;
        console.group('当前用户信息')
        console.log(data);
        console.groupEnd();
      } else {
        console.log('当前没有用户账号')
      }
    })

    //银行卡
    this.api.myBankList().map(data => data.json()).subscribe(data => {
      console.group('银行卡信息')
      console.log(data);
      console.groupEnd();
      if (data.code == "000000") {
        if (data.data.myBankList.length > 0) {
          this.Bank = true;
        } else {
          this.Bank = false;
        }
      } else {
        console.log('银行信息接口没有服务器')
      }
    })

    // 个人信息
    this.api.user().map(data => data.json()).subscribe(data => {
      console.log(data);
      if (data.code == '000000') {
        this.user_realName = data.data.realName;
      } else {
        console.log('没有个人信息')
      }
    })
    //体验金查询接口
    if (this.value_type == 1) {
      this.api.myExper().map(data => data.json())
        .subscribe(data => {

          if (data.code == "000000") {
            this.exp = data.data[0].id;
            console.log(data);
            console.log('体验金:' + this.exp);
          } else {
            console.log('没有体验金')
            console.log(data);
          }
        })
    };

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
}