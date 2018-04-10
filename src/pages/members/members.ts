import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Slides,ModalController  } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { SERVER_URL }from '../../providers/constants/constants';
import { NativeServiveProvider }from '../../providers/native-servive/native-servive';

/**
 * Generated class for the MembersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'MembersPage'
})
@Component({
  selector: 'page-members',
  templateUrl: 'members.html',
})
export class MembersPage {
  public lunbo_data:any;                          //轮播数组
  public lunbo_array:any;                         //轮播数组
  public data_integral:any;                       //当前成长值
  public data_start:any;                          //开始的成长值
  public data_end:any;                            //结束的成长值
  public data_dongjie:boolean;                    //冻结的状态
  public width:any;                               //进度条的范围
  public task:any;                                //成长值的任务的第一条数据

  public miss_btn3;                              //成长值自动投标的禁止按钮
  public miss_title3;                            //成长值自动投标的title
  public menber_number:any;                     //成长值的任务显示
  public user_realName:any;                       //银行存管           


  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public api:ApiServiceProvider,
     public alertCtrl:AlertController,
     public nav:NativeServiveProvider,
      public modalCtrl: ModalController,
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

  @ViewChild(Slides) slides: Slides;             //轮播自带

  //获取所有的接口数据
  all_data(){

     //会员中心接口
     this.api.associato().map(data => data.json()).subscribe(res => {
          console.log(res);
          this.reinstall(res);      //重装数组
          this.progress(res);       //progress的进度
          this.dongjie(res);        //判断有没有冻结
          this.menber(res);         //会员特权
          this.tasked(res);         //成长值任务中心
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
  }

  //会员特权的数组数据
  menber(res){
    for (let i = 0; i < res.reserve.length; i++) {
        res.reserve[i].upgradeMoney = res.reserve[i].upgradeMoney * 100;
        res.reserve[i].poundage = res.reserve[i].poundage * 100; 
    }

    this.lunbo_data = res.reserve; //轮播的数据  
    console.log(this.lunbo_data);
  }

   //重装数组
  reinstall(res) {
    var array = [];
    var fs = [{ 'yz': 'false' }, { 'yz': 'false' }, { 'yz': 'false' }, { 'yz': 'false' }, { 'yz': 'false' }];
    for (var z = 0; z < res.reserve.length; z++) {
        var end = res.reserve[z].integralEnd; //结束值
        var start = res.reserve[z].integralStart; //开始值
        var rank = res.reserve[z].rank; //svip等级
        var rankUrl = SERVER_URL + res.reserve[z].rankUrl; //svip背景
        var chengzhang = res.reserve[z].integralStart;
        var rank_fs = fs[z].yz;
        if (rank == res.data.rank) {
            var integral = res.data.integral;
            array[z] = { 'integralStart': start, 'integralEnd': end, 'rank': rank, 'rankUrl': rankUrl, 'rank_id': integral, 'rank_fs': 'true' };
        } else {
            array[z] = { 'integralStart': start, 'integralEnd': end, 'rank': rank, 'rankUrl': rankUrl, 'rank_id': chengzhang, 'rank_fs': rank_fs };
        }
    }

    this.lunbo_array = array;

    console.log(array);
  }

  //进度条计算
  progress(res){
      this.data_integral = res.data.integral; //成长值
      let index;
     // 获取当前的对应的等级vip下标
      if (res.data.rank == "SVIP1") {
          this.data_start = res.reserve[0].integralStart; //开始的成长值
          this.data_end = res.reserve[0].integralEnd; //结束的成长值
          if (this.data_integral >= this.data_end) {
              this.width = 100 + '%';
          } else {
              this.width = Math.abs(this.data_integral - this.data_start) / Math.abs(this.data_end - this.data_start) * 100 + '%';
          }
          index=0;
          this.menber_number=index;
          setTimeout(()=>{
               this.indexChanged(index);
          },100)
      } else if (res.data.rank == "SVIP2") {
          this.data_start = res.reserve[1].integralStart; //开始的成长值
          this.data_end = res.reserve[1].integralEnd; //结束的成长值.
           if (this.data_integral >= this.data_end) {
              this.width = 100 + '%';
          } else {
              this.width = Math.abs(this.data_integral - this.data_start) / Math.abs(this.data_end - this.data_start) * 100 + '%';
          }
          index=1;
           this.menber_number=index;
           setTimeout(()=>{
               this.indexChanged(index);
          },100)
      } else if (res.data.rank == "SVIP3") {
          this.data_start = res.reserve[2].integralStart; //开始的成长值
          this.data_end = res.reserve[2].integralEnd; //结束的成长值
           if (this.data_integral >= this.data_end) {
              this.width = 100 + '%';
          } else {
              this.width = Math.abs(this.data_integral - this.data_start) / Math.abs(this.data_end - this.data_start) * 100 + '%';
          }
          index=2;
           this.menber_number=index;
           setTimeout(()=>{
               this.indexChanged(index);
          },100)
      } else if (res.data.rank == "SVIP4") {
          this.data_start = res.reserve[3].integralStart; //开始的成长值
          this.data_end = res.reserve[3].integralEnd; //结束的成长值
          if (this.data_integral >= this.data_end) {
              this.width = 100 + '%';
          } else {
              this.width = Math.abs(this.data_integral - this.data_start) / Math.abs(this.data_end - this.data_start) * 100 + '%';
          }
          index=3;
           this.menber_number=index;
           setTimeout(()=>{
               this.indexChanged(index);
          },100)
      } else if (res.data.rank == "SVIP5") {
          this.data_start = res.reserve[4].integralStart; //开始的成长值
          this.data_end = res.reserve[4].integralEnd; //结束的成长值
          if (this.data_integral >= this.data_end) {
              this.width = 100 + '%';
          } else {
              this.width = Math.abs(this.data_integral - this.data_start) / Math.abs(this.data_end - this.data_start) * 100 + '%';
          }
          index=4;
           this.menber_number=index;
          console.log(index);
          setTimeout(()=>{
               this.indexChanged(index);
          },100)
      }
  }

  //有没有冻结
  dongjie(res){
     //判断有没有冻结
      if (res.data.freeze == 'F') { //未冻结
          this.data_dongjie = false;
      } else { //冻结中
          this.data_dongjie = true;
          this.showAlert('消息提醒','您超过90天无在项目，特权已被冻结。投资' + res.data.jdMoney + '元可解冻。')
      }
  }

  //成长值任务中心
  tasked(res){
    this.task = res.data.task;  //开通任务第一个
     if (res.data.task10 == 'QY') {
        this.miss_btn3 = true;
        this.miss_title3 = '已启用';
    } else {
        this.miss_btn3 = false;
        this.miss_title3 = '未启用';
    }
  }

  //轮播滑动--改变全局
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    if(currentIndex>=5){
        this.menber_number=4;
    }else{
        this.menber_number=currentIndex;
    }
    console.log('Current index is', currentIndex);
  }

  //当前下标的轮播视图
  indexChanged(index){
    this.slides.slideTo(index);
  }

  //弹窗
  showAlert(title,subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['确定']
    });
    alert.present();
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

  
    //【我的账户】-【安全中心】存管开通界面
    dian1() {
        this.navCtrl.push('RealnamePage',{ ZC_type : '个人' , type : '未开通' });
    }

    //跳转到银行卡管理界面
    dian2() {
        this.navCtrl.push("AddbankPage");
    }

    //跳转到【我的账户】-【安全中心】风险测评界面
    dian3() {
        this.nav.themeable(SERVER_URL+'/app/wap/pjb.screen?App=app').on('closeevent').subscribe(data => {
            this.all_data();      //重新查询数据
        });
    };

    //跳转到使用体验金标详情界面
    dian4() {
       this.navCtrl.pop();
       this.navCtrl.parent.select(0);
    }

    //跳转到充值界面
    dian5() {
        this.navCtrl.push("RechargePage");
    }

    //跳转到投资列表页
    dian6() {
        this.navCtrl.pop();
       this.navCtrl.parent.select(1);
    }

    //跳转到好友邀请页面
    dian7() {
        this.navCtrl.push("InvitationPage");
    }

    //去自动投标
    dian8() {
        this.navCtrl.push('AutoInvestPage');
    }

    //跳转到【我的账户】-【安全中心】绑定邮箱界面
    dian9() {
        this.navCtrl.push("BindmailboxPage",{ type : '未绑定' });
    }


    // //去投资
    // miss_dian2(){
    //      this.navCtrl.pop();
    //      this.navCtrl.parent.select(1);
    // }

    //去自动投标
    miss_dian3(){
         if(this.user_realName){
            console.log('已开通银行存管')
            this.navCtrl.push('AutoInvestPage')
        }else{
             this.realnameConfirm();
        }
    }


  //跳转等级说明
  go_grade(){
     this.navCtrl.push('GradePage');
  }
  //跳转成长任务中心
  go_task(){
      this.navCtrl.push('TaskPage');
  }

  //跳转特权详情页
  go_detail(title){
      this.navCtrl.push('PrivilegeDetailPage',{ title: title })
  }



}
