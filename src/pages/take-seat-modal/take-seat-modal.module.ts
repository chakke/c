import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TakeSeatModalPage } from './take-seat-modal';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    TakeSeatModalPage,
  ],
  imports: [
    IonicPageModule.forChild(TakeSeatModalPage),
    ComponentsModule
  ],
})
export class TakeSeatModalPageModule {}
