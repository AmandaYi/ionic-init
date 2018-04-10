import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetGesturePage } from './get-gesture';

@NgModule({
  declarations: [
    GetGesturePage,
  ],
  imports: [
    IonicPageModule.forChild(GetGesturePage),
  ],
})
export class GetGesturePageModule {}
