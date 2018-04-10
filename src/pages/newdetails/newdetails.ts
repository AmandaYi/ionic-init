import { ApiServiceProvider } from './../../providers/api-service/api-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ViewController } from 'ionic-angular';



@IonicPage({
  name: 'NewdetailsPage'
})
@Component({
  selector: 'page-newdetails',
  templateUrl: 'newdetails.html',
})
export class NewdetailsPage {

  public value_type; //type

  public value_id;   //id

  public value_cid;    //cid
  
  public value_status; // 判断标目前的状态

  public enterprise: any = []; //企业

  public detailspicture = [];  //合同图片

  public record = []; //投标记录:三合一;体验标，投资标，

  public Pagesize = 1;  //页数

  public newproject: any = [];   //newproject  普通标和债券转让


  public sizeJudge: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiServiceProvider,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
  ) {
  }
  ionViewWillEnter() {
    let type_value = this.navParams.get('type');  //接受发现页面传过来的：页面类型 0是普通标， 1是体验标， 2是债券转让
    let id_value = this.navParams.get('id');    //接受发现页面传过来的：id
    let cid_value = this.navParams.get('cid');
    let status_value=this.navParams.get('status');

    this.value_type = type_value;
    this.value_id = id_value;
 
    this.value_cid = cid_value;
    this.value_status=status_value;
    console.group("接收到的数据:id,tpye,cid")
    console.log('id:' + id_value + "----------" + "type:" + type_value+'-------'+'status:'+this.value_status);
    console.groupEnd();
    this.newDetails();
  }

 

  // 更多详情。。 借款企业信息详情
  company() {
    this.api.bidItem(this.value_id)
      .map(data => data.json())
      .subscribe(data => {
        if (data) {
          this.enterprise = data.data;
          console.log(data)
        } else {
          console.log('更多详情为空')
        };

        if (data.data.hasRelevant=='false') {
        } else {
          this.detailspicture = data.data.wapBidRelevant.relevant;
        }
        console.group('借款企业信息详情')
        console.log(this.detailspicture);
        console.log(this.enterprise);
        console.groupEnd();
      })
  }

  //体验标历史记录
  taste_way() {
    //体验标独有接口
    if (this.value_type == 1) {
      //投标历史记录
      let current = 1;
      let id = this.value_id;
      this.api.bidAsynTbjlTYB(id, current)
        .map(data => data.json())
        .subscribe(data => {
          if (data.data.length > 0) {
            this.record = data.data;
            this.sizeJudge = true;
          } else {
            console.log('历史记录为空')
            this.sizeJudge = false;
          }
        })
    };
  }
  //普通标和债券转让的购买历史记录
  record_way(id, size) {
    this.api.bidAsynTbjl(id, size)
      .map(data => data.json())
      .subscribe(data => {
        if (data.data.length > 0) {
          this.record = data.data;
          this.sizeJudge = true;
        } else {
          console.log('历史记录为空')
          this.sizeJudge = false;
        }
      })
  }

  // 新项目详情
  newDetails() {
    //普通标和债券标的基本数据
    this.api.newbid(this.value_id)
      .map(data => data.json())
      .subscribe(data => {
        if (data.code == "000000") {
          this.newproject = data.data;
        }else{
          '数据不存在'
        };
        this.company();
        this.record_way(this.value_id, this.Pagesize);
        //体验标历史记录
        this.taste_way();
        console.group('新项目详情')
        console.log(data)
        console.groupEnd();
      })
  }

  //返回键
  return() {
    this.viewCtrl.dismiss();
  }
//下拉页面
doRefresh(event) {
    setTimeout(() => {
      this.viewCtrl.dismiss();
    },300);
      event.complete();
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
   //跳转到内页
   on_inner() {
    let NgJudge:boolean;   
    if (localStorage.getItem('personal')) {
      if (JSON.parse(localStorage.getItem('personal')).realName) {
        NgJudge=true;
        this.viewCtrl.dismiss(NgJudge);
        // this.navCtrl.push('InsadeDetailsPage', { id: this.value_id, type: this.value_type, cid: this.value_cid });
      } else {
        this.realnameConfirm();
      }
    } else {
      let modal = this.modalCtrl.create('LoginPage');
      modal.present();
    }
  }

 
}
