import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodDetailPage } from './food-detail';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    FoodDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodDetailPage),
    ComponentsModule
  ],
})
export class FoodDetailPageModule {}
