import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BindmailboxPage } from './bindmailbox';

@NgModule({
  declarations: [
    BindmailboxPage,
  ],
  imports: [
    IonicPageModule.forChild(BindmailboxPage),
  ],
})
export class BindmailboxPageModule {}
