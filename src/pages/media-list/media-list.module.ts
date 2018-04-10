import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MediaListPage } from './media-list';
 
@NgModule({
  declarations: [
    MediaListPage,
  ],
  imports: [
    IonicPageModule.forChild(MediaListPage)
  ],
})
export class MediaListPageModule {}
