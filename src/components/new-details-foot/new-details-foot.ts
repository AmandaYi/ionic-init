import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { ApiServiceProvider } from './../../providers/api-service/api-service';
import { SERVER_URL } from '../../providers/constants/constants';
// import { Testability } from '@angular/core/src/testability/testability';
import { DetailsEnterpriseModule } from '../../module/DetailsEnterprise';
import { GalleryModal } from 'ionic-gallery-modal';
import { ModalController, NavController, AlertController,ViewController } from 'ionic-angular';
 
@Component({
  selector: 'new-details-foot',
  templateUrl: 'new-details-foot.html'
})
export class NewDetailsFootComponent implements OnChanges {

  public change: any = "introduce";  //默认选中


  //enterprise数据
  @Input() details_enterprise: DetailsEnterpriseModule;
  //project的数据
  @Input() details_project;
  //id
  @Input() Pageid: number;
  //type
  @Input() Pagetype: number;
  //接受合同身份证营业执照等图片
  @Input() details_conpany;
  //历史记录
  @Input() details_record;
  //默认为true，用于判断上啦加载..
  @Input() loadingJudge: boolean;
  @Output()
  search = new EventEmitter();

  public size = 1;    //上啦加载页数

  /*贷后信息  */
  public After;
  public F02;
  public F03;
  public F04;
  public F05;
  public F06;
  public F07;
  public F08;
  public F09;

  public cardPhotos = [];     //身份证照片
  public licencePhotos = [];  //营业执照照片
  public contractPhotos = [];       //合同相关照片



  public dys = [];     //抵押物数组
  public hasRelevant;  //判断身份证等。。图片是否存在
  public relevant: any = [];//合同文件
  public relevantFirst: any = [];  //身份证
  public relevanSecond: any = []; //营业执照
  public relevanThrid: any = [];   //担保图

  public SERVERURL: any = SERVER_URL;
  public intern = [];

  

  // this.search.emit(this.size);
  //上啦
  doInfinite(infiniteScroll) {
    if (this.details_record.length >= 20) {
      setTimeout(() => {
        this.loadingJudge = true;
        this.size++;
        this.record_loading(this.Pageid, this.size);
        infiniteScroll.complete();
      }, 300);
    } else {
      setTimeout(() => {
        this.loadingJudge = false;
        console.log('数据不足20')
        infiniteScroll.complete();
      }, 300);
    }
  }

  //上啦加载接口。。不会对父类布局有影响
  record_loading(id, size) {
    if (this.Pagetype == 2 || this.Pagetype == 0) {
      this.intern = this.details_record;
      this.api.bidAsynTbjl(id, size)
        .map(data => data.json())
        .subscribe(data => {
          if (size <= data.reserve) {
            for (let i = 0; i < data.data.length; i++) {
              this.intern.push(data.data[i]);
            }
            this.details_record = this.intern;
          } else {
            this.loadingJudge = false;
          }
        })
    } else if (this.Pagetype == 1) {
      this.intern = this.details_record;
      this.api.bidAsynTbjlTYB(id, size)
        .map(data => data.json())
        .subscribe(data => {
          if (size <= data.reserve) {
            for (let i = 0; i < data.data.length; i++) {
              this.intern.push(data.data[i]);
            }
            this.details_record = this.intern;
          } else {
            this.loadingJudge = false;
          }
        })
    }
  }

  ngOnChanges(OnChanges) {
    /* ID和type */
    this.Pageid;
    this.Pagetype;
    /* 项目简介 */
    this.details_project;        //接口
    this.details_enterprise;    //接口
    console.log('ID:' + this.Pageid + '------------type:' + this.Pagetype);

    /* 如果hasDhxx是true则赋值；否则 */
    if (this.details_project.hasDhxx == 'true') {
      this.After = this.details_project.t6242;
      this.F02 = this.After.F02;
      this.F03 = this.After.F03;
      this.F04 = this.After.F04;
      this.F05 = this.After.F05;
      this.F06 = this.After.F06;
      this.F07 = this.After.F07;
      this.F08 = this.After.F08;
      this.F09 = this.After.F09;
      console.log(this.details_project.t6242);
    };
 
    /* 更多详情 */
    if( this.details_enterprise.dy=='S'){
      this.dys = this.details_enterprise.dys;    //抵押物    
      console.group('抵押物')
      console.log(this.dys);
      console.groupEnd();
    }else{

    };
    this.hasRelevant = this.details_enterprise.hasRelevant; //判断身份证等。。图片是否存在
    console.log(this.details_conpany)
    if (this.hasRelevant) {
      for (let i = 0; i < this.details_conpany.length; i++) {
        if (this.details_conpany[0] != undefined) {
          this.relevantFirst = this.details_conpany[0];
        };
        if (this.details_conpany[1] != undefined) {
          this.relevanSecond = this.details_conpany[1];
        };
        if (this.details_conpany[2] != undefined) {
          this.relevanThrid = this.details_conpany[2];
        };
        if(this.details_conpany[i].details!= undefined&&this.details_conpany[i].details){
          this.relevant = this.details_conpany[i].details;
        };
    
      }
      console.group('图片')
      console.log(this.details_conpany);
      console.log(this.relevantFirst);
      console.log(this.relevanSecond);
      console.log(this.relevanThrid);
      console.log(this.relevant);
      console.groupEnd();
    } else {
      console.log("图片为空");
    };

    this.details_record;  //监视上啦加载的变化
    this.loadingJudge;   //是否需要上啦加载..

    console.group('历史记录')
    console.log('Pagetype:' + this.Pagetype);
    console.log(this.details_record);
    console.groupEnd();


  }

  constructor(
    public navCtrl: NavController,
    public api: ApiServiceProvider,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController
  ) { }



  /* 循环图片，有上一张和下一张效果 */
  //银行卡
  private card(item) {
    for (let i = 0; i < this.relevantFirst.details.length; i++) {
      this.cardPhotos.push({ url: this.SERVERURL + this.relevantFirst.details[i].imag, });
    }
    this.cardPhotos[0].title = '身份证正面';
    this.cardPhotos[1].title = '身份证反面';
    console.log(item);    //下角标
    console.log(this.cardPhotos);
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.cardPhotos,
      initialSlide: item,
    });
    modal.present();
  }

  //执照
  private licence(item) {
    for (let i = 0; i < this.relevanSecond.details.length; i++) {
      this.licencePhotos.push({ url: this.SERVERURL + this.relevanSecond.details[i].imag, });
      this.licencePhotos[i].title = '营业执照';
    }
    console.log(item);   //下角标
    console.log(this.licencePhotos);
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.licencePhotos,
      initialSlide: item,
    });
    modal.present();
  }

  //合同
  private contract(item) {
    for (let i = 0; i < this.relevanThrid.details.length; i++) {
      this.contractPhotos.push({ url: this.SERVERURL + this.relevanThrid.details[i].imag, });
      this.contractPhotos[i].title = '合同相关证件';
    }
    console.log(item);      //下角标
    console.log(this.contractPhotos);
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.contractPhotos,
      initialSlide: item,
    });
    modal.present();
  }

  //点击打开？号按钮
  on_window(hkType, hkTypeIntroduce) {
    let alert = this.alertCtrl.create({
      title: hkType,
      subTitle: hkTypeIntroduce,
      buttons: ['OK']
    });
    alert.present();
  }

  //下拉关闭
  swipeEvent(e){
    console.log(e);
    if(e.direction==16){
      this.viewCtrl.dismiss();
    console.log('执行成功');
   }else{
     return false;
   }
}
}

