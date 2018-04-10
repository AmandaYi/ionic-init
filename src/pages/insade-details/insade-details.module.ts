import { InsadeDetailsPage } from './insade-details';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module'
import { PipesModule } from './../../pipes/pipes.module'; 

@NgModule({
  declarations: [
    InsadeDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(InsadeDetailsPage),ComponentsModule,PipesModule
  ],
})
export class InsadeDetailsPageModule {}
