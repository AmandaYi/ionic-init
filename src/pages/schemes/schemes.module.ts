import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchemesPage } from './schemes';

@NgModule({
  declarations: [
    SchemesPage,
  ],
  imports: [
    IonicPageModule.forChild(SchemesPage),
  ],
})
export class SchemesPageModule {}
