import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DcFindPlacePage } from './dc-find-place';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DcFindPlacePage,
  ],
  imports: [
    IonicPageModule.forChild(DcFindPlacePage),
    ComponentsModule
  ],
})
export class DcFindPlacePageModule { }
