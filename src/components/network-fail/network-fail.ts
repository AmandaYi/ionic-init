import { Network } from '@ionic-native/network';
import { NativeServiveProvider } from './../../providers/native-servive/native-servive';
import { NavController } from 'ionic-angular';
import { Component, Input, Output, EventEmitter } from '@angular/core';

 
@Component({
  selector: 'network-fail',
  templateUrl: 'network-fail.html'
})
export class NetworkFailComponent {
  net:any;

  constructor(public navCtrl:NavController,public native:NativeServiveProvider,
    public network:Network
  ) {
  }

  @Input() test:boolean;

  @Output() getNet = new EventEmitter<any>();

  networkType(n) {
    this.getNet.emit('nihao');
  }
 
  networkFail(){
    this.navCtrl.push('NeverNetworkPage');
  }
}
