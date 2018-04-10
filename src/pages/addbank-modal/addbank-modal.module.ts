import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddbankModalPage } from './addbank-modal';

@NgModule({
  declarations: [
    AddbankModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddbankModalPage),
  ],
})
export class AddbankModalPageModule {}
