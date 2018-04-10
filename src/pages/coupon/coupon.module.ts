import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CouponPage } from './coupon';
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    CouponPage,
  ],
  imports: [
    IonicPageModule.forChild(CouponPage), ComponentsModule,
  ],
}) 
export class CouponPageModule {}
