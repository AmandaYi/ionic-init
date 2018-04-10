import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListDetailsPage } from './list-details';
import { ComponentsModule } from '../../components/components.module'
import { PipesModule } from './../../pipes/pipes.module'; 
 

@NgModule({
  declarations: [
    ListDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListDetailsPage),ComponentsModule,PipesModule
  ],
 
})
export class ListDetailsPageModule {}
