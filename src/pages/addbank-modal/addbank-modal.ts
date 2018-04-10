import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

/**
 * Generated class for the AddbankModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:"AddbankModalPage"
})
@Component({
  selector: 'page-addbank-modal',
  templateUrl: 'addbank-modal.html',
})
export class AddbankModalPage {
  public insertCity:any;      //输入城市
  public searchList:any;      //输入城市列表
  public cityList:any;        //城市列表
  public city_index:any;      //下标

  public flag:number;         //判断
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public viewCtrl:ViewController,
     public api:ApiServiceProvider
     ) {
  }

  //返回
  hide_del(){
    this.viewCtrl.dismiss();
  }

    //进入页面
  ionViewWillEnter(){
    this.city_data();
    this.init();
  }

  //初始化
  init(){

    console.log(localStorage.getItem('city'));
    console.log(typeof this.navParams.get('all_data'))
    //输入城市
    if(localStorage.getItem('data_cy')){
      this.insertCity=JSON.parse(this.navParams.get('all_data')).data_city;
      this.searchCity(this.insertCity);
      return;
    }else{
       this.flag=0;
    }

    // 选择城市
    if(localStorage.getItem('city')){
      this.city_index=JSON.parse(localStorage.getItem('city')).data_index;
      this.insertCity=JSON.parse(localStorage.getItem('city')).data_city;
    }else{
       this.flag=0; 
    } 
  }

  //输入城市
  searchCity(insertCity){
    console.log(insertCity);
    if(insertCity!=''){
        this.api.searchAddress(insertCity).map(data => data.json()).subscribe(data => {
          console.log(data);
          if (data.data) {
            if (data.data.length > 0) {
                this.searchList = data.data;
                this.flag=1;
            } else {
                this.flag=2;
            }
          }
       })
    }else{
      console.log('不查');
      this.flag=0;
    }


  }

  //选择城市
  chooseCity2(val){
    console.log(val);
    let all_data={
      data_city:val.cityName,
      data_cityId:val.cityId,    
    }

    this.insertCity=all_data.data_city;

    localStorage.setItem('city',JSON.stringify(all_data));
    localStorage.setItem('data_cy','输入城市');    
    this.viewCtrl.dismiss(all_data);
  }

  //城市裂变
  city_data(){
    this.api.hotAddress().map(data => data.json()).subscribe(data => {
       console.log(data);
        this.cityList=data.data;
    })
  }

  //选择城市
  chooseCity1(city,index){

    let all_data={
      data_city:city.cityName,
      data_cityId:city.cityId,
      data_index:index
    }

    this.city_index=all_data.data_index;
    this.insertCity=all_data.data_city;

    localStorage.setItem('city',JSON.stringify(all_data));
    localStorage.removeItem('data_cy');
    this.viewCtrl.dismiss(all_data);

  }




}
