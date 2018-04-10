import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ActionSheetController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { NativeServiveProvider }from '../../providers/native-servive/native-servive';
import { SERVER_URL }from '../../providers/constants/constants';
/**
 * Generated class for the AutoInvestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'AutoInvestPage'
})
@Component({
  selector: 'page-auto-invest',
  templateUrl: 'auto-invest.html',
})
export class AutoInvestPage {

//  -------未开启

  public isAutoInvest:boolean;      //是否有开启自动投标
  public rateStart:any;             //最低利率
  public mm:any;                    //日期循环
  public jkqxStart:any;             //起始时间
  public jkqxEnd:any;               //终止时间
  public settime:any;               //自动投标自定义和长期
  public isdata:boolean;            //自定义时间的boolean显示
  public saveMoney:any;             //账户余额
  public fjq:any;                   //现金券和福利券的编码
  public fjq_title:any;             //现金券和福利券的title
  public data_time:any;             //自定义时间
  public sub:boolean;               //开启自动投标按钮的禁止
  public cipherState:any;             //支付状态
  public zhifu:boolean;               //支付银行状态

  // -------已开启

  public rtime:any;                 //自定义时间
  public data_rateStart:any;        //最低利率
  public data_jkqxStart:any;        //起始时间
  public data_jkqxEnd:any;          //截止时间
  public data_saveMoney:any;        //账户余额
  public case1:boolean;             //加息券
  public case2:boolean;             //现金券
  public case3:boolean;             //现金券+加息券
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public api:ApiServiceProvider,
     public alertCtrl:AlertController,
    public nav:NativeServiveProvider,
    public actionSheetCtrl:ActionSheetController

     ) {
  }


    //返回上一页
  return(){
    this.navCtrl.pop();
  }

  //进入页面
  ionViewWillEnter(){
    this.init();
    this.zhifu_data();

    console.log(this.fjq_title)
  }

  init(){
    this.openSelect();
    this.date_list();
    this.rateStart='8';
    this.jkqxStart='1个月';
    this.jkqxEnd='24个月';
    this.settime='1';
    this.saveMoney='';
    this.fjq_title='先用现金券，后用加息券';
    this.fjq='xjqAndJxq';
    this.isdata=false;
    this.data_time='';
    this.sub=false;
    this.isAutoInvest = true;
    this.zhifu=false;
  }

  //日期循环
  date_list(){
      let arr = []
      for (let i = 1; i < 37; i++) {
          arr.push(i);

      }
      console.log(arr);

      this.mm = arr
  }

  //支付状态数据
  zhifu_data(){
     this.api.fee().map(data => data.json()).subscribe(data => {
       this.cipherState=data.data.cipherState;
     })
  }


  //进入页面判断是开启还是未开启
  openSelect(){
    this.api.zdtbSelect().map(data => data.json()).subscribe(data => {
        console.log(data);
        this.rtime = data.reserve;
        this.data_rateStart = data.data.rateStart;
        this.data_jkqxStart = data.data.jkqxStart;
        this.data_jkqxEnd = data.data.jkqxEnd;
        this.data_saveMoney = data.data.saveMoney;
        // this.dataTime = new Date(r.data.setTime).Format("yyyy-MM-dd");




      //自动投标是否开启
        if (data.data.autoSetStatus == 'QY') {
            this.isAutoInvest = false;

            if (data.data.xjqAndJxq == 'xjq') {
              this.fjq_title='仅用现金券';
            } else if (data.data.xjqAndJxq == 'jxq') {
              this.fjq_title='仅用加息券';
            }else if (data.data.xjqAndJxq == 'xjqAndJxq') {
              this.fjq_title='先用现金券，后用加息券';
            }else if (data.data.xjqAndJxq == 'jxqAndXjq') {
              this.fjq_title='先用加息券，后用现金券';
            }else{
              this.fjq_title='不使用现金券和加息券';
            }

        } else {
            this.isAutoInvest = true;

        }
    })
  }

  //账户保留金额弹出提示
  keepMoney () {
    this.showAlert('账户保留金额','您可填写一个金额，这部分钱不会加入自动投标');
  }

  //自动使用提示
  autoQuan() {
    this.showAlert('','若同时勾选，优先使用现金券');
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

  //投资期限事件
  tztime(val_1,val_2) {
      let Val_1=val_1.substring(0, val_1.length - 2);
      let Val_2=val_2.substring(0, val_2.length - 2);

      let now_time=new Date().getTime();
      let nowday_time=new Date(new Date().getFullYear()+'-'+(new Date().getUTCMonth()+1)+'-'+new Date().getUTCDate()).getTime();
      let end_time=new Date(this.data_time).getTime();

      console.log(Val_1,Val_2)

      if (Number(Val_1) < Number(Val_2)) {
          if(end_time==nowday_time){
            this.sub = false;
          }else if(now_time>end_time){
             this.sub = true;
             this.showAlert('消息提醒','时间不能小于当前日期')
          }else if(now_time<end_time){
             this.sub = false;
          }else{
            this.sub = false;
          }

      }else if(Number(Val_1) == Number(Val_2)){
          this.sub = false
      } else {
          this.sub = true;
          this.showAlert('消息提醒','借款期限的起始月不能大于截止月！')
      }

  }

  //自定义和长期有效相互转化
  term(){
    if(this.settime=='1'){
      this.isdata=false;
    }else{
      this.isdata=true;
    }
  }

  //截止日期
  timeChange(){

      let now_time=new Date().getTime();
      let nowday_time=new Date(new Date().getFullYear()+'-'+(new Date().getUTCMonth()+1)+'-'+new Date().getUTCDate()).getTime();
      let end_time=new Date(this.data_time).getTime();

      console.log(new Date().getTime());
      console.log(new Date(this.data_time).getTime());
      console.log(nowday_time);


       let Val_1=this.jkqxStart.substring(0, this.jkqxStart.length - 2);
       let Val_2=this.jkqxEnd.substring(0, this.jkqxEnd.length - 2);

       // 判断日期是否符合
       if(nowday_time==end_time){                                                   //当前时间===选中的时间
           if (Number(Val_1) > Number(Val_2)) {
             this.sub = true;
             this.showAlert('消息提醒','借款期限的起始月不能大于截止月！')
           }else{
             this.sub = false;
           }
       }
       else if ( end_time < now_time) {                                             //当前时间>选中的时间
          if (Number(Val_1) > Number(Val_2)) {
              this.sub = true;
              this.showAlert('消息提醒','借款期限的起始月不能大于截止月！')
          } else {
              this.sub = true;
              this.showAlert('消息提醒','时间不能小于当前日期')
          }
      }
      else if ( end_time > now_time) {                                              //当前时间<选中的时间
          if (Number(Val_1) > Number(Val_2)) {
              this.sub = true;
              this.showAlert('消息提醒','借款期限的起始月不能大于截止月！')
          } else {
              this.sub = false;
          }
      }

  }

  //开启自动投标
  openAutoInvest(){
    if(this.cipherState=='F'){
      this.zhifu=true;
      localStorage.setItem('zhifu','true');
    }else{
       this.open_data();
       localStorage.setItem('zhifu','false');
    }
  }

  //支付状态-已修改，去提现
  zhifu_tixian(){
      this.zhifu=false;
      localStorage.setItem('zhifu','false');
      this.api.with_zhifu().map(data => data.json()).subscribe(data => {
          console.log(data);
          if(data.code=='000000'){
              this.open_data();
          }else{
             this.showAlert('消息提醒',data.description);
          }
      })
  }
  //支付状态-修改支付密码
  zhifu_xiugai(){
      this.zhifu=false;
      localStorage.setItem('zhifu','false');
      this.nav.themeable(SERVER_URL + 'app/pay/modifyPassword.htm').on('closeevent').subscribe(data => {
          this.zhifu_data();      //重新查询数据
      });
  }

  // 自动投标----执行条件
  open_data(){
    let val_1=this.fjq;                   //获取使用现金券或者加息券；
    let val_2=this.saveMoney;             //账户保留金额；
    let val_3=this.rateStart;             //最低利率；
    let val_4=this.settime;               //等于2就自定义
    let val_5=this.data_time;             //自定义时间
    let val_6=this.jkqxStart.substring(0, this.jkqxStart.length - 2);             //开始投资期限
    let val_7=this.jkqxEnd.substring(0, this.jkqxEnd.length - 2);               //结束投资期限


    if(val_4=='2'){
      if(!val_5){
        this.showAlert('消息提示','自定义时间不能为空')
        return;
      }
    }


   if(!(/(^[1-9]([0-9]*)$|^[0-9]$)/.test(String(val_2)))){
        if(!val_2){
          val_2="0";
        }else{
           this.showAlert('消息提示','账户保留金额输入不规范');
           return;
        }
    }

    console.log(val_1,val_2,val_3,val_4,val_5,val_6,val_7)

    this.api.zztb(val_1,val_2,val_3,val_4,val_5,val_6,val_7).map(data => data.json()).subscribe(data => {
          console.log(data);
          if(data.code=='000000'){
            console.log('开启自动投标')
            console.log(data.data.url);
             this.nav.themeable(data.data.url).on('closeevent').subscribe(data => {
               this.navCtrl.popToRoot();
              // this.openSelect();      //重新查询数据
            });
          }else{
            console.log('没有服务器')
          }
      })



  }

  //关闭自动投标
  closeAutoInvest(){
    this.api.zztbClose().map(data => data.json()).subscribe(data => {
      console.log(data);
       if (data.code == "0000") {
          this.showAlert('消息提醒','关闭成功')
          this.isAutoInvest = true;
       }else{
            console.log('没有服务器')
        }
    })
  }

  //点券
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '自动使用',
      buttons: [
        {
          text: '仅用现金券',
          handler: () => {
            this.fjq='xjq';
            this.fjq_title='仅用现金券';
          }
        },{
          text: '仅用加息券',
          handler: () => {
            this.fjq='jxq';
            this.fjq_title='仅用加息券';

          }
        },{
          text: '先用现金券，后用加息券',
          handler: () => {
            this.fjq='xjqAndJxq';
            this.fjq_title='先用现金券，后用加息券';

          }
        },{
          text: '先用加息券，后用现金券',
          handler: () => {
            this.fjq='jxqAndXjq';
            this.fjq_title='先用加息券，后用现金券';

          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
