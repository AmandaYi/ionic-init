import { HomePage } from './../../pages/home/home';
import { MePage } from './../../pages/me/me';
import { QRCodeModule } from 'angular2-qrcode';
import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, NavOptions, ModalController, Tabs, Events } from 'ionic-angular';
import { ApiServiceProvider } from './../../providers/api-service/api-service';
import { DetailsProjectModule } from '../../module/DetailsProject';
import { NativeServiveProvider } from '../../providers/native-servive/native-servive';
import { SERVER_URL } from '../../providers/constants/constants';
import { TabsPage } from './../../pages/tabs/tabs';





@Component({
  selector: 'insade-foot',
  templateUrl: 'insade-foot.html'
})
export class InsadeFootComponent implements OnInit, OnChanges {
  @Output()
  search = new EventEmitter();
  @Input() getType;               //标类型
  @Input() insade_Id;             //id
  @Input() insade_Cid;          //债券独有cid
  @Input() inside_UseAccount;  //当前用户个人信息
  @Input() inside_Bank: boolean;      //银行卡
  @Input() inside_realName: any;           //银行存管
  @Input() inside_project: DetailsProjectModule;       //标的信息
  @Input() Exper;//体验金
  public overAmountRB: number;     //用户金额
  public accountId;               //用户ID
  public inside_money;           //接受页面数据
  public save_money;           //投资金额
  public remainAmount: number;  //可投金额
  public userXJQ;             //是否能选择--》优惠券
  public salePrice;            //债券支付金额
  public alrAmount;          //体验标金额- 8888.00元
  public first: boolean = false;   //投资---点击次数
  public Bid;  //标ID

  public code = 1;

  public sale; //余额不足，相差

  public carry;//传给模态框判断是普通标还是债券标; 根据其数跳转我的投资;

  public check: boolean = false;  //判断银行卡和身份证是否存在

  public safeType;     //判断是否通过提示书， safeType=0，未开启，safeType=1已开启 
  // 优惠券
  public qID;  //ID
  public qMZ;  //优惠券总面值
  public sum;  //使用条件
  public type; //类型
  public message; //点击选择优惠券后页面显示信息

  public orderNo = '';         //令牌 普通标的。。【普通】

