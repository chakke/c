import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DcLoginPage } from './dc-login';

@NgModule({
  declarations: [
    DcLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(DcLoginPage),
  ],
})
export class DcLoginPageModule {}
