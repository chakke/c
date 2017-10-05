import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DcOrderPage } from './dc-order';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module'
@NgModule({
  declarations: [
    DcOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(DcOrderPage),
    ComponentsModule,
    DirectivesModule
  ],
})
export class DcOrderPageModule { }
