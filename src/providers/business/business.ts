import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Md5 } from 'ts-md5/dist/md5';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { ViewController, ModalController } from 'ionic-angular';

/**
 * @name 业务逻辑代码
 */

@Injectable()
export class BusinessProvider {

  constructor(public http: Http, public api: ApiServiceProvider, public modalCtrl: ModalController) {
    console.log('Hello BusinessProvider Provider');
  }

  /**
   * @name 万元收益计算逻辑
   * @param isDay  //是否为天标
   * @param month //时间
   * @param rate //年利率
   * @param money //默认为10000
   * @param paymentType //还款方式
   */

  jisuan(isDay_, month_, rate_, money_, paymentType_) {
    let isDay: string = isDay_;
    let month: number = month_;
    let rate: number = rate_;
    let money: number = money_;
    let paymentType: string = paymentType_;
    let dqsy: number = 0;
    console.log(isDay, month, rate, money, paymentType)
    if (isDay != 'F') {
      dqsy = this.earnIngForDay(isDay, month, rate, money);
      console.log(isDay, month, rate, money)
    } else {
      if (month == 1) {
        dqsy = this.earnIngForMonth(isDay, month, rate, money);
        console.log(isDay, month, rate, money)
      } else {
        if (paymentType == 'DEBX') {
          dqsy = this.earningsDebx(month, rate, money);
          console.log(month, rate, money)
        } else if (paymentType == 'DEBJ') {
          dqsy = this.earningsDebj(month, rate, money);
          console.log(month, rate, money)
        } else {
          dqsy = this.earnIngForMonth(isDay, month, rate, money);
          console.log(isDay, month, rate, money)
        }
      }
    }
    return dqsy;
  }

  //到期收益
  earnIngForDay(isDay, month, rate, money) {
    let ea: number = 0;
    ea = ((month * (rate)) / 12 * money) / 30;
    return ea;
  }

  earnIngForMonth(isDay, month, rate, money) {
    let ea: number = 0;
    ea = (month * (rate)) / 12 * money;
    return ea;
  }

  //计算收益
  oldEarningFunction(isDay, month, rate, money) {
    let ea: number = 0;
    if (isDay != 'F') { //天标
      ea = ((month * (rate)) / 12 * money) / 30;
    } else {
      ea = (month * (rate)) / 12 * money;
    }
    return ea;
  }

