import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpService } from '../http-service';
import { CategoryServiceProvider } from '../category-service/category-service';
import { FoodServiceProvider } from '../food-service/food-service';
import { UserServiceProvider } from '../user-service/user-service';
import { ServiceProvider } from '../service/service';
import { AddressServiceProvider } from '../address-service/address-service';
import { DiscountServiceProvider } from '../discount-service/discount-service';
import { AssetsUrl } from '../app-constant'

import { Toast, ToastController, App } from 'ionic-angular';

@Injectable()
export class AppControllerProvider {
  private toast: Toast;
  private menuItems = [
    {
      icon: 'assets/images/main-icon/icon_home.png',
      title: 'Trang chủ',
      page: 'DcHomePage',
      active: true
    },
    {
      icon: 'assets/images/main-icon/icon_menu.png',
      title: 'Thực đơn',
      page: 'DcMenuPage',
      active: false
    },
    {
      icon: 'assets/images/main-icon/icon_promotion.png',
      title: 'Chương trình khuyến mại',
      page: 'DcPromotionPage',
      active: false
    },
    // {
    //   icon: 'assets/images/main-icon/icon_order.png',
    //   title: 'Đặt món',
    //   page: 'DcOrderPage',
    //   active: false
    // },
    {
      icon: 'assets/images/main-icon/icon_support.png',
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
    private addressService: AddressServiceProvider,
    private service: ServiceProvider,
    private discountService: DiscountServiceProvider,
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
  pushPage(page: any, param?: any) {
    if (page && page != "") {
      this.app.getActiveNav().push(page, param);
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

  getServiceProvider() {
    return this.service;
  }

  getAddressService(){
    return this.addressService;
  }

  getDiscountService(){
    return this.discountService;
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

  setBackgroundForScrollContent(ionContentSelector: string, color: string) {
    if (!ionContentSelector) ionContentSelector = ".has-map";
    let elements = document.querySelectorAll(ionContentSelector + "> .scroll-content");
    for (let i = 0; i < elements.length; i++) {
      let element = <HTMLElement>elements.item(i);
      element.style.setProperty("background-color", color, "important");
    }
  }
}
