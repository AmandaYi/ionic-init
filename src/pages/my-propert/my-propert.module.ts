import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPropertPage } from './my-propert';

@NgModule({
  declarations: [
    MyPropertPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPropertPage),PipesModule
  ],
})
export class MyPropertPageModule {}
