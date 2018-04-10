import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { NativeServiveProvider }from '../../providers/native-servive/native-servive';
import { SERVER_URL }from '../../providers/constants/constants';

/**
 * Generated class for the InvitationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'InvitationPage'
})
@Component({
  selector: 'page-invitation',
  templateUrl: 'invitation.html',
})
export class InvitationPage {
  public data1:any;         //邀请好友（已赚现金，已赚现金券，已赚加息券）
  public data2:any;         //邀请好友（已赚现金，已赚现金券，已赚加息券）
  public data3:any;         //邀请好友（已赚现金，已赚现金券，已赚加息券）

  public change:any;        //选择
  public yongjin_list:any;  //佣金的数组数据
  public fuliquan_list:any; //福利券的数组数据
  
  public pageindex1:number;   //佣金的页数
  public pageindex2:number;   //福利券的页数

  public jilu1:boolean;        //佣金的暂无记录
  public jilu2:boolean;        //福利券的暂无记录
  public moredata1:boolean;    //佣金的上拉无数据
  public moredata2:boolean;    //福利券的上拉无数据

  public yaoqingma:any;        //获取验证码
  public isshare:boolean;      //二维码显示

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api:ApiServiceProvider,
    public nav:NativeServiveProvider,
     ) {
  }

  //返回上一页
  return(){
    this.navCtrl.pop();
  }

    //进入页面
  ionViewWillEnter(){
    this.change='yongjin';
    this.isshare=false;
    this.all_data();
  }

  //获取所有数据
  all_data(){

    //邀请好友
    this.api.inviteFriends().map(data => data.json()).subscribe(data => {
      console.log(data);
      this.data1 = data.data.rewardTotle;
      this.data2 = data.data.cashCoupon;
      this.data3 = data.data.interestCoupon;
    })

    this.yongjin_data(this.pageindex1=1,'');
  }

  //佣金数据
  yongjin_data(pageindex,e){
    this.api.awardCommission(pageindex,10).map(data => data.json()).subscribe(data => {
      this.yaoqingma=data.reserve;
      console.log(data);
      if(data.code=="000000"){
        if(data.data.length>0){
          this.moredata1=true;
          this.jilu1=false;
          if(e){
            for (let i = 0; i < data.data.length; i++) {
                if (data.data[i].invite == 0) {
                    data.data[i].invite = '--'
                }
            }
            this.yongjin_list=this.yongjin_list.concat(data.data);
            e.complete();
          }else{
             for (let i = 0; i < data.data.length; i++) {
                if (data.data[i].invite == 0) {
                    data.data[i].invite = '--'
                }
            }
            this.yongjin_list=data.data;
          }
        }else{
          if(e){
              this.jilu1=false;
              this.moredata1=false;
           }else{
              this.jilu1=true;
              this.moredata1=true;
           }
        }
      }
      else{
        console.log('无服务器')
      }

    })
  }

  //福利券数据
  fuliquan_data(pageindex,e){
    this.api.awardWelfare(pageindex,10).map(data => data.json()).subscribe(data => {
      console.log(data);

      this.yaoqingma=data.reserve;        //获取邀请码

       if(data.code=="000000"){
         if(data.data.length>0){
            this.moredata2=true;
            this.jilu2=false;
           if(e){
             this.fuliquan_list=this.fuliquan_list.concat(data.data);
             e.complete();
           }else{
             this.fuliquan_list=data.data;
           }
         }else{
           console.log(2);
           if(e){
              this.jilu2=false;
              this.moredata2=false;
           }else{
              this.jilu2=true;
              this.moredata2=true;
           }
         }
        
      }else{
        console.log('无服务器')
      }
    })
  }

  //点击佣金
  go_yongjin(){
     this.yongjin_data(this.pageindex1=1,'');
  }

  //点击福利券
  go_fuliquan(){
    this.fuliquan_data(this.pageindex2=1,'');
  }
  //佣金上啦加载
  doInfinite1(e){
    this.yongjin_data(++this.pageindex1,e);
  }

  //福利券上啦加载
  doInfinite2(e){
    this.fuliquan_data(++this.pageindex2,e);
  }

  //规则详情
  openRuleDetail(){
    let gg=this.nav.themeable_yaoqing('https://www.rongyudai.cn/app/newbit/recommendPage.screen?type=app')
    gg.on('backevent').subscribe(data => {
       
    });
    gg.on('helloPressed').subscribe(data => {
       this.nav.wechatShare2('我在用一个安全收益又不错的理财工具，推荐你也来试试！','新用户注册就送8888元体验金，还有1880元红包可领！' ,'融裕贷','https://www.rongyudai.cn/fun/pj16027w/images/bg/banner.png','https://www.rongyudai.cn/app/newbit/newbieActive.screen?spreadCode=' + this.yaoqingma + '&APP=app');
    });   //分享到微信
    gg.on('testPressed').subscribe(data => {
       this.nav.wechatShare1('我在用一个安全收益又不错的理财工具，推荐你也来试试！','新用户注册就送8888元体验金，还有1880元红包可领！' ,'融裕贷','https://www.rongyudai.cn/fun/pj16027w/images/bg/banner.png','https://www.rongyudai.cn/app/newbit/newbieActive.screen?spreadCode=' + this.yaoqingma + '&APP=app');
    });   //分享到朋友圈
  }

  //跳转好友统计
  go_hytj(){
    this.navCtrl.push('HytjPage')
  }

  //邀请好友
  openShare(){
    this.isshare=true;
  }

  //取消邀请好友
  closeShare(){
     this.isshare=false; 
  }

  //微信好友
  shareFriend(){
    this.nav.wechatShare2('我在用一个安全收益又不错的理财工具，推荐你也来试试！','新用户注册就送8888元体验金，还有1880元红包可领！' ,'融裕贷','https://www.rongyudai.cn/fun/pj16027w/images/bg/banner.png','https://www.rongyudai.cn/app/newbit/newbieActive.screen?spreadCode=' + this.yaoqingma + '&APP=app');
  }

  //朋友圈
  shareCircle(){
    this.nav.wechatShare1('我在用一个安全收益又不错的理财工具，推荐你也来试试！','新用户注册就送8888元体验金，还有1880元红包可领！' ,'融裕贷','https://www.rongyudai.cn/fun/pj16027w/images/bg/banner.png','https://www.rongyudai.cn/app/newbit/newbieActive.screen?spreadCode=' + this.yaoqingma + '&APP=app');
  }

  //二维码
  toQrcode(){
    this.navCtrl.push('QrcodePage',{ qcode : this.yaoqingma });
  }

}