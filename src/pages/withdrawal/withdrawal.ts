import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { NativeServiveProvider }from '../../providers/native-servive/native-servive';
import { SERVER_URL }from '../../providers/constants/constants';

/**
 * Generated class for the WithdrawalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'WithdrawalPage'
})
@Component({
  selector: 'page-withdrawal',
  templateUrl: 'withdrawal.html',
})
export class WithdrawalPage {
  public tailFour:any;                //银行卡号截取后4位
  public tail_bankname:any;           //银行卡名字
  public tailFour_id:any;             //银行卡ID
  public data_main:any;               //会员等级
  public overAmountRB:any;            //获取账户余额
  public cash:any;                    //input的双向绑定



  public min:any;                     //最小的提现费
  public max:any;                     //最大的提现费
  public lv_max:any;                     
  public lv:any;                      //提现手续费率
  public lv2:any;                     //百分号的体现手续费率
  public lv_success:any;              //本月成功提现金额
  public lv_fee:any;                  //本月提现免费额度
  public lv_remain:any;               //本月剩余提现额度
  public lv_quota:any;                //每笔最少提现手续费
  public lv_id:any;                   //会员所在的等级
  public dongjie:any;                 //会员是否冻结
  public cipherState:any;             //支付状态
  public zhifu:boolean;               //支付银行状态
  
  public isshow:number;              //提现计算的费率提示框
  public fee:any;                    //提现计算的费率
  public de:any;                      //提现计算的实际到账

  public delaiameng:boolean;          //按钮的禁止状态
//   public find_data:boolean;           //修改密码的禁止状态


  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public api:ApiServiceProvider,
     public nav:NativeServiveProvider,
     public alertCtrl:AlertController
     ) {
  }


  //提现input框的监听
  keyup(num){
      console.log(num);

      let patt = /^((?!0)\d+(\.\d{1,2})?)$/g;
      console.log(typeof this.min);
      console.log(typeof this.overAmountRB);
      console.log(typeof this.max);

      if (!patt.test(num)) {
          this.isshow=0;
          this.cash='';
          this.delaiameng=true;
          console.log(0);
      } 
      else if(Number(this.min) > num){
        this.isshow=4;
        this.delaiameng=true;
        console.log(0);
      } 
      else if (Number(this.min) <= num && Number(this.max) > num && num <= Number(this.overAmountRB)) {
          this.isshow=3;
          this.delaiameng=false;
          this.jisuan(Number(num));
          console.log(3);
      } 
      else if(num > Number(this.overAmountRB)){
         this.isshow=2;
         this.delaiameng=true;
         console.log(2);
      }
      else {
        this.isshow=1;
        this.delaiameng=true;
        console.log(1);
      }
  }

  // //计算手续费
  jisuan(num){
      if (this.dongjie) { //冻结状态
          if (num * this.lv - this.lv_quota < 0) {
              this.fee = this.lv_quota;
              this.de = num - this.fee; //到账的金额
          } else {
              this.fee = num * this.lv + ""; //提现费用
              this.fee = this.fee.replace(/([0-9]+.[0-9]{2})[0-9]*/, "$1");
              this.de = num - this.fee; //到账的金额
          }
      } else { //非冻结状态
          if (this.lv_success - this.lv_fee < 0) {
              console.log(4);
              if (num + this.lv_success > this.lv_fee) {
                  var shenyu = num + this.lv_success - this.lv_fee;
                  this.fee = shenyu * this.lv + ""; //提现费用
                  this.fee = this.fee.replace(/([0-9]+.[0-9]{2})[0-9]*/, "$1");
                  this.de = num - this.fee; //到账的金额
              } else {
                  this.fee = '0.00'; //提现费用
                  this.de = num - this.fee; //到账的金额
              }
          } else {
              if (num * this.lv - this.lv_quota < 0) {
                  this.fee = this.lv_quota;
                  this.de = num - this.fee; //到账的金额
              } else {
                  this.fee = num * this.lv + ""; //提现费用
                  this.fee = this.fee.replace(/([0-9]+.[0-9]{2})[0-9]*/, "$1");
                  this.de = num - this.fee; //到账的金额
              }
              console.log(5);
          }
      }
  }

  //全部提现
  allWithdrawal() {
    this.cash=this.overAmountRB;

    if (Number(this.min) <= Number(this.overAmountRB) && Number(this.max) >= Number(this.overAmountRB)) {
        this.isshow=3;
        this.delaiameng=false;
        this.jisuan(this.overAmountRB);
    } else if(Number(this.min) > Number(this.overAmountRB)){
        this.isshow=0;
        this.delaiameng=true;
    }else if(Number(this.max) < Number(this.overAmountRB)){
        this.isshow=2;
        this.delaiameng=true;
    }else {
        this.isshow=0;
        this.delaiameng=true;
    }

  };

  //初始化
  int(){
      this.cash='';
      this.isshow=0;
      this.delaiameng=true;
      this.zhifu=false;
    //   this.find_data=true;
  }
            

    //进入页面
  ionViewWillEnter(){
    this.int();
    this.all_list();
  }

    //返回上一页
  return(){
    this.navCtrl.pop();
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


  //获取提现的所有的接口数据
  all_list(){

    //查找银行卡
    this.api.myBankList().map(data => data.json()).subscribe(data => {
        console.log(data);
        if (data.code == "000000") {
              if (data.data.myBankList.length > 0) {
                  this.tailFour = data.data.myBankList[0].bankNumber.substr(-4, 4); //银行卡号码--截取后4位
                  this.tail_bankname = data.data.myBankList[0].bankname;
                  this.tailFour_id = data.data.myBankList[0].id;
              } else {
                  return;
              }
          }
    });

    //获取账户余额
    this.api.account().map(data => data.json()).subscribe(data => {
      if(data.code=='000000'){
        this.overAmountRB=data.data.overAmountRB;
      }else{

      }
    })

    //获取手续费接口
    this.api.fee().map(data => data.json()).subscribe(data => {
        console.log(data);
        this.min = data.data.withdrawp.min; //最小的提现费
        this.max = data.data.withdrawp.max; //最大的提现费
        this.lv_max=data.data.withdrawp.max/10000+'万元';
        this.lv = data.data.withdrawp.proportion; //提现手续费率
        this.lv2 = (data.data.withdrawp.proportion * 100).toFixed(2) + '%'; //百分号的体现手续费率
        this.lv_success = data.data.withdrawp.txSuccessMoney; //本月成功提现金额
        this.lv_fee = data.data.withdrawp.txFreeQuota; //本月提现免费额度
        this.lv_remain = data.data.withdrawp.txLeftQuota; //本月剩余提现额度
        this.lv_quota = data.data.withdrawp.txMinFeeQuota; //每笔最少提现手续费
        this.lv_id = data.data.withdrawp.t6601.F01; //会员所在的等级

        this.cipherState=data.data.cipherState;     //支付状态

        this.dongjie = data.data.withdrawp.isFreeze; //会员是否冻结
    });

    //会员等级
    this.api.member().map(data => data.json()).subscribe(data => {
        console.log(data);
        if (data.code == '000000') {
          for (let i = 0; i < data.data.length; i++) {
              data.data[i].F04 = (data.data[i].F04 * 100).toFixed(2) + '%';
              data.data[i].F03 = data.data[i].F03 + '元/月'
          }
          this.data_main= data.data;
          console.log(this.data_main);
        } else {

        }
    });
  }

  //提现
  withdrawal(money){
      console.log(money);
      console.log(this.cipherState);
      if(this.cipherState=='F'){
        this.zhifu=true;
        localStorage.setItem('zhifu','true');
      }else{
        this.withdrawal_data(money);
        localStorage.setItem('zhifu','false');
      }
  }

  withdrawal_data(money){
      console.log(money,this.tailFour_id);
      this.delaiameng=true;
      this.api.withdraw(this.tailFour_id,money).map(data => data.json()).subscribe(data => {
          console.log(data);
          if(data.code == '000000'){
             this.nav.themeable(data.data.url).on('closeevent').subscribe(data => {
                this.navCtrl.popToRoot();
                // this.int();
                // this.all_list();      //重新查询数据
                // this.delaiameng=false;
            });
          }else{
              this.showAlert('消息提醒',data.description);
              this.delaiameng=false;
          }
      })
  }

  //支付状态-已修改，去提现
  zhifu_tixian(){
      this.zhifu=false;
      localStorage.setItem('zhifu','false');
      this.api.with_zhifu().map(data => data.json()).subscribe(data => {
          console.log(data);
          if(data.code=='000000'){
              this.withdrawal_data(this.cash);
          }else{
             this.showAlert('消息提醒',data.description);
          }
      })
  }
  //支付状态-修改支付密码
  zhifu_xiugai(){
       this.zhifu=false;
       localStorage.setItem('zhifu','false');
       this.findPayPassword();
  }

  //跳转修改密码
  findPayPassword(){
    //   this.find_data=false;
      this.nav.themeable(SERVER_URL + 'app/pay/modifyPassword.htm').on('closeevent').subscribe(data => {
            this.all_list();      //重新查询数据
      });
  }


}
