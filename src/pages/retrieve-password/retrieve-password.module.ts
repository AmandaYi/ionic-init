import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RetrievePasswordPage } from './retrieve-password';

@NgModule({
  declarations: [
    RetrievePasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(RetrievePasswordPage),
  ],
})
export class RetrievePasswordPageModule {}
