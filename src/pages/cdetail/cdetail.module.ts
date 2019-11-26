import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CdetailPage } from './cdetail';

@NgModule({
  declarations: [
    CdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CdetailPage),
  ],
})

export class CdetailPageModule {}