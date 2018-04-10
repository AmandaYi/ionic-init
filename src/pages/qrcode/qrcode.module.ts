import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrcodePage } from './qrcode';
import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  declarations: [
    QrcodePage,
  ],
  imports: [
    IonicPageModule.forChild(QrcodePage), QRCodeModule
  ],
})
export class QrcodePageModule {}
