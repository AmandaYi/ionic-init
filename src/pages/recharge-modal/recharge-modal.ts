import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

/**
 * Generated class for the RechargeModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'RechargeModalPage'
})
@Component({
  selector: 'page-recharge-modal',
  templateUrl: 'recharge-modal.html',
})
export class RechargeModalPage {
  public racharge_title:boolean;   //判断是否是充值还是投资，title标题
  public show_tiem:number;         //键盘底部
  public all_tiem:boolean;         //键盘头部
  public code_title:any;           //验证码的title
  public disabled_code:boolean;    //获取验证码的按钮禁止
  public currentNumber:any;         //键盘input数字
  public jianpan_code:any;          //键盘健输入的监听是否是0开头
  public currentNumber1:any;        //键盘第一位
  public currentNumber2:any;        //键盘第二位
  public currentNumber3:any;        //键盘第三位
  public currentNumber4:any;        //键盘第四位
  public currentNumber5:any;        //键盘第五位
  public currentNumber6:any;        //键盘第六位
  public marking:any;               //标记有无操作提交键盘密码      1代表误操作关闭键盘，2代表操作后关闭键盘
  public hide_x:boolean;            //债权X号
  public data_chongzhi:boolean;     //充值处理中或者投资处理中


  //公共参数（充值，普通标，债权）
   public pay_code:any;             //要充值的钱或者要投资的钱
   public pay_phone:any;            //手机号码
   public pay_orderNo:any;          //令牌

  //普通标的页面需要的参数值
  public bid_id:any;              //标的id
  public welfare:any;             //福利券

  //债权标的页面需要的参数值
  public bid_cid:any;             //标的cid
  public pay_orderNo1:any;        //令牌2


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl:ViewController,
    public api:ApiServiceProvider,
    public alertCtrl:AlertController,
   ) {
  }

    //进入页面
  ionViewWillEnter(){
    this.init();
  }

  //初始化
  init(){

    if(this.navParams.get('type')=='充值'){                       //充值初始化
        this.pay_int();
    }else if(this.navParams.get('type')=='普通标'){               //普通标初始化
        this.CommonInvest_int();
    }else{                                                        //债权初始化
        this.ClaimsInvest_int();
    }

    //一进入页面就默认操作和倒计时
    this.currentNumber ='';                                             //输入数字
    this.jianpan_code=0;                                                //键盘健输入的监听是否是0开头
    this.all_tiem=true;                                                 //键盘头部
    this.show_tiem=1;                                                   //键盘底部
    this.marking=1;                                                     //标记有无操作提交键盘密码      1代表误操作关闭键盘，2代表操作后关闭键盘
    this.time();                                                        //倒计时
    this.pay_code=this.navParams.get('pay_code');                       //要充值的钱或者投资钱的值
    this.pay_orderNo=this.navParams.get('pay_orderNo');                 //令牌       
    this.hide_x=false;
  }

  //充值页面初始化
  pay_int(){
    this.pay_phone=this.navParams.get('pay_phone');                     //手机号码
    this.racharge_title=true;                                           //充值的标题
    this.data_chongzhi=true;
  }

  //普通标投资页面初始化
  CommonInvest_int(){
    this.pay_phone=JSON.parse(localStorage.getItem('personal')).phone;                           //手机号码
    this.bid_id=this.navParams.get('bid_id');                                                    //标的Id
    this.welfare=this.navParams.get('welfare');                                                  //优惠卷
    this.racharge_title=false;                                                                  //投资的标题
    this.data_chongzhi=false;
  } 

  //债权标投资页面初始化
  ClaimsInvest_int(){
    this.pay_phone=JSON.parse(localStorage.getItem('personal')).phone;                           //手机号码
    this.pay_orderNo1=this.navParams.get('pay_orderNo1');                                        //令牌2
    this.bid_id=this.navParams.get('bid_id');                                                    //债权标的id
    this.bid_cid=this.navParams.get('bid_cid');                                                  //债权标的cid    
    this.racharge_title=false;                                                                  //投资的标题                            
    this.data_chongzhi=false;
  }
  

   //倒计时
  time(){
    this.disabled_code=true;
    let second=59;
    let title='s后重发'
    this.code_title=second+title;
    let timed=setInterval(()=>{
       if (second > 0) {
         this.code_title=second+title;
         second--;
      } else {
          clearInterval(timed);
          second = 59;
          this.code_title = "获取验证码";
          this.disabled_code=false;
      }
    },1000)
  }

  //关闭模态框
  hide_del(){
      if(this.marking==1){
          this.viewCtrl.dismiss();
      }else{
         this.viewCtrl.dismiss('充值操作成功');
      }

  }

  //充值成功的确定
  on_sure(){
    this.viewCtrl.dismiss('充值操作成功');
  }

  //再次获取验证码
  on_again(){
    this.again_data();
  }

  //重新获取验证码的接口api
  again_data(){
      if(this.navParams.get('type')=='充值'){
          this.pay_sms();           //充值重新获取验证码
      }else if(this.navParams.get('type')=='普通标'){
          this.CommonInvest_sms();  //充值重新获取验证码
      }else{
          this.ClaimsInvest_sms();        //债权投资重新获取验证码
      }
  }

  //充值重新短信查询接口
  pay_sms(){
      this.api.kJChargeCFDX(this.pay_orderNo).map(data => data.json()).subscribe(data => {
          if(data.code=='000000'){
              this.showAlert('消息提醒',"短信发送成功，请注意查收。");
              this.time();
          }else{
              this.showAlert('消息提醒',"短信发送失败。");              
          }
      })
  }

  //普通投资重新短信查询接口
  CommonInvest_sms(){
      this.api.bidSMSAgain(this.pay_orderNo,this.bid_id,this.pay_code).map(data => data.json()).subscribe(data => {
           if(data.code=='0000'){
              this.showAlert('消息提醒',"短信发送成功，请注意查收。");
              this.time();
          }else{
              this.showAlert('消息提醒',"短信发送失败。");              
          }
      })
  }

  //债权投资重新短信查询接口
  ClaimsInvest_sms(){
      this.api.buyCreditorSMSAgain(this.pay_orderNo1,this.bid_id).map(data => data.json()).subscribe(data => {
           if(data.code=='0000'){
              this.showAlert('消息提醒',"短信发送成功，请注意查收。");
              this.time();
          }else{
              this.showAlert('消息提醒',"短信发送失败。");              
          }
      })
  }

  //点击键盘
   doInput(n){
       if (n == "C") { //清除键
            if (this.currentNumber.length == "1" || this.currentNumber == "") {
                this.jianpan_code = 0;
                this.currentNumber = this.currentNumber.substr(0, this.currentNumber.length - 1);
            } else {
                this.currentNumber = this.currentNumber.substr(0, this.currentNumber.length - 1);
            }
        } else if (n == 0) { //0键
            this.jianpan_code++;
            if (this.currentNumber == "" || this.currentNumber != 0) {
                this.currentNumber = this.currentNumber + "" + n;
            }
            if (this.currentNumber == 0) {
                if (this.jianpan_code == 1) {
                    this.currentNumber = this.currentNumber + "";
                } else {
                    this.currentNumber = this.currentNumber + "" + n;
                }
            }
        } else if (n != 0 && n != "." && n != "C") { //1-9键
            if (this.currentNumber == "0") {
                this.currentNumber = "0" + n;
            } else {
                this.currentNumber = this.currentNumber + "" + n;
            }
        }

          console.log(this.currentNumber);
          this.currentNumber1 = this.currentNumber.substr(0, 1);
          this.currentNumber2 = this.currentNumber.substr(1, 1);
          this.currentNumber3 = this.currentNumber.substr(2, 1);
          this.currentNumber4 = this.currentNumber.substr(3, 1);
          this.currentNumber5 = this.currentNumber.substr(4, 1);
          this.currentNumber6 = this.currentNumber.substr(5, 1);
          this.all_data();
  }


  //密码超过等于6位，提交数据
  all_data(){
    if(this.currentNumber.length>=6){
        this.show_tiem=2;
        this.jianpan_code=0;
        if(this.navParams.get('type')=='充值'){
            this.pay_data();        //充值接口
        }else if(this.navParams.get('type')=='普通标'){
            this.CommonInvest_data();   //普通标
        }else{
            this.ClaimsInvest_data();   //债权标
        }
    }
 }

 //充值数据接口
 pay_data(){
     this.api.kJChargeQR(this.pay_orderNo,this.currentNumber).map(data => data.json()).subscribe(data => {
            if(data.code=='000000'){
            this.all_tiem=false;
            this.show_tiem=3;
            this.marking=2;
            }else{
            this.currentNumber='';
            this.currentNumber1='';
            this.currentNumber2='';
            this.currentNumber3='';
            this.currentNumber4='';
            this.currentNumber5='';
            this.currentNumber6='';
            this.alert(data.description);
            this.all_tiem=true;
            this.show_tiem=1;
            }
        })
 }

 //普通投资数据接口
 CommonInvest_data(){
      this.api.buyBid(this.pay_code,this.bid_id,this.welfare).map(data => data.json()).subscribe(data => {
          if(data.code == "0000") {
            this.all_tiem=false;
            this.show_tiem=4;
            this.marking=2;
            this.hide_x=true;
          }else{
            this.currentNumber='';
            this.currentNumber1='';
            this.currentNumber2='';
            this.currentNumber3='';
            this.currentNumber4='';
            this.currentNumber5='';
            this.currentNumber6='';
            let shuangyinhao=data.description.replace(/(^\"*)|(\"*$)/g, "");        //去掉双引号
            this.showAlert('消息提醒',shuangyinhao);
            this.all_tiem=true;
            this.show_tiem=1;
          }
      })
 }

 //债权投资重新短信查询接口
  ClaimsInvest_data(){
       this.api.buyCreditor(this.bid_cid,this.bid_id,this.pay_orderNo,this.pay_orderNo1,this.currentNumber).map(data => data.json()).subscribe(data => {
          if (data.code == "0000") {
            this.all_tiem=false;
            this.show_tiem=5;
            this.marking=2;
            this.hide_x=true;
          }else{
            this.currentNumber='';
            this.currentNumber1='';
            this.currentNumber2='';
            this.currentNumber3='';
            this.currentNumber4='';
            this.currentNumber5='';
            this.currentNumber6='';
            let shuangyinhao=data.description.replace(/(^\"*)|(\"*$)/g, "");     //去掉双引号
            this.showAlert('消息提醒',shuangyinhao);
            this.all_tiem=true;
            this.show_tiem=1;
          }
      })
  }

 //通用弹窗接口
  showAlert(title,subTitle){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      enableBackdropDismiss:false,
      buttons: ['确定']
    });
    alert.present();
  }

  //支付失败确定弹窗接口
  alert(title){
      let alert = this.alertCtrl.create({
        title: title,
        enableBackdropDismiss:false,
        buttons: [{
            text: '确定',
            handler: () => {
                this.viewCtrl.dismiss();
            }
        }]
     });

     alert.present();
  }

  //普通标的关闭弹窗
  on_close(){
      this.viewCtrl.dismiss('关闭弹窗');
  }

  //普通标的--我的投资
  on_mytouzi(){
       this.viewCtrl.dismiss('我的投资');
  }

  //债权的--投资完成
  on_success(){
      this.viewCtrl.dismiss('投资完成');
  }

  //债权的--我的投资
  on_myzhaiquan(){
      this.viewCtrl.dismiss('我的投资');
  }




   
            

}
