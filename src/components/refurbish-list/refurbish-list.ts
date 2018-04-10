 import { Component,Input,OnChanges,OnInit,Output,EventEmitter } from '@angular/core';
  import { IonicPage, NavController, NavParams } from 'ionic-angular';
 
  
@Component({
  selector: 'refurbish-list',
  templateUrl: 'refurbish-list.html'
})
export class RefurbishListComponent implements OnInit,OnChanges {
  //双向绑定的公共变量;
  //接受父类数据  page是刷新状态
   @Input() page: any;
  
   //向父类提交数据
   @Output() 
   search  =  new EventEmitter();


   public tsuki=2;
    //监视父类变化
  ngOnChanges(OnChanges) {
    this.ngOnInit();

  
  }


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  //onint里处理的东西， 父类才能接受;  
  ngOnInit() {
    console.group('从父类接受到的值')
    console.log(this.page);
    console.groupEnd;

    this.search.emit(this.tsuki);
    
  
  }

  
}
