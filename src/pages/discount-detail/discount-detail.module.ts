import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscountDetailPage } from './discount-detail';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    DiscountDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DiscountDetailPage),
    ComponentsModule
  ],
})
export class DiscountDetailPageModule { }
