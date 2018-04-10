import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewdetailsPage } from './newdetails';
import { ComponentsModule } from '../../components/components.module'
import { PipesModule } from './../../pipes/pipes.module'; 
 
@NgModule({
  declarations: [
    NewdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(NewdetailsPage),ComponentsModule,PipesModule
  ],
})
export class NewdetailsPageModule {}
