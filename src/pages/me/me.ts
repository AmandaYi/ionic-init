import { NetworkFailComponent } from './../../components/network-fail/network-fail';
import { Http } from '@angular/http';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController,Events  } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { BusinessProvider } from '../../providers/business/business';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { NativeServiveProvider } from '../../providers/native-servive/native-servive';
import { SERVER_URL } from '../../providers/constants/constants';
import { Md5 } from 'ts-md5/dist/md5';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the MePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'MePage'
})
@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage implements OnInit {
  public islogin: boolean;           //登录状态
  public isActive: boolean;          //眼睛

  public totalAmount: any ;             //登陆状态的资产总额
  public overAmountRB: any;            //登陆状态的可用余额
  public earnAmount: any;              //登陆状态的累计收益
  public investAmount: any;            //登陆状态的我的投资的待收收益
  public ticketCount: any;             //登陆状态的福利卷张数
  public next_time: any;               //登录状态的下次回款的时间
  public next_qian: any;               //登录状态的下次回款的钱
  public grade: any;                   //登陆状态的会员SVIP;
  public yes_schemes: boolean;         //下次回款计划的空指针
  public Bank: boolean;                //银行卡是否有绑定
  public risk_url: any;                //风险评测地址
  public user_realName: any;           //银行存管
  public network: boolean;             //判断网络
  public xiaobiaoti:any;               //消息小标题
  public xiaoxi:any;                   //消息小标题没有数据时就不显示出来

  public new_overAmount: any;          //双乾账户余额
  public hide_towqq: boolean;          //双乾转移通知
  public hide_oenqq: boolean;          //充值没到账的通知
  public new_yuer: any;                //未到账的充值
  // public risk:boolean;                 //风险评估的

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public business: BusinessProvider,
    public api: ApiServiceProvider,
    public alertCtrl: AlertController,
    public nav: NativeServiveProvider,
    public http: Http,
    public events:Events,
  ) {
    //订阅登录状态的事件
     this.events.subscribe('user:tzc',()=>{
      this.loginstate();
    })
  }




  // @ViewChild(NetworkFailComponent) child:NetworkFailComponent;

  // fa() {
  //   this.child.ionViewWillEnter();
  //   this.network = this.child.networkType();
  //   console.log(this.network)
  // }

  ngOnInit() {
    this.int();
    // localStorage.setItem('risk', 'true');        //风险评估
    // localStorage.setItem('hide_qq', 'true');     //双乾

  }

  //初始化
  int() {
    this.islogin = true;      //未登录状态
    this.isActive = true;       //眼睛显示
  }

  //点击眼睛
  numChange() {
    this.isActive = !this.isActive;
  }

  //双乾点击X
  del_mycha() {
    localStorage.setItem('hide_qq', 'false');     //双乾
    this.hide_towqq = false;
  }

  //去登录界面
  login() {
    let modal = this.modalCtrl.create('LoginPage');
    modal.present();
    modal.onDidDismiss(data => {
      if (!data) {
        this.islogin = true;    //未登录状态
      }else {
        this.islogin = false;    //登录状态
        this.all_data();
      }
    })
  }

  //去注册页面
  register() {
     let modal = this.modalCtrl.create('RegisterPage');
    modal.present();
    modal.onDidDismiss(data => {
      if (!data) {
        this.islogin = true;    //未登录状态
      }else {
        this.islogin = false;    //登录状态
        this.all_data();
      }
    })
  }

  //进入页面
  ionViewWillEnter() {
    this.network = this.nav.getnetwork();
    this.loginstate();

    //这个判断只要是为了区别投资完成后，点关闭弹窗是相当于重启了tabs，所以onint没效果
    if(localStorage.getItem('risk')=='true'||!localStorage.getItem('risk')){
      localStorage.setItem('risk', 'true');        //风险评估
    }else{
      localStorage.setItem('risk', 'false');        //风险评估
    }
    //这个判断只要是为了区别投资完成后，点关闭弹窗是相当于重启了tabs，所以onint没效果
    if(localStorage.getItem('hide_qq')=='true'||!localStorage.getItem('hide_qq')){
      localStorage.setItem('hide_qq', 'true');     //双乾
    }else{
       localStorage.setItem('hide_qq', 'false');     //双乾
    }
  }

  //离开页面
  // ionViewWillLeave(){
  //   this.events.unsubscribe('user:tzc');
  // }

  /**
   * 重新加载
   */
  willEnt(){
    this.ionViewWillEnter();
  }

  //是否登录状态
  loginstate() {
    if (localStorage.getItem('personal')) {
      this.islogin = false;      //登录状态
      this.all_data();
    } else {
      this.islogin = true;      //未登录状态
    }
  }

  // 登陆状态--获取所有数据的接口
  all_data() {

    // 当前用户的账户信息
    this.api.account_data().map(data => data.json()).subscribe(data => {
      console.log(data);
      if (data.code == '000000') {
        this.totalAmount = data.data.totalAmount;
        this.overAmountRB = data.data.overAmountRB;
        this.earnAmount = data.data.earnAmount;
        this.investAmount = data.data.investAmount;
        this.ticketCount = data.data.ticketCount;

        // 双乾账户判断
        if (data.data.overAmountSQ.substr(0, 1) == "0") {
          this.hide_towqq = false;
        } else {
          if (localStorage.getItem('hide_qq') == 'true') {
            this.hide_towqq = true;
            this.new_overAmount = data.data.overAmountSQ;
          } else {
            this.hide_towqq = false;
          }
        }
      } else {
        console.log('个人账户不存在');
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

    //下次回款计划
    this.api.backMoneyCalendarNext().map(data => data.json()).subscribe(data => {
      console.log(data);
      if (data.code == '000000') {
        this.next_time = data.reserve2;
        this.next_qian = data.reserve;
        this.yes_schemes = true;
      } else {
        this.yes_schemes = false;
      }
    })

    //会员中心
    this.api.associato().map(data => data.json()).subscribe(data => {
      console.log(data);
      if (data.code == '000000') {
        if (data.data.freeze == 'S') {
          this.grade = data.data.rank + '冻结中';
        } else {
          this.grade = data.data.rank;
        }
      } else {
        this.grade = 'SVIP1';
      }
    })


    //银行信息
    this.api.myBankList().map(data => data.json()).subscribe(data => {
      console.log(data);
      if (data.code == "000000") {
        if (data.data.myBankList.length > 0) {
          this.Bank = true;
        } else {
          this.Bank = false;
        }
      } else {
        console.log('银行信息接口没有服务器')
      }

    });

    //风险评估
    this.api.appPjb(JSON.parse(localStorage.getItem('personal')).accountId).map(data => data.json()).subscribe(data => {
      console.log(data);
      console.log('风险评估');
      if (data.code == "000000") {
        this.risk_url = SERVER_URL + data.url;
        console.log(this.risk_url);

        if (data.reserve2 == "") {
          if (localStorage.getItem('risk') == 'true') {
            this.presentConfirm();
          } else {
            console.log('风险信息给关闭')
          }
        } else {
          console.log('风险信息接口已填写')
        }
      } else {
        console.log('风险信息接口没有服务器')
      }

    });

    //充值未到帐的
    this.api.checkChargeMoney().map(data => data.json()).subscribe(data => {
      if (data.code == '000000') {
        this.hide_oenqq = true;
        this.new_yuer = data.data;
        this.timing_update();
      } else {
        this.hide_oenqq = false;
      }
    })

    //消息小标题
    this.api.letterList().map(data => data.json()).subscribe(data => {
      console.log(data);
      if(data.code=='000000'){
        if(data.unRead==0){
           this.xiaoxi=false;
        }else{
          this.xiaobiaoti=data.unRead;
           this.xiaoxi=true;
        }
      }else{
        console.log('没有消息服务器');
        this.xiaoxi=false;
      }
    })

  }

  // 定时查询未到账的充值
  timing_update() {
    let z = 5;  //默认50次
    let time_data = setInterval(() => {
      this.api.checkChargeMoney().map(data => data.json()).subscribe(data => {
        if (data.code == '000000') {
          z--;
          if (z < 0) {
            clearInterval(time_data);
            this.hide_oenqq = false;
          } else {
            this.pay_data();
            this.hide_oenqq = true;
            this.new_yuer = data.data;
          }
        } else {
          clearInterval(time_data);
          this.hide_oenqq = false;
        }
      })
    }, 30000)
  }

  //定时查询未到账的话，再次查询余额
  pay_data() {
    // 当前用户的账户信息
    this.api.account().map(data => data.json()).subscribe(data => {
      console.log(data);
      if (data.code == '000000') {
        this.totalAmount = data.data.totalAmount;
        this.overAmountRB = data.data.overAmountRB;
        this.earnAmount = data.data.earnAmount;
        this.investAmount = data.data.investAmount;
        this.ticketCount = data.data.ticketCount;
      } else {
        console.log('个人账户不存在');
      }
    })
  }

  //confirm弹窗--风险评估
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: '消息提醒',
      message: '根据国家监管规定，投资人需完成风险承受能力评级',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            localStorage.setItem('risk', 'false');
          }
        },
        {
          text: '去评级',
          handler: () => {
            localStorage.setItem('risk', 'false');
            this.nav.themeable(this.risk_url).on('closeevent').subscribe(data => {
              this.all_data();      //重新查询数据
            });
          }
        }
      ]
    });
    alert.present();
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

  /**
   * 跳转到我的资产统计
   */
  goPropert() {
    this.navCtrl.push('MyPropertPage', {}, { duration: 300 })
  }
  //跳转更多的页面
  more() {
    this.navCtrl.push('MorePage');
  }

  //跳转消息的页面
  message() {
    console.log(this.islogin);
    if (!this.islogin) {
      this.navCtrl.push('MessagePage');
    } else {
      this.login();
    }
  }

  //跳转充值的页面
  recharge() {
    if (this.user_realName) {
      console.log('已开通银行存管')
    } else {
      this.realnameConfirm();
      return;
    }

    if (this.Bank) {
      this.navCtrl.push('RechargePage');
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
              // this.navCtrl.push('AddbankPage');
              this.api.bindBankCard().map(data => data.json()).subscribe(data => {
                  console.log(data);
                  if(data.code=="000000"){
                      this.nav.themeable(data.data.url).on('closeevent').subscribe(data => {
                          this.navCtrl.pop();
                      });
                  }else{
                    this.showAlert('消息提醒',data.description);
                  }
              })
            }
          }
        ]
      });
      alert.present();
    }
  }

    //弹窗接口
  showAlert(title,subTitle){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['确定']
    });
    alert.present();
  }

  //跳转提现的页面
  withdrawals() {
    if (this.user_realName) {
      console.log('已开通银行存管')
    } else {
      this.realnameConfirm();
      return;
    }

    if (this.Bank) {
      this.navCtrl.push('WithdrawalPage');
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
              // this.navCtrl.push('AddbankPage');
              this.api.bindBankCard().map(data => data.json()).subscribe(data => {
                  console.log(data);
                  if(data.code=="000000"){
                      this.nav.themeable(data.data.url).on('closeevent').subscribe(data => {
                          this.navCtrl.pop();
                      });
                  }else{
                    this.showAlert('消息提醒',data.description);
                  }
              })
            }
          }
        ]
      });
      alert.present();
    }
  }

  //跳转交易记录的页面
  record() {
    this.navCtrl.push('RecordPage');
  }

  //跳转会员中心
  members() {
    this.navCtrl.push('MembersPage');
  }

  //跳转回款计划
  goschemes() {
    this.navCtrl.push('SchemesPage');
  }

  //跳转我的投资
  toMyInves() {
    this.navCtrl.push('MyInvesPage');
  }

  //跳转我的福利卷
  toMyWelfare() {
    this.navCtrl.push('MyWelfarePage');
  }

  //跳转邀请好友
  toInvitation() {
    this.navCtrl.push('InvitationPage');
  }

  //跳转自动投标
  toAutoInvest() {
    if (this.user_realName) {
      console.log('已开通银行存管')
      this.navCtrl.push('AutoInvestPage')
    } else {
      this.realnameConfirm();
    }

  }

  //跳转账户安全
  security() {
    this.navCtrl.push('SecurityPage');
  }

  //刷新
  doRefresh(e) {
    this.ionViewWillEnter();
    setTimeout(function () {
      e.complete();
    }, 400);
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
