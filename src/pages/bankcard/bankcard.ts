import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ActionSheetController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { NativeServiveProvider } from '../../providers/native-servive/native-servive';
import { SERVER_URL }from '../../providers/constants/constants';
/**
 * Generated class for the BankcardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'BankcardPage'
})
@Component({
  selector: 'page-bankcard',
  templateUrl: 'bankcard.html',
})
export class BankcardPage {
  public bankname:any;          //银行
  public tailFour:any;          //银行后4位号码
  public bank:any;              //判断进入页面是否有绑定银行卡

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl:AlertController,
    public actionSheetCtrl: ActionSheetController,
    public api:ApiServiceProvider,
    public nav:NativeServiveProvider
    ) {
  }

  //返回上一页
  return(){
    this.navCtrl.pop();
  }

  //进入页面
  ionViewWillEnter(){
    this.init();
  }

  //初始化
  init(){
    console.log(this.navParams.get('bankname'));
    console.log(this.navParams.get('tailFour'));
    //判断是否有添加银行卡
    if(this.navParams.get('bankname')){
        this.bankname = this.navParams.get('bankname');
        this.tailFour = this.navParams.get('tailFour');
        this.bank=true;
    }else{
        this.bank=false;
    }
  }


  //删除银行卡
  chooseBankcard(){
    this.presentActionSheet();
  }

  //行动表
  presentActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
          title: '',
          buttons: [
            {
              text: '删除银行卡',
              role: 'destructive',
              handler: () => {
                this.presentConfirm();
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


  //弹窗接口
  showAlert(title,subTitle){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['确定']
    });
    alert.present();
  }

  //comfirm弹窗
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: '确定删除银行卡？',
      message: '',
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
            this.sang_data();
          }
        }
      ]
    });
    alert.present();
  }

  //删除银行卡接口
  sang_data(){
    this.api.deleteBankCard().map(data => data.json()).subscribe(data => {
        if (data.code == "000000") {
            this.showAlert('消息提醒',data.description);
            this.navCtrl.popToRoot();
        } else {
          this.showAlert('消息提醒',data.description);
        }
    })
  }

  //跳转绑定银行卡
  addbank(){
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
