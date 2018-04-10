import { Component } from '@angular/core';
import { NavParams,NavController } from 'ionic-angular';
import { HomePage } from '../home/home';



 
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage   {
  public Index:number =0;

  tab1Root = 'HomePage';  
  tab2Root = 'ListPage';
  tab3Root ='ContactPage';
  tab4Root = 'MePage';
 
    constructor(
     public navCtrl: NavController,
  ) {
  
  }

   
}
