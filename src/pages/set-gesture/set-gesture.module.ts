import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetGesturePage } from './set-gesture';
import { GesturePasswordModule } from 'ngx-gesture-password';


@NgModule({
  declarations: [
    SetGesturePage,
  ],
  imports: [
    IonicPageModule.forChild(SetGesturePage),GesturePasswordModule
  ],
})
export class SetGesturePageModule {}
