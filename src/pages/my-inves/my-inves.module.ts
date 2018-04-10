import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyInvesPage } from './my-inves';

@NgModule({
  declarations: [
    MyInvesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyInvesPage),
  ],
})
export class MyInvesPageModule {}
