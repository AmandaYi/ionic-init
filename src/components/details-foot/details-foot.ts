import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { ApiServiceProvider } from './../../providers/api-service/api-service';
import { NavController } from 'ionic-angular';
import { DetailsProjectModule } from '../../module/DetailsProject';
import { DetailsEnterpriseModule } from '../../module/DetailsEnterprise';
import { SERVER_URL } from '../../providers/constants/constants';
import { Testability } from '@angular/core/src/testability/testability';
 

 

@Component({
  selector: 'details-foot',
  templateUrl: 'details-foot.html'
})
export class DetailsFootComponent implements OnInit, OnChanges {

  public change: any = "introduce";  //默认选中

   
  //enterprise数据
  @Input() details_enterprise: DetailsEnterpriseModule;
  //project的数据
  @Input() details_project: DetailsProjectModule;
  //id
  @Input() Pageid: number;
  //接受合同身份证营业执照等图片
  @Input() details_conpany;
  //历史记录
  @Input() details_record;
  //默认为true，用于判断上啦加载..
  @Input() loadingJudge: boolean;
  @Output()
  search = new EventEmitter();

  public size = 1;    //上啦加载页数
  public type;      //标类型
  //  public  size_judge:boolean=true;  //默认为true   
  /* 项目简介：是否存在这些属性，通过html里ngclass判断 */
  public db = 'F';      //本息保障
  public lx = 'F';     //投即计息
  public zr = 'F';    //90天可转
  public dy = 'F';   //资产抵押

  /* 普通标 */
  public bidTitle; //标题
  public bidtype;  //用于判断是什么标 0普通,1体验,null债券 ;默默隐藏
  public amount;  //项目规模【金额】
  public paymentType; //还款方式
  public endTime;    //到期时间
  public guarantee; //担保机构
  public qxTime: number;   //判断 起息时间
  public projectendTime; //项目到期时间

  /* 企业项目 */
  public desc;    //借款描述
  public bidUse;  //借款用途
  public repaySource; //还款来源
  public regYear;   //注册年限
  public regAmount;  //注册资金
  public earnAmount; //资产净值
  public cash;      //上年度现金流入
  public business;  //行业
  public complaints; //涉诉情况
  public credit;    //征信情况
  public operation; //经营情况
  public dys = [];     //抵押物数组
  public dbjg;     //担保机构
  public dbdesc;  //担保机构介绍
  public dbinfo;   //担保情况
  public fkcs;    //风险控制措施
  public fdbinfo; //反担保情况
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
      }, 1000);
    } else {
      setTimeout(() => {
        this.loadingJudge = false;
        console.log('数据不足20')
        infiniteScroll.complete();
      }, 500);
    }
  }

  //上啦加载接口。。不会对父类布局有影响
  record_loading(id, size) {
    if (this.bidtype == undefined || this.bidtype == 0) {
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
    } else if (this.bidtype == 1) {
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

    /* 项目简介 */
    this.details_project;        //接口
    this.details_enterprise;    //接口
    this.db = this.details_enterprise.db;     //本息保障
    this.lx = this.details_enterprise.lx;    //投即计息
    this.zr = this.details_enterprise.zr;   //90天可转
    this.dy = this.details_enterprise.dy;  //资产抵押
    console.group('项目简介--是否隐藏[保，计，转，抵] F=隐藏，S=显示')
    console.log(this.db);
    console.log(this.lx);
    console.log(this.zr);
    console.log(this.dy);
    console.groupEnd();

    this.bidTitle = this.details_project.bidTitle;  //标题
    this.amount = this.details_project.amount;    //项目规模【金额】
    this.paymentType = this.details_project.paymentType; //还款方式
    this.endTime = this.details_project.ckEndTime;//到期时间
    this.guarantee = this.details_project.guarantee; //担保机构
    this.qxTime = this.details_project.qxTime;    //判断起息时间
    this.bidtype = this.details_project.bidtype;  //用于判断是什么标 0普通,1体验,null债券 
    this.projectendTime = this.details_project.endTime;  //项目到期时间
    /* 更多详情 */
    this.bidUse = this.details_enterprise.bidUse; //借款用途
    this.repaySource = this.details_enterprise.repaySource; //还款来源
    this.regYear = this.details_enterprise.regYear;   //注册年限 
    this.regAmount = this.details_enterprise.regAmount;  //注册资金
    this.earnAmount = this.details_enterprise.earnAmount; //资产净值
    this.cash = this.details_enterprise.cash;      //上年度现金流入
    this.business = this.details_enterprise.business;  //行业
    this.complaints = this.details_enterprise.complaints; //涉诉情况
    this.credit = this.details_enterprise.credit;    //征信情况
    this.operation = this.details_enterprise.operation; //经营情况
    this.dys = this.details_enterprise.dys;    //抵押物

    this.dbjg = this.details_enterprise.dbjg;     //担保机构
    this.dbdesc = this.details_enterprise.dbdesc;  //担保机构介绍
    this.dbinfo = this.details_enterprise.dbinfo;   //担保情况
    this.fkcs = this.details_enterprise.fkcs;    //风险控制措施
    this.fdbinfo = this.details_enterprise.fdbinfo; //反担保情况

    this.hasRelevant = this.details_enterprise.hasRelevant; //判断身份证等。。图片是否存在
    console.log(this.details_conpany)
    if (this.details_conpany) {
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
        // this.relevant = this.details_conpany[i].details;

      }
      
   
      console.group('图片')
      console.log(this.details_conpany);
      console.log(this.relevantFirst);
      console.log(this.relevanSecond);
      console.log(this.relevanThrid);
      // console.log(this.relevant);
      console.groupEnd();
    } else {
      console.log("图片为空");
    };

    this.Pageid;          //获取页面ID
    this.details_record;  //监视上啦加载的变化
    this.loadingJudge;   //是否需要上啦加载..

    console.group('历史记录')
    console.log('bidtype:' + this.bidtype);
    console.log(this.details_record);
    console.groupEnd();

    console.group('抵押物')
    console.log(this.dys);
    console.groupEnd();
  }


  ngOnInit() {
  }

  constructor(
    public navCtrl: NavController, 
    public api: ApiServiceProvider,
     ) { }
  
  //图片扩大
  itemSelected(item){
    console.log(item);
  }
}