  Subtr(arg1, arg2) {
    let r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length; } catch (e) { r1 = 0; }
    try { r2 = arg2.toString().split(".")[1].length; } catch (e) { r2 = 0; }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return Number((arg1 * m - arg2 * m) / m);
  }

  accAdd(arg1, arg2) {
    let r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length; } catch (e) { r1 = 0; }
    try { r2 = arg2.toString().split(".")[1].length; } catch (e) { r2 = 0; }
    m = Math.pow(10, Math.max(r1, r2));
    return Number(arg1 * m + arg2 * m) / m;
  }


  DEBX(toal_, month_, year_) {
    //借款金额
    let toal: number = Number(toal_);
    //借款期限
    let month: number = Number(month_);
    //借款年利率
    let year: number = Number(year_);
    //还款方式
    //月利率
    let yln: number = Number(year) / 12;

    //最小借款金额

    // if(toal < 100 ) {
    //   return;
    // }
    //
    // if(year < 8 || year > 24) {
    //   return;
    // }

    // let myreg = /^[0-9]([0-9])*$/;
    // let yeareg=/^\d+(|\d|(\.[0-9]{1,2}))$/;
    // if(!myreg.test(toal)){
    //   return;
    // }
    // if(!yeareg.test(year)){
    //   return;
    // }

    // yln = yln/100;
    //月还本息
    let yhbx: number = ((Math.pow(1 + yln, month) * yln * toal) / (Math.pow(1 + yln, month) - 1));

    //应收利息
    let yslxh: number = 0;

    //已还本金之和
    let totalYhbj: number = 0;
    let dsbj: number = 0;
    let yhbj: number = 0;
    let interest_cur: number = 0;
    let zhdhbj = toal;
    for (let i = 1; i <= month; i++) {
      //应还利息
      interest_cur = (this.Subtr(toal, totalYhbj)) * yln;
      //应还本金
      yhbj = this.Subtr(yhbx, interest_cur);

      totalYhbj = this.accAdd(totalYhbj, yhbj);
      //待收本金
      dsbj = this.Subtr(toal, totalYhbj);

      if (i == (month - 1)) {
        zhdhbj = dsbj;
      }
      if (i == month) {
        yhbj = zhdhbj;
        //应还利息
        interest_cur = (this.Subtr(yhbx, yhbj));
        totalYhbj = this.accAdd(totalYhbj, yhbj);
        dsbj = 0;
      }



      yslxh = this.accAdd(yslxh, interest_cur);
    }
    let benxi: number = yslxh + toal;
    return yslxh;
  }


  DEBJ(toal_, month_, year_) {


    //借款金额
    // let toal = $envs.eq(0).val();
    let toal: number = Number(toal_);
    //借款期限
    // let month = $("#huanCT").text().replace("个月","");
    let month: number = Number(month_);
    //借款年利率
    // let year = $envs.eq(1).val();
    let year: number = Number(year_);
    //还款方式
    // let type=$(".likebtn.like").attr("data-attr");
    // let type = type;
    //月利率
    let yln: number = year / 12;
    // let yln = yln;
    //最小借款金额
    // let min_amount = $("#min_amount").val();
    // let min_amount = min_amount;

    // if(toal.trim() == "" || month.trim() == "" || year.trim() == "0" || parseInt(toal) < parseInt(min_amount)){
    //   return;
    // }

    // if(toal < 100 ) {
    //   return;
    // }
    //
    // if(year < 8 || year > 24) {
    //   return;
    // }

    // let myreg = /^[0-9]([0-9])*$/;
    // let yeareg=/^\d+(|\d|(\.[0-9]{1,2}))$/;
    // if(!myreg.test(toal)){
    //   return;
    // }
    // if(!yeareg.test(year)){
    //   return;
    // }

    //等额本金
    // $("#mthns").html("¥"+month);
    // $("#mtoal").html("¥"+ (toal) );


    // $(".jstr").html("");
    // let content='<li style="background-color:#f4f4f4">';
    // content+='<div class="h1">期次</div>';
    // content+='<div class="h1">偿还本息</div>';
    // content+='<div class="h1">偿还利息</div>';
    // content+='<div class="h1">偿还本金</div>';
    // content+='<div class="h1" style="border:none;">剩余本金</div>';
    // content+='</li>';

    let new_ysbx: number = 0;
    let new_ysbj: number = 0;
    let new_yslx: number = 0;
    let new_sybj: number = 0;
    let yslxTotle: number = 0;
    let ysbjTotle: number = 0;

    for (let i = 1; i <= month; i++) {
      new_yslx = (toal - ysbjTotle) * (yln);
      ysbjTotle = ysbjTotle + new_ysbj;
      new_ysbx = new_yslx + new_ysbj;
      new_sybj = toal - new_ysbj * i;

      // if(i%2==1){
      //   content+='<li>';
      // }else{
      //   content+='<li style="background-color:#f4f4f4">';
      // }
      // content+='<div class="h2">'+i+'</div>';
      // content+='<div class="h2" id="ysbx'+i+'">¥'+new_ysbx +'</div>';
      // content+='<div class="h2" id="yslx'+i+'">¥'+new_yslx +'</div>';
      // content+='<div class="h2" id="ysbj'+i+'">¥'+new_ysbj +'</div>';
      // content+='<div class="h2" id="dsbj'+i+'" style="border:none;" >¥'+new_sybj +'</div>';
      // content+='</li>';

      yslxTotle = this.accAdd(yslxTotle, new_yslx);

    }
    let tt: number = yslxTotle;
    let benxi: number = tt + toal;
    // $("#ghbx").html("¥"+benxi );
    // $(".jstr").append(content);
    return tt;

  }

  YCFQ(toal_, month_, year_) {


    //借款金额
    // let toal = $envs.eq(0).val();
    let toal: number = Number(toal_);
    //借款期限
    // let month = $("#huanCT").text().replace("个月","");
    let month: number = Number(month_);
    //借款年利率
    // let year = $envs.eq(1).val();
    let year: number = Number(year_);
    //还款方式
    // let type=$(".likebtn.like").attr("data-attr");
    // let type = type;
    //月利率
    let yln: number = year / 12;
    // let yln = yln;
    //最小借款金额
    // let min_amount = $("#min_amount").val();
    // let min_amount = min_amount;

    // if(toal.trim() == "" || month.trim() == "" || year.trim() == "0" || parseInt(toal) < parseInt(min_amount)){
    //   return;
    // }
    //
    // if(toal < 100 ) {
    //   return;
    // }
    //
    // if(year < 8 || year > 24) {
    //   return;
    // }

    let myreg = /^[0-9]([0-9])*$/;
    let yeareg = /^\d+(|\d|(\.[0-9]{1,2}))$/;
    // if(!myreg.test(toal)){
    //   return;
    // }
    // if(!yeareg.test(year)){
    //   return;
    // }

    //一次还清
    let yslx: number = yln * toal * month;
    // $("#mthns").html("¥"+month);
    // $("#mtoal").html("¥"+ (toal) );
    // $("#ghbx").html("¥"+( (toal)+ (yslx)) );

    // $(".jstr").html("");
    // let content='<li style="background-color:#f4f4f4">';
    // content+='<div class="h1">期次</div>';
    // content+='<div class="h1">偿还本息</div>';
    // content+='<div class="h1">偿还利息</div>';
    // content+='<div class="h1">偿还本金</div>';
    // content+='<div class="h1">剩余本金</div>';
    // content+='</li>';

    for (let i = 1; i <= month; i++) {
      let new_ysbx: number = 0;
      let new_ysbj: number = 0;
      let new_yslx: number = 0;
      let new_sybj: number = toal;
      if (i == month) {
        new_yslx = yslx;
        new_ysbj = toal;
        new_ysbx = new_yslx + new_ysbj;
        new_sybj = 0;
      }
      // if(i%2==1){
      //   content+='<li>';
      // }else{
      //   content+='<li style="background-color:#f4f4f4">';
      // }
      // content+='<div class="h2">'+i+'</div>';
      // content+='<div class="h2" id="ysbx'+i+'">¥'+new_ysbx +'</div>';
      // content+='<div class="h2" id="yslx'+i+'">¥'+new_yslx +'</div>';
      // content+='<div class="h2" id="ysbj'+i+'">¥'+new_ysbj +'</div>';
      // content+='<div class="h2" id="dsbj'+i+'" style="border:none;">¥'+new_sybj +'</div>';
      // content+='</li>';
    }

    // $(".jstr").append(content);
    return yslx;

  }

  MYFX(toal_, month_, year_) {


    //借款金额
    let toal: number = Number(toal_);
    //借款期限
    let month: number = Number(month_);
    //借款年利率
    let year: number = Number(year_);
    //还款方式
    // let type=$(".likebtn.like").attr("data-attr");
    // let type = type;
    //月利率
    let yln: number = year / 12;
    // let yln = yln;
    //最小借款金额
    // let min_amount = $("#min_amount").val();
    // let min_amount = min_amount;

    // if(toal.trim() == "" || month.trim() == "" || year.trim() == "0" || parseInt(toal) < parseInt(min_amount)){
    //   return;
    // }
    //
    // if(toal < 100 ) {
    //   return;
    // }
    //
    // if(year < 8 || year > 24) {
    //   return;
    // }
    //
    // let myreg = /^[0-9]([0-9])*$/;
    // let yeareg=/^\d+(|\d|(\.[0-9]{1,2}))$/;
    // if(!myreg.test(toal)){
    //   return;
    // }
    // if(!yeareg.test(year)){
    //   return;
    // }

    //月还本息
    let yslx: number = yln * toal;
    // $("#mthns").html("¥"+month);
    // $("#mtoal").html("¥"+ (toal) );
    let yslxTotle: number = 0;

    // $(".jstr").html("");
    // let content='<li style="background-color:#f4f4f4">';
    // content+='<div class="h1">期次</div>';
    // content+='<div class="h1">偿还本息</div>';
    // content+='<div class="h1">偿还利息</div>';
    // content+='<div class="h1">偿还本金</div>';
    // content+='<div class="h1">剩余本金</div>';
    // content+='</li>';

    for (let i = 1; i <= month; i++) {
      let new_ysbx: number = 0;
      let new_ysbj: number = 0;
      let new_yslx: number = 0;
      let new_sybj: number = toal;
      new_yslx = yslx;
      if (i == month) {
        new_ysbj = toal;
        new_sybj = 0;
      }
      new_ysbx = new_yslx + new_ysbj;

      // if(i%2==1){
      //   content+='<li>';
      // }else{
      //   content+='<li style="background-color:#f4f4f4">';
      // }
      // content+='<div class="h2">'+i+'</div>';
      // content+='<div class="h2" id="ysbx'+i+'">¥'+new_ysbx +'</div>';
      // content+='<div class="h2/**/" id="yslx'+i+'">¥'+new_yslx +'</div>';
      // content+='<div class="h2" id="ysbj'+i+'">¥'+new_ysbj +'</div>';
      // content+='<div class="h2" id="dsbj'+i+'" style="border:none;">¥'+new_sybj +'</div>';
      // content+='</li>';
      yslxTotle = this.accAdd(yslxTotle, new_yslx);
    }
    let benxi = yslxTotle + toal;

    return yslxTotle;
    // $("#ghbx").html("¥"+benxi );
    //
    // $(".jstr").append(content);
  }


  //计算等额本息收益
  earningsDebx(month_, rate_, money_) {
    let month: number = Number(month_);
    let rate: number = Number(rate_);
    let money: number = Number(money_);
    //已收利息和
    let yslxh: number = 0;
    //已还本金之和
    let totalYhbj: number = 0;
    let dsbj: number = 0;
    let yhbj: number = 0;
    //上期还款
    let sqhh;
    //月利率
    let yln = rate / 12;
    let yhbx = ((Math.pow(1 + yln, month) * yln * money) / (Math.pow(1 + yln, month) - 1));
    let content;
    let zhdhbj;
    let interest_cur;
    for (let i = 1; i <= month; i++) {
      //应还利息
      interest_cur = (this.Subtr(money, totalYhbj) * yln);
      //应还本金
      yhbj = this.Subtr(yhbx, interest_cur);
      totalYhbj = this.accAdd(totalYhbj, yhbj);
      //待收本金
      dsbj = this.Subtr(money, totalYhbj);
      if (i == (month - 1)) {
        zhdhbj = dsbj;
      }
      if (i == month) {
        yhbj = zhdhbj;
        //应还利息
        interest_cur = this.Subtr(yhbx, yhbj);
        totalYhbj = this.accAdd(totalYhbj, yhbj);
        dsbj = 0;
      }
      content += yhbj + '：' + interest_cur + '\n';
      yslxh = this.accAdd(yslxh, interest_cur);
    }
    //alert(content);
    return yslxh;
  }

  //计算等额本金收益
  earningsDebj(month_, rate_, toal_) {
    let month: number = Number(month_);
    let rate: number = Number(rate_);
    let toal: number = Number(toal_);
    //月利率
    let yln: number = (rate) / 12;
    let new_ysbx: number = 0;
    let new_ysbj: number = 0;
    let new_yslx: number = 0;
    let new_sybj: number = 0;
    let yslxTotle: number = 0;
    let ysbjTotle: number = 0;
    new_ysbj = (toal / month);
    // let content="";
    for (let i = 1; i <= month; i++) {
      new_yslx = (toal - ysbjTotle) * (yln);
      ysbjTotle = ysbjTotle + new_ysbj;
      new_ysbx = new_yslx + new_ysbj;
      new_sybj = toal - new_ysbj * i;
      yslxTotle = this.accAdd(yslxTotle, new_yslx);
      //content+=(new_ysbj+","+new_yslx+"\n");
    }
    return yslxTotle;
  }
  //计算等额滚动收益
  earningsDebxGd(month_, rate_, money_) {
    let month: number = Number(month_);
    let rate: number = Number(rate_);
    let money: number = Number(money_);
    let interest_cur: number = 0;
    //已收利息和
    let yslxh: number = 0;
    //已还本金之和
    let totalYhbj: number = 0;
    let dsbj: number = 0;
    let yhbj: number = 0;
    //上期还款
    let sqhh;
    //月利率
    let yln: number = (rate) / 12;
    let yhbx: number = ((Math.pow(1 + yln, month) * yln * money) / (Math.pow(1 + yln, month) - 1));
    // let content;
    let zhdhbj;
    for (let i = 1; i <= month; i++) {
      //应还利息,滚动利息=本金不还，加上每月利息复投
      interest_cur = this.accAdd(money, yslxh) * yln;
      //interest_cur =  (Subtr(toal,totalYhbj)*yln) ;
      //应还本金
      yhbj = (this.Subtr(yhbx, interest_cur));
      //已还本金
      totalYhbj = this.accAdd(totalYhbj, yhbj);
      //待收本金
      dsbj = (this.Subtr(month, totalYhbj));
      if (i == (month - 1)) {
        zhdhbj = dsbj;
      }
      //content+=i+'：'+interest_cur+'\n';
      yslxh = this.accAdd(yslxh, interest_cur);
    }
    return yslxh;
  }

  //计算等额滚动收益
  earningsDebjGd(month_, rate_, toal_) {
    let month: number = Number(month_);
    let rate: number = Number(rate_);
    let toal: number = Number(toal_);
    //月利率
    let yln: number = (rate) / 12;
    let new_ysbx: number = 0;
    let new_ysbj: number = 0;
    let new_yslx: number = 0;
    let new_sybj: number = 0;
    //已收利息
    let yslxTotle: number = 0;
    let ysbjTotle: number = 0;
    // let content="";
    new_ysbj = (toal / month);
    for (let i = 1; i <= month; i++) {
      new_yslx = toal * (yln) + yslxTotle * yln;
      ysbjTotle = ysbjTotle + new_ysbj;
      new_ysbx = new_yslx + new_ysbj;
      new_sybj = toal - new_ysbj * i;
      yslxTotle = this.accAdd(yslxTotle, new_yslx);
      //content+=new_yslx+"\n";
    }
    return yslxTotle;
  }


}
