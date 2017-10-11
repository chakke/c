import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DcTaxiPage } from './dc-taxi';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DcTaxiPage,
  ],
  imports: [
    IonicPageModule.forChild(DcTaxiPage),
    ComponentsModule
  ],
})
export class DcTaxiPageModule {}
