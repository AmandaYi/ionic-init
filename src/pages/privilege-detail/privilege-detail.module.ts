import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrivilegeDetailPage } from './privilege-detail';

@NgModule({
  declarations: [
    PrivilegeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PrivilegeDetailPage),
  ],
})
export class PrivilegeDetailPageModule {}
