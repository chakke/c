import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DcRegisterPage } from './dc-register';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    DcRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(DcRegisterPage),
    ComponentsModule
  ],
})
export class DcRegisterPageModule {}
