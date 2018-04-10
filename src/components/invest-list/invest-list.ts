import { ApiServiceProvider } from './../../providers/api-service/api-service';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'invest-list',
  templateUrl: 'invest-list.html'
})
export class InvestListComponent implements OnChanges {


  //双向绑定的公共变量;
  //接受父类数据 datas是接口状态[1是首页，2是投资页的普通标，3是投资页的债券标]， page是刷新状态。刷新变化 1和0之间的变化, re进入页面重新刷新
  @Input() datas: any;
  @Input() page: any;
  //向父类提交数据
  @Output()
  search = new EventEmitter();
  //监视父类变化
  ngOnChanges(OnChanges) {
    this.page;
    this.datas;

    this.data();

    this.down();
    console.log('datas:' + this.datas + "----------" + "page:" + this.page);


  }


  public Pcontent: any;    // 普通标
  public Zcontent: any;  // 债券转让
  /** 
   * @name     体验标 --json只能一个个赋值取出来；
   * @param    releaseTime：    时间
   * @param    rate：         百分率
   * @param    isDay          用于判断；S是天数，F是月份
   * @param    cycle         根据isDay，标的期限
   * @param    status        判断按钮所显示的状态
   * @param    remainAmount  可投金额 
    */
  public Tcontent: any;
  public Tcontent_type: number;
  public releaseTime: any;
  public rate: number;
  public isDay: any;
  public cycle: number;
  public status: any;
  public remainAmount: number;
  public Tcontent_id: number;
  public pageindex: number = 1;
  public pagesize: number = 10;
  public bond_Index: number = 1;  //债券上啦加载的计算
  public view_Judges: boolean = false; //当上啦加载已经加载不到数据时，告诉父类

  public searchTime: boolean = true; //限制查询接口的时间，每0.2秒只允许查询一次接口。为了防止上啦加载和下拉刷新过多浪费资源

  public RE_Judge: boolean = true;

  constructor(
    public navCtrl: NavController,
    public apiservice: ApiServiceProvider,
    public navParams: NavParams,
    public events: Events
  ) {
    this.reSet();
  }
  //第一次加载
  ionViewWillEnter() { }

  //下拉刷新
  down() {
    if (this.page == 1) {
      this.data();
    };
  }

  data() {
    if (this.datas == '1') {
      this.itemlist(1, 10);
      this.contentlist();
    } else if (this.datas == '2' || this.datas == '3') {
      this.itemlist(1, 10);
    };
  }


