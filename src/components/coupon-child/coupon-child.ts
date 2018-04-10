import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { NativeServiveProvider } from '../../providers/native-servive/native-servive';
import {  NavParams,ModalController } from 'ionic-angular';

@Component({
  selector: 'coupon-child',
  templateUrl: 'coupon-child.html'
})
export class CouponChildComponent implements OnInit, OnChanges {

  private inputValue: number = 50;    //输入的投资金额

  @Input() alldata;   //全部券
  @Input() JXdatas;   //加息券
  @Input() TRdatas;   //现金券
  @Output() search = new EventEmitter();

  public isuser_JX: boolean = true;   //遮罩
  public isuser_TR: boolean = true;   //遮罩
  private inputID: number = 0;            //获取input的id
  public qMZ: number = 0;                //面值F04
  public qID = [];                //券的id号F043
  public sum: number = 0              //使用条件求和F05
  private checkedTrue = [];           //已选择
  public outParam = {
  }                //output的参数



  constructor(public native: NativeServiveProvider, public navParams: NavParams) {

  }


  ngOnInit() {
    let id_value =this.navParams.get('id');  //接受发现页面传过来的： id
    let money_value  =this.navParams.get('money');  //接受发现页面传过来的：金额
    this.inputValue=money_value;
    console.log('金额:'+money_value);
    console.log('id:'+id_value);
  }

  ngOnChanges() {

  }

  getOutID(e) {
    this.inputID = e;
  }

  radioChange() {
    this.JXclick();
    this.getAllInput("JX");
  }

  checkboxChange() {
    this.TRclick();
    this.getAllInput("TR");
  }



  /**
   * @name 只使用现金券
   */
  TRclick() {
    this.isuser_TR = true;
    this.isuser_JX = false;

    //清除选中的加息券
    let all = [].slice.call(document.querySelectorAll('input[type=radio]'));
    all.forEach(item => {
      item.checked = false;
    })

  }

  /**
  * @name 只是用加息券
  */
  JXclick() {
    this.isuser_TR = false;
    this.isuser_JX = true;

    //清除选中的现金券
    let all = [].slice.call(document.querySelectorAll('input[type=checkbox]'));
    all.forEach(item => {
      item.checked = false;
    })
  }

  /** 
   * 
   */
  getAllInput(b) {
    //1-获取全部选中的input
    // let allInput = [].slice.call(document.querySelectorAll("input"));
    this.checkedTrue = this.alldata.filter((tiem: any) => tiem.checked)
    console.log(this.checkedTrue)
    console.log(this.JXdatas)

    //2-
    this.checkedTrue.forEach(element => {
      // console.log(element)
    });

    let sum_ = 0;
    let qMZ_ = 0;
    let qID_: Array<any> = [];
    switch (b) {
      case "TR":
        //1-获取全部选中的
        this.checkedTrue = this.TRdatas.filter((tiem: any) => tiem.checked)
        console.log(this.checkedTrue)
        //2-求和
        this.checkedTrue.forEach(item => {
          qID_.push(item.F03);
          sum_ += Number(item.F05);
          qMZ_ += Number(item.F04)
        })
        this.sum = sum_;
        this.qMZ = qMZ_;
        this.qID = qID_;
        if (this.inputValue >= this.sum) {
          console.log("选项符合条件")
        } else {
          console.log("选项不符合条件")
          this.TRdatas[this.inputID].checked = false; //取消最后一个的选中
          this.checkedTrue = this.TRdatas.filter((tiem: any) => tiem.checked) //重新获取全部选中
          this.sum = sum_ - this.TRdatas[this.inputID].F05;
          this.qMZ = qMZ_ - this.TRdatas[this.inputID].F04;
          this.qID = qID_.filter((tiem: any) => tiem != this.TRdatas[this.inputID].F03);
          this.native.showAlert("您的投资金额不足！");

        }
        console.log(qID_)
        console.log("券id--------------" + this.qID.join("-"));    //id字符串 
        console.log("比较求和-----------" + this.sum);
        console.log("面值求和-----------" + this.qMZ);


        this.outParam = {
          qID: "#"+this.qID.join("#"),
          qMZ: this.qMZ,
          sum: this.sum,
          type: "TR",  //现金
        }
        break;

      case "JX":
        //1-获取选中的值
        // this.JXdatas[this.inputID]

        //2-求和
        this.sum = this.JXdatas[this.inputID].F05;
        this.qMZ = this.JXdatas[this.inputID].F04;
        this.qID = this.JXdatas[this.inputID].F03;
        if (this.inputValue >= this.sum) {
          console.log("选项符合条件")
        } else {
          console.log("选项不符合条件")
          //清除选中的加息券
          let all = [].slice.call(document.querySelectorAll('input[type=radio]'));
          all.forEach(item => {
            item.checked = false;
          })

          this.sum = 0;
          this.qMZ = 0;
          this.qID = [];
          this.native.showAlert("您的投资金额不足！");
        }
        console.log("券id--------------" + this.qID);    //id字符串 
        console.log("比较求和-----------" + this.sum);
        console.log("面值求和-----------" + this.qMZ);

        this.outParam = {
          qID: "#"+this.qID,
          qMZ: this.qMZ,
          sum: this.sum,
          type: "JX",  //加息
        }

        break;
    }
    this.search.emit(this.outParam);
  }

}
