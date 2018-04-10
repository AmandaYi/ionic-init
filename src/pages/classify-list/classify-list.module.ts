import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassifyListPage } from './classify-list';

@NgModule({
  declarations: [
    ClassifyListPage,
  ],
  imports: [
    IonicPageModule.forChild(ClassifyListPage),
  ],
})
export class ClassifyListPageModule {}
