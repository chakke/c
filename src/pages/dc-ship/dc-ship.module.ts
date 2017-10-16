import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DcShipPage } from './dc-ship';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    DcShipPage,
  ],
  imports: [
    IonicPageModule.forChild(DcShipPage),
    DirectivesModule,
    ComponentsModule
  ],
})
export class DcShipPageModule { }
