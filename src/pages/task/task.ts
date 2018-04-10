import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { NativeServiveProvider }from '../../providers/native-servive/native-servive';
import { SERVER_URL }from '../../providers/constants/constants';

/**
 * Generated class for the TaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'TaskPage'
})
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {
  public miss_btn1:boolean;         
  public miss_btn2:boolean;         
  public miss_btn3:boolean;         
  public miss_btn4:boolean;         
  public miss_btn5:boolean;         
  public miss_btn6:boolean;         
  public miss_btn7:boolean;         
  public miss_btn8:boolean;         
  public miss_btn9:boolean;         
  public miss_btn10:boolean;      

  public miss_title1:any;   
  public miss_title2:any;   
  public miss_title3:any;   
  public miss_title4:any;   
  public miss_title5:any;   
  public miss_title6:any;   
  public miss_title7:any;   
  public miss_title8:any;   
  public miss_title9:any;   
  public miss_title10:any;

  public user_realName:any;             //银行存管是否有开通 
  public Bank:boolean;                  //银行卡是否有绑定  

  constructor
  (public navCtrl: NavController,
   public navParams: NavParams,
   public api:ApiServiceProvider,
   public alertCtrl:AlertController,
   public nav:NativeServiveProvider,
   ) {
  }

  //返回上一页
  return(){
    this.navCtrl.pop();
  }

  //进入页面
  ionViewWillEnter(){
    this.all_data();
  }

  //获取所有数据
  all_data(){

    //任务中心详情
    this.api.associato().map(data => data.json()).subscribe(res => {
          console.log(res);
          if (res.data.task1 == 'S') {
              this.miss_btn1 = true;
              this.miss_title1 = '已完成';
          } else {
              this.miss_btn1 = false;
              this.miss_title1 = '去开通';
          }

          if (res.data.task2 == 'S') {
              this.miss_btn2 = true;
              this.miss_title2 = '已完成';
          } else {
              this.miss_btn2 = false;
              this.miss_title2 = '去绑定';
          }

          if (res.data.task3 == 'S') {
              this.miss_btn3 = true;
              this.miss_title3 = '已完成';
          } else {
              this.miss_btn3 = false;
              this.miss_title3 = '去测评';
          }

          if (res.data.task4 == 'S') {
              this.miss_btn4 = true;
              this.miss_title4 = '已完成';
          } else if (res.data.task4 == 'W') {
              this.miss_btn4 = true;
              this.miss_title4 = '未完全';
          } else {
              this.miss_btn4 = false;
              this.miss_title4 = '去投标';
          }

          if (res.data.task5 == 'S') {
              this.miss_btn5 = true;
              this.miss_title5 = '已完成';
          } else {
              this.miss_btn5 = false;
              this.miss_title5 = '去充值';
          }

          if (res.data.task6 == 'S') {
              this.miss_btn6 = true;
              this.miss_title6 = '已完成';
          } else {
              this.miss_btn6 = false;
              this.miss_title6 = '去投资';
          }

          if (res.data.task7 == 'S') {
              this.miss_btn7 = true;
              this.miss_title7 = '已完成';
          } else {
              this.miss_btn7 = false;
              this.miss_title7 = '去邀请';
          }

          if (res.data.task8 == 'S') {
              this.miss_btn8 = true;
              this.miss_title8 = '已完成';
          } else {
              this.miss_btn8 = false;
              this.miss_title8 = '去开启';
          }

          if (res.data.task9 == 'S') {
              this.miss_btn9 = true;
              this.miss_title9 = '已完成';
          } else {
              this.miss_btn9 = false;
              this.miss_title9 = '去绑定';
          }

          if (res.data.task10 == 'QY') {
              this.miss_btn10 = true;
              this.miss_title10 = '已开启';
          } else {
              this.miss_btn10 = false;
              this.miss_title10 = '未开启';
          }
    })

    // 个人信息
    this.api.user().map(data => data.json()).subscribe(data => {
      console.log(data);
      if(data.code=='000000'){
         this.user_realName=data.data.realName;
      }else{
          console.log('没有个人信息')
      }

    })

    //银行信息
    this.api.myBankList().map(data => data.json()).subscribe(data => {
        console.log(data);
        if (data.code == "000000") {
              if (data.data.myBankList.length > 0) {
                  this.Bank=true;
              } else {
                  this.Bank=false;
              }
          }else{
             console.log('银行信息接口没有服务器')
          }

    });
  }

//confirm弹窗--银行存管
  realnameConfirm() {
      let alert = this.alertCtrl.create({
      title: '还未开通银行存管',
      message: '现在去跳转到开通银行存管页面吗?',
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
           this.navCtrl.push('RealnamePage',{ ZC_type : '个人' , type : '未开通' })
          }
        }
      ]
    });
    alert.present();
  }

   //点击跳转到投资列表
    miss_dian0 () {
        this.navCtrl.popToRoot();
        this.navCtrl.parent.select(1);
    }

    //点击跳转到自动投标设置界面
    miss_dian10 () {
        if(this.user_realName){
            console.log('已开通银行存管')
            this.navCtrl.push('AutoInvestPage')
        }else{
             this.realnameConfirm();
        }
    }

    //【我的账户】-【安全中心】存管开通界面
    miss_dian1 () {
         this.navCtrl.push('RealnamePage',{ ZC_type : '个人' , type : '未开通' });
    }

    //跳转到银行卡管理界面
    miss_dian2 () {
        if(this.user_realName){
            console.log('已开通银行存管')
             this.navCtrl.push('AddbankPage')
        }else{
             this.realnameConfirm();
        }
    }

    //跳转到【我的账户】-【安全中心】风险测评界面
    miss_dian3 () {
         if(this.user_realName){
            console.log('已开通银行存管')
              this.nav.themeable(SERVER_URL+'/app/wap/pjb.screen?App=app').on('closeevent').subscribe(data => {
                    this.all_data();      //重新查询数据
                });
        }else{
             this.realnameConfirm();
        }
    };

    //跳转到新手标详情界面
    miss_dian4 () {
        this.navCtrl.popToRoot();
        this.navCtrl.parent.select(0);
    }

    //跳转到充值界面
    miss_dian5 () {
        if(this.user_realName){
            console.log('已开通银行存管')
        }else{
            this.realnameConfirm();
            return;
        }

        if(this.Bank){
                this.navCtrl.push('RechargePage');
        }else{
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
        }
    }

    //跳转到投资列表页
    miss_dian6 () {
         this.navCtrl.popToRoot();
        this.navCtrl.parent.select(1);
    }

    //跳转到好友邀请页面
    miss_dian7 () {
        this.navCtrl.push('InvitationPage')
    }
    //开启自动投标
    miss_dian8 () {
         if(this.user_realName){
            console.log('已开通银行存管')
            this.navCtrl.push('AutoInvestPage')
        }else{
             this.realnameConfirm();
        }
    }

    //跳转到【我的账户】-【安全中心】绑定邮箱界面
    miss_dian9 () {
         this.navCtrl.push("BindmailboxPage",{ type : '未绑定' });
    }


}
