import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankcardPage } from './bankcard';

@NgModule({
  declarations: [
    BankcardPage,
  ],
  imports: [
    IonicPageModule.forChild(BankcardPage),
  ],
})
export class BankcardPageModule {}
