import { Component ,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { NativeServiveProvider }from '../../providers/native-servive/native-servive';
import { SERVER_URL }from '../../providers/constants/constants';

/**
 * Generated class for the SecurityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'SecurityPage'
})
@Component({
  selector: 'page-security',
  templateUrl: 'security.html',
})
export class SecurityPage implements OnInit{
  public isBank:boolean;              //银行卡号
  public risk:boolean;                //风险评估
  public emailVerified:boolean;       //邮箱地址
  public idcardVerified:boolean;      //银行存管.
  public isgesture:boolean;           //手势

  public user_phone:any;                   //手机号码
  public user_realName:any;                //真实名字
  public user_idCard:any;                  //真实身份证
  public tailFour:any;                     //银行卡号截取后4位
  public tail_bankname:any;                //银行卡
  public user_email:any;                   //邮箱
  public user_reserve:any;                 //风险评估类型
  public risk_url:any;                     //风险评估的地址

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public api:ApiServiceProvider,
     public alertCtrl:AlertController,
      public nav:NativeServiveProvider,
     ) {
  }

  //初始化
  ngOnInit(){
    this.isBank=true;
    this.risk=true;
    this.emailVerified=true;
    this.idcardVerified=true;
  }

    //返回上一页
  return(){
    this.navCtrl.pop();
  }

    //进入页面
  ionViewWillEnter(){
    this.all_data();
    this.is_gesture();
  }

  //所有数据的接口
  all_data(){

    // 个人信息
    this.api.user().map(data => data.json()).subscribe(data => {
        console.log(data);
        if(data.code=='000000'){
           this.user_phone=data.data.phone;


           if(data.data.realName){
               this.idcardVerified=false;
                this.user_realName=data.data.realName;
                this.user_idCard=data.data.idCard;
           }else{
               this.idcardVerified=true;
           }


            if(data.data.email){
              this.emailVerified=false;
              this.user_email=data.data.email;
            }else{
              this.emailVerified=true;
            }


        }else{
          console.log('个人信息接口没有服务器')
        }
      

    });

    //银行信息
    this.api.myBankList().map(data => data.json()).subscribe(data => {
        console.log(data);
        if (data.code == "000000") {
              if (data.data.myBankList.length > 0) {
                  this.isBank=false;
                  this.tailFour = data.data.myBankList[0].bankNumber.substr(-4, 4); //银行卡号码--截取后4位
                  this.tail_bankname = data.data.myBankList[0].bankname;
              } else {
                  this.isBank=true;
              }
          }else{
             console.log('银行信息接口没有服务器')
          }

    });

    //风险评估
    this.api.appPjb(JSON.parse(localStorage.getItem('personal')).accountId).map(data => data.json()).subscribe(data => {
        console.log(data);
        if (data.code == "000000") {
            this.risk_url=SERVER_URL+data.url;
            if (data.reserve2 == "") {
                this.risk = true;
            } else {
                this.risk = false;
                this.user_reserve = data.reserve2; //类型
            }
        } else {
           console.log('风险信息接口没有服务器')
        }

    });
  }

  //跳转修改手机号码
  phone(){
    this.navCtrl.push('ModifyphonePage');
  }

  //跳转登录密码
  gopassword(){
    this.navCtrl.push('ChangePasswordPage');
  }

  //跳转银行存管
  realname(val,name,cad){
    this.navCtrl.push('RealnamePage',{'ZC_type':'注册', type : val , name : name , cad : cad});
  }

  //跳转绑定银行
  addbank(val,bankname,tailFour){
    if(val){
      this.navCtrl.push('BankcardPage', { bankname : bankname , tailFour : tailFour});
    }else{
      this.showAlert('消息提醒','请先开通银行存管')
    }
  }

  //跳转邮箱
  mailbox(val){
    this.navCtrl.push('BindmailboxPage',{ type : val, email : this.user_email});
  }

  //跳转风险评测
  review(val){
    if(val){
       this.nav.themeable(this.risk_url).on('closeevent').subscribe(data => {
            this.all_data();      //重新查询数据
       });;
    }else{
        this.showAlert('消息提醒','请先开通银行存管')
    }
  }

  //解锁设置
  setLock(type){
    this.navCtrl.push('UnlockPage',{ type : type});
  }


  //手势判断
  is_gesture(){
      if(localStorage.getItem('handlock_passwd')){
        this.isgesture=false;
      }else{
        this.isgesture=true;
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




}
