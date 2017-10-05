import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpService } from '../http-service';
import { CategoryServiceProvider } from '../category-service/category-service';
import { FoodServiceProvider } from '../food-service/food-service';
import { UserServiceProvider } from '../user-service/user-service';
import { AssetsUrl } from '../app-constant'

import { Toast, ToastController, App } from 'ionic-angular';

@Injectable()
export class AppControllerProvider {
  private toast: Toast;
  private menuItems = [
    {
      icon: ' <i class="fa fa-home" aria-hidden="true"></i>',
      title: 'Trang chủ',
      page: 'DcHomePage',
      active: true
    },
    {
      icon: '<i class="fa fa-list-alt" aria-hidden="true"></i>',
      title: 'Thực đơn',
      page: 'DcMenuPage',
      active: false
    },
    {
      icon: '<i class="fa fa-handshake-o" aria-hidden="true"></i>',
      title: 'Chương trình khuyến mại',
      page: '',
      active: false
    },
    {
      icon: ' <i class="fa fa-bell-o" aria-hidden="true"></i>',
      title: 'Đặt món',
      page: '',
      active: false
    },
    {
      icon: ' <i class="fa fa-object-group" aria-hidden="true"></i>',
      title: 'Dich vụ',
      page: 'DcServicePage',
      active: false
    },
  ]
  constructor(
    private httpService: HttpService,
    private foodService: FoodServiceProvider,
    private categoryService: CategoryServiceProvider,
    private userService: UserServiceProvider,
    private toastCtrl: ToastController,
    private app: App
  ) {
    this.getDatas();
  }

  getMenuItems() { 
    return this.menuItems;
  }

  setRootPage(page: any, param?: any) {
    if (page && page != "") {
      this.app.getActiveNav().setRoot(page, param);
      for (let item of this.menuItems) {
        item.active = false;
        if (item.page == page) item.active = true;
      }
    }
  }

  getDatas() {
    this.httpService.requestGet(AssetsUrl.DATA, "").then(data => {
      if (data["foods"] && data["version"]) {
        this.foodService.updateData(data["version"], data["foods"]);
      }
      if (data["categories"] && data["version"]) {
        this.categoryService.updateData(data["version"], data["categories"]);
      }
    })
  };

  getFoodService(): FoodServiceProvider {
    return this.foodService;
  }

  getUserService(): UserServiceProvider {
    return this.userService;
  }

  getCategoryService(): CategoryServiceProvider {
    return this.categoryService;
  }

  showToast(message: string, duration?: number, position?: string) {
    this.hideToast();
    this.toast = this.toastCtrl.create({
      message: message,
      duration: duration ? duration : 3000,
      position: position ? position : "bottom"
    })
    this.toast.present();
  }

  hideToast() {
    if (this.toast) this.toast.dismiss();
  }
}
