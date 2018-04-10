import { ComponentsModule } from './../../components/components.module';
// import { NetworkFailComponent } from './../../components/network-fail/network-fail';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MePage } from './me';

@NgModule({
  declarations: [
    MePage,
    // NetworkFailComponent,
    
  ],
  imports: [
    IonicPageModule.forChild(MePage),ComponentsModule
  ],
})
export class MePageModule {}
