import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddbankPage } from './addbank';

@NgModule({
  declarations: [
    AddbankPage,
  ],
  imports: [
    IonicPageModule.forChild(AddbankPage),
  ],
})
export class AddbankPageModule {}