  /**
   * @name 组件标列表接口--包含了首页个列表
   * @param datas:父类和子类建立交互的标记; 根据父类定义，子类来判断是哪个页面的父类传过来的
   * @param Pcontent:普通标
   * @param Zcontent:债权转让
   * @param Parr: 局部普通标--用来循环接受普通标的值
   * @param Zarr:局部债权转让--用来循环接受债权的值
   * @param pageindex:查询显示开始数--从1开始；       
   * @param pagesize:查询显示条数--每次查询显示条数。 主要作用是刷新时显示几条；基本不变
   */
  //普通表和债券表数据;
  itemlist(start, size) {
    if (this.searchTime == true) {
      this.searchTime = false;
      //  首页所显示的标，普通标和债券转让
      if (this.datas == 1) {
        let Parr = [];
        let Zarr = [];
        this.apiservice.bidExperIndex()
          .map(data => data.json())
          .subscribe
          (data => {
            for (let i = 0; i < data.data.length; i++) {
              if (data.data[i].type == '0') {
                Parr.push(data.data[i]);
              } else if (data.data[i].type == '2') {
                Zarr.push(data.data[i]);
              }
            }
            this.Pcontent = Parr;
            this.Zcontent = Zarr;
            console.group('首页普通标和债券数据')
            console.log(this.Pcontent);
            console.log(this.Zcontent);
            console.groupEnd();
          }
          )
      }
      else if (this.datas == '2') {
        this.apiservice.bidList(start, size)
          .map(data => data.json())
          .subscribe(
          data => {
            if (data.code = '000000') {
              if (data.data.length % 10 == 0 && data.data.length > 0) {
                this.Pcontent = data.data;
                this.pageindex = 2;
                this.view_Judges = true;
                this.search.emit(this.view_Judges);
                console.group('普通条数')
                console.log(this.datas);
                console.log(data);
                console.groupEnd();
              } else {
                this.Pcontent = data.data;
                this.view_Judges = false;
                this.search.emit(this.view_Judges);
                this.pageindex = 2;
              }
            }
          })
      } else if (this.datas == '3') {
        this.apiservice.creditorList(start, size)
          .map(data => data.json())
          .subscribe(
          data => {
            if (data.code = '000000') {
              if (data.data.length % 10 == 0 && data.data.length > 0) {
                this.Zcontent = data.data;
                this.bond_Index = 2;
                this.view_Judges = true;
                this.search.emit(this.view_Judges);
                console.group('债券条数')
                console.log(this.datas);
                console.log(data);
                console.groupEnd();
              } else {
                this.Zcontent = data.data;
                this.bond_Index = 2;
                this.view_Judges = false;
                this.search.emit(this.view_Judges);
              }
            }
          })
      };
    } else {
      console.log('稍等 0.2秒')
    };
    setTimeout(() => {
      this.searchTime = true;
    }, 200);
  }
  // 体验标,然后唯独取出其体验标才
  contentlist() {
    //声明。保存全部体验标
    let Tarr = [];
    let firstTarr = [];
    this.apiservice.bidExperList()
      .map(data => data.json()).subscribe(
      data => {
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].type == '1') {
            Tarr.push(data.data[i]);
          }
        }
        //赋值，然后读取出索引0的体验标。
        let firstTarr = Tarr;
        this.Tcontent = firstTarr[0];
        // 当Tcontent内存在值才实例化；
        if (this.Tcontent != null && this.Tcontent != undefined) {
          this.Tcontent_id = firstTarr[0].id;
          this.Tcontent_type = firstTarr[0].type;
          this.rate = firstTarr[0].rate;
          this.isDay = firstTarr[0].isDay;
          this.cycle = firstTarr[0].cycle;
          this.status = firstTarr[0].status;
          this.remainAmount = firstTarr[0].remainAmount;
          console.group('体验标')
          console.log(this.Tcontent);
          console.groupEnd();
        }
      }
      )

  }

  //上拉加载
  doInfinite(infiniteScroll) {
    setTimeout(() => {
      let start = this.pageindex;
      let size = this.pagesize;
      let bond_Index = this.bond_Index;
      console.log(this.pageindex);
      if (this.datas == '2') {
        ++this.pageindex;
        this.apiservice.bidList(start, size)
          .map(data => data.json())
          .subscribe(
          data => {
            console.group('执行前');
            console.log(this.Pcontent)
            console.log(this.pageindex)
            console.groupEnd();
            if (data.code = '000000') {
              if (data.data.length % 10 == 0 && data.data.length > 0) {
                this.Pcontent = this.Pcontent.concat(data.data);
                console.group('执行后');
                console.log(this.Pcontent)
                console.groupEnd();
                this.view_Judges = true;
                this.search.emit(this.view_Judges);
              } else {
                this.Pcontent = this.Pcontent.concat(data.data);
                console.group('执行后,已全部加载完毕,不再执行。');
                console.log(this.Pcontent)
                console.groupEnd();
                this.view_Judges = false;
                this.search.emit(this.view_Judges);
              };
            };
          })
      } else if (this.datas == '3') {
        ++this.bond_Index;
        this.apiservice.creditorList(bond_Index, size)
          .map(data => data.json())
          .subscribe(
          data => {
            console.group('执行前');
            console.log(this.Zcontent)
            console.log(this.bond_Index)
            console.groupEnd();
            if (data.code = '000000') {
              if (data.data.length % 10 == 0 && data.data.length > 0) {
                this.Zcontent = this.Zcontent.concat(data.data);
                console.group('执行后');
                console.log(this.Zcontent)
                console.groupEnd();
                this.view_Judges = true;
                this.search.emit(this.view_Judges);
              } else {
                this.Zcontent = this.Zcontent.concat(data.data);
                console.group('执行后,已全部加载完毕,不再执行。');
                console.log(this.Zcontent)
                console.groupEnd();
                this.view_Judges = false;
                this.search.emit(this.view_Judges);
              };
            };
          })
      }
      infiniteScroll.complete();
    }, 300);

  }
  //跳转到标的详情
  on_list_details(id, type) {
    this.navCtrl.push('ListDetailsPage', { id: id, type: type });
  }
  //同步刷新
  reSet() {
    let i = 1;
    console.log(this.RE_Judge + '不限定执行:' + i++);
    if (this.RE_Judge) {
      this.RE_Judge = false;
      this.events.subscribe('user:RE', (user) => {
        this.itemlist(1, 10);
        console.log(this.RE_Judge + '限定执行' + user);
      })
    };
    setTimeout(() => {
      this.RE_Judge = true;
    }, 2000);
  }

  //跳转到债权
  on_invest_details(id, cid, bid) {

    console.log('因为债权标。在home[首页]页面和list[投资]页面，所需参数不一，重叠问题。 在home页面id是标id,cid是债权id。。在list页面id是债权id，bid是标id：' + this.datas)
    if (this.datas == 1) {
      this.navCtrl.push('ListDetailsPage', { id: id, type: 2, cid: cid });
    } else {
      this.navCtrl.push('ListDetailsPage', { id: bid, type: 2, cid: id });
    }
  }
}