  public Orderno;            //令牌 债券标。。 【债券】
  ngOnChanges(OnChanges) {

    this.inside_project; //标的信息
    this.Bid = this.inside_project.id;  //标id;
    this.remainAmount = this.inside_project.remainAmount;  //可投金额
    this.userXJQ = this.inside_project.userXJQ;  //优惠券
    this.alrAmount = this.inside_project.alrAmount; //体验标的金额
    this.salePrice = this.inside_project.salePrice;   //债券支付金额
    this.getType;   //标类型
    this.inside_Bank; //银行卡
    this.inside_realName;//银行存管
    this.inside_UseAccount; //用户个人信息
    this.overAmountRB = this.inside_UseAccount.overAmountRB; //用户金额
    this.accountId = this.inside_UseAccount.id;      //用户ID
    this.safeType = this.inside_UseAccount.safeType;    //判断是否通过提示书， safeType=0，未开启，safeType=1已开启 
    this.safeType = 1;
    this.Exper;   //体验金
    this.Orderno = this.inside_project.orderNo;  //债权标才能获取，普通标只有在点击购买才会返回.
    this.insade_Id;   //标的id[除了债券,和Bid相同]
    this.insade_Cid;  //债券标独有
    this.sale;



    console.group('信息')
    console.log('金额不足:' + this.sale);
    console.log('[提示书 0:未开启，1:已开启]' + this.safeType)
    console.log('标的id[除了债券,和Bid相同]:' + this.insade_Id);
    console.log('标的cid[用于债券]:' + this.insade_Cid);
    console.log('债权的订单号:' + this.Orderno);
    console.log('体验金:' + this.Exper);
    console.log('标ID:' + this.Bid);
    console.log('债权转让购买金额:' + this.salePrice);
    console.log('用户ID：' + this.accountId);
    console.log('可投金额' + this.remainAmount)
    console.log('个人余额:' + this.overAmountRB);
    console.log('是否能选择优惠券:' + this.userXJQ);
    console.log('银行卡：' + this.inside_Bank);
    console.log("标的类型：" + this.getType);
    console.log("是否开通银行存管:" + this.inside_realName);
    console.groupEnd();
    this.count();
  }
  ngOnInit() {

  }
  // 计算差
  count() {
    if (this.salePrice > this.overAmountRB) {
      this.sale = this.salePrice - this.overAmountRB;    //相差金额
      console.log('sale:' + this.sale);
    } else {
      this.sale = 0;
      console.log('sale:' + this.sale);
    }
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiServiceProvider,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public appurl: NativeServiveProvider,
    public events: Events,
  ) { }

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
    return false;
  }
  //跳转充值的页面 先判断是否开通银行存管，然后判断是否有银行卡..两者条件存在情况下..
  on_recharge() {
    this.bank();
    if (this.check == true) {
      this.navCtrl.push('RechargePage');
    }
  }

  //监听用户输入的金额，正则表达不允许输入2个.，不允许输入0开头
  on_money(event) {
    this.off_discount();
    var patt = /^((?!0)\d+(\.\d{1,2})?)$/g;
    if (!patt.test(event)) {
      this.inside_money = '';
      console.log('输入格式不正确！');
    };
  }
  //当优惠券存在时。投资值发生变化择，取消优惠券
  off_discount() {
    this.qID = '';
    this.qMZ = '';
    this.sum = '';
    this.type = '';
    this.message = '';
  }
  //全额投入
  on_all() {
    this.off_discount();
    if (Number(this.remainAmount) > Number(this.overAmountRB)) {
      this.inside_money = this.overAmountRB;
      console.log('可投金额' + this.remainAmount)
      console.log('个人余额:' + this.overAmountRB);
    } else {
      this.inside_money = this.remainAmount;
    }
  };
  //选择优惠券
  on_coupon() {
    if (!this.inside_money || !this.accountId) {
      let alert = this.alertCtrl.create({
        title: '投资金额为空',
        buttons: [
          {
            text: '确定',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      });
      alert.present();
    } else {

      let modal = this.modalCtrl.create('CouponPage', { id: this.accountId, money: this.inside_money }
      );

      //模态框返回参数方法
      modal.onDidDismiss(data => {
        this.qID = '';
        this.qMZ = '';
        this.sum = '';
        this.type = '';
        this.message = '';
        if (data) {
          this.qID = data.qID;
          this.qMZ = data.qMZ;
          this.sum = data.sum;
          this.type = data.type;
          if (this.qID == "#") {
            return false;
          };
        };
        if (this.type == 'TR') {
          this.message = '已选中现金券' + this.qMZ + '元';
        } else if (this.type == 'JX') {
          this.message = '已选中加息券' + (Number(this.qMZ) * 100).toFixed(2) + '%';
        } else { };
        console.group('优惠券')
        console.log(data);
        console.log(this.message)
        console.log(this.qID)
        console.log(this.qMZ)
        console.log(this.sum)
        console.log(this.type)
        console.groupEnd();
      });
      modal.present();
      console.log('用户ID：' + this.accountId);
      console.log('用户输入的金额:' + this.inside_money);
    };
  }
  //普通标合同
  lend_contract() {
    this.appurl.themeable(SERVER_URL + 'app/pdf/jkht.screen');
    console.log()

  }
  //债券和合同
  bond_contract() {
    this.appurl.themeable(SERVER_URL + 'app/pdf/zqzr.screen');
  }
  //银行卡和实名
  bank() {
    //判断实名认证
    if (this.inside_realName) {
      console.log('已开通银行存管');
      this.check = true;
    } else {
      this.realnameConfirm();
      this.check = false;
    };
    //银行卡判断
    if (this.inside_Bank) {
      console.log('已开通银行卡')
      this.check = true;
    } else {
      let alert = this.alertCtrl.create({
        title: '还未绑定银行卡',
        message: '现在去跳转到绑定银行卡页面吗?',
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: '确定',
            handler: () => {
              this.navCtrl.push('AddbankPage');
            }
          }
        ]
      });
      alert.present();
      this.check = false;
      return false;
    }
  }

  //点击 ‘普通’
  on_investment() {

    //判断银行卡和实名
    this.bank();
    console.log(this.check);
    if (this.check == false) {
      return false;
    };
    // check是判断是否存在银行卡和身份证，没有则false; 不执行下面

    if (this.inside_money == undefined) {
      let alert = this.alertCtrl.create({
        title: '消息提醒',
        subTitle: '请输入投资金额!',
        buttons: ['确定']
      });
      alert.present();
      return false;
    };

    let surplusMoney = this.overAmountRB;  //账号金额
    let enterMoney = this.inside_money;  //客户投资输入金额
    surplusMoney = Number(surplusMoney); //账户金额
    enterMoney = Number(enterMoney);  //投资金额
    if (enterMoney > surplusMoney) {
      let alert = this.alertCtrl.create({
        title: '消息提醒',
        subTitle: '您的账户余额不足',
        buttons: ['确定']
      });
      alert.present();
      return false;
    };


    console.group('传的参数');
    console.log('福利券:' + this.qID)
    console.log('标ID+' + this.Bid)
    console.log('金额:' + enterMoney)
    console.groupEnd();
    this.first = true;
    this.api.buyBid(enterMoney, this.Bid, this.qID).map(data => data.json()).subscribe(data => {
      console.group('子类返回查询的标接口')
      console.log(data);
      console.groupEnd();
      if (data.code = "000000") {
        this.first = false;
        this.appurl.themeable(data.data.url).on('closeevent').subscribe(data => {
          this.events.publish('user:RE', 0);   //同步更新
          this.navCtrl.push('MyInvesPage', { type: this.getType })
          // this.navCtrl.parent.select(3);
        })
      } else {
        let alert = this.alertCtrl.create({
          title: '消息提醒',
          subTitle: data.description,
          buttons: ['确定']
        });
        alert.present();
        this.first = false;
      }
    })
  }

  //   this.api.buyBidSMS(this.Bid, enterMoney, this.qID).map(data => data.json()).subscribe(data => {
  //     console.group('子类返回查询的标接口')
  //     console.log(data);
  //     console.groupEnd();
  //     if (data.code == '0000') {
  //       if (this.safeType == 1) {
  //         this.orderNo = data.reserve;
  //         let modal = this.modalCtrl.create('RechargeModalPage',
  //           { type: '普通标', bid_id: this.Bid, welfare: this.qID, pay_code: enterMoney, pay_orderNo: this.orderNo });
  //         modal.present();

  //         //监听返回
  //         modal.onDidDismiss(data => {
  //           console.log(data);
  //           this.first = false;  //可以点击
  //           if (!data) {        //点击返回键
  //             this.orderNo = '';
  //           } else {          //投资成功
  //             this.events.publish('user:RE', 0);   //同步更新
  //             this.inside_money = '';  //投资金额 等于空
  //             this.orderNo = '';      //令牌
  //             /*优惠券全部空  */
  //             this.qID = '';
  //             this.qMZ = '';
  //             this.sum = '';
  //             this.type = '';
  //             this.message = '';
  //             if (data == '关闭弹窗') {
  //               this.navCtrl.popToRoot();
  //               this.navCtrl.parent.select(0);
  //             } else if (data == '我的投资') {
  //               this.navCtrl.push('MyInvesPage', { type: this.getType })
  //               this.navCtrl.parent.select(3);
  //             } else {
  //               this.search.emit(this.code);
  //               return false;
  //             }
  //           }
  //         })
  //         console.group('传过去的参数')
  //         console.log(this.Bid);
  //         console.log(this.qID);
  //         console.log(enterMoney);
  //         console.log(this.orderNo);
  //         console.groupEnd();
  //       } else {
  //         let modal = this.modalCtrl.create('RiskPage', { userID: this.accountId });
  //         modal.present();
  //         //监听返回
  //         modal.onDidDismiss(data => {
  //           this.safeType = data;
  //         });
  //         this.first = false;
  //         return false;
  //       };
  //     } else {
  //       let alert = this.alertCtrl.create({
  //         title: '消息提醒',
  //         subTitle: data.description,
  //         buttons: ['确定']
  //       });
  //       alert.present();
  //       this.first = false;
  //       return false;
  //     }
  //   });
  // }


  //体验转让
  on_experience() {
    let exp = this.Exper;    //体验金
    let bid = this.Bid; //体验标Id

    //传给后台判断，根据回调判断成功与否
    this.first = true;
    this.api.buyBidExper(bid, exp).map(data => data.json())
      .subscribe(data => {
        console.group('点击购买体验标回调')
        console.log('体验金:' + exp);
        console.log('标ID:' + bid);
        console.log(data);
        console.groupEnd();
        if (data.code == '000039') {
          let alert = this.alertCtrl.create({
            title: '消息提醒',
            subTitle: data.description,
            buttons: ['确定']
          });
          alert.present();
          this.first = false;  //可以点击
        } else if (data.code == '000000') {
          let alert = this.alertCtrl.create({
            title: '消息提醒',
            subTitle: '投资成功',
            buttons: ['确定']
          });
          alert.present();
          this.first = false;  //可以点击
          this.search.emit(this.code); //为了让父类重新查询数据.
          return false; //执行完毕
        };

      })
  }

  //债券转让
  on_invest() {
    //判断银行卡和实名
    this.bank();
    console.log(this.check);
    if (this.check == false) {
      return false;
    };
    // check是判断是否存在银行卡和身份证，没有则false; 不执行下面

    let Cid = this.insade_Cid; //债券id
    let Bid = this.insade_Id;      //标的ID
    let orderno = this.Orderno;  //订单号
    let surplusMoney = this.overAmountRB;  //账号金额
    let buyAmount = this.salePrice;     //购买金额


    //开始传值给后台;后台会根据传值回调结果...
    this.first = true;

    this.api.buyCreditorSMS(Cid, Bid, orderno)
      .map(data => data.json())
      .subscribe(data => {
        console.log(data);
        if (data.code == '000000') {
          this.first = false;
          this.appurl.themeable(data.data.url).on('closeevent').subscribe(data => {
            this.events.publish('user:RE', 2);   //同步更新    
            this.navCtrl.push('MyInvesPage', { type: this.getType })
            // this.navCtrl.parent.select(3);
          });
        } else {
          let alert = this.alertCtrl.create({
            title: '消息提醒',
            subTitle: data.description,
            buttons: ['确定']
          });
          alert.present();
          this.first = false;
        }
      })
  }

  //       if (data.code == '0000') {
  //         let reserve = data.reserve; //  新的债券订单号
  //         let reserve2 = data.reserve2; //新的债券标
  //         let modal = this.modalCtrl.create('RechargeModalPage',
  //           { type: '债券标', pay_orderNo: reserve, bid_id: Bid, bid_cid: Cid, pay_orderNo1: reserve2, pay_code: buyAmount });
  //         modal.present();
  //         //监听返回
  //         modal.onDidDismiss(data => {
  //           console.log(data);
  //           this.first = false;  //可以点击
  //           if (!data) {        //点击返回键
  //             this.orderNo = '';
  //           } else {          //投资成功

  //             this.orderNo = '';      //令牌
  //             if (data == '投资完成') {
  //               this.navCtrl.popToRoot();
  //               this.navCtrl.parent.select(0);
  //             } else if (data == '我的投资') {
  //               this.navCtrl.push('MyInvesPage', { type: this.getType })
  //               this.navCtrl.parent.select(3);
  //             } else {
  //               this.search.emit(this.code);
  //             }

  //           }
  //         })
  //       } else {
  //         let alert = this.alertCtrl.create({
  //           title: '消息提醒',
  //           subTitle: data.description,
  //           buttons: ['确定']
  //         });
  //         alert.present();
  //         this.first = false;
  //         return false;
  //       }
  //       console.group('点击购买债券')
  //       console.log('标的cid[用于债券]:' + Cid);
  //       console.log('标的id[除了债券,和Bid相同]:' + Bid);
  //       console.log('债权的订单号:' + orderno);
  //       console.groupEnd();
  //     })
  // }
  // this.first = false;
  // this.events.publish('user:RE',2);   //同步更新              
  // }
}