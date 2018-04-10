import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyInvesDetailPage } from './my-inves-detail';

@NgModule({
  declarations: [
    MyInvesDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MyInvesDetailPage),
  ],
})
export class MyInvesDetailPageModule {}
