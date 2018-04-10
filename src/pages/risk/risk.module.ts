import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RiskPage } from './risk';

@NgModule({
  declarations: [
    RiskPage,
  ],
  imports: [
    IonicPageModule.forChild(RiskPage),
  ],
})
export class RiskPageModule {}
