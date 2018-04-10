import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyWelfarePage } from './my-welfare';

@NgModule({
  declarations: [
    MyWelfarePage,
  ],
  imports: [
    IonicPageModule.forChild(MyWelfarePage),
  ],
})
export class MyWelfarePageModule {}
