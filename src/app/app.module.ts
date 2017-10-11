import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ComponentsModule } from '../components/components.module';
import { FoodServiceProvider } from '../providers/food-service/food-service';
import { HttpService } from '../providers/http-service';
import { HttpModule } from '@angular/http';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { AppControllerProvider } from '../providers/app-controller/app-controller';
import { CategoryServiceProvider } from '../providers/category-service/category-service';
import { ServiceProvider } from '../providers/service/service'; 
@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
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
    ServiceProvider
  ]
})
export class AppModule { }
