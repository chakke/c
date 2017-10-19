import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ComponentsModule } from '../components/bistro/components.module';
import { FoodServiceProvider } from '../providers/bistro/food-service/food-service';
import { HttpService } from '../providers/http-service';
import { HttpModule } from '@angular/http';
import { UserServiceProvider } from '../providers/bistro/user-service/user-service';
import { AppControllerProvider } from '../providers/bistro/app-controller/app-controller';
import { CategoryServiceProvider } from '../providers/bistro/category-service/category-service';
import { ServiceProvider } from '../providers/bistro/service/service';
import { GoogleMaps, Geocoder } from '@ionic-native/google-maps';
import { AddressServiceProvider } from '../providers/bistro/address-service/address-service';
import { DiscountServiceProvider } from '../providers/bistro/discount-service/discount-service'; 
@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp,{
      pageTransition: 'ios-transition'
    }),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FoodServiceProvider,
    HttpService,
    UserServiceProvider,
    AppControllerProvider,
    CategoryServiceProvider,
    ServiceProvider,
    GoogleMaps,
    Geocoder,
    AddressServiceProvider,
    DiscountServiceProvider 
  ]
})
export class AppModule { }
