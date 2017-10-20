import { Injectable } from '@angular/core';
import { Content } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { HttpService } from '../../http-service';
import { CategoryServiceProvider } from '../category-service/category-service';
import { FoodServiceProvider } from '../food-service/food-service';
import { UserServiceProvider } from '../user-service/user-service';
import { ServiceProvider } from '../service/service';
import { AddressServiceProvider } from '../address-service/address-service';
import { DiscountServiceProvider } from '../discount-service/discount-service';
import { AssetsUrl } from '../app-constant';
import { ResourceLoader } from '../../resource-loader/resource-loader';
import { Config } from '../classes/config';

import { Toast, ToastController, App } from 'ionic-angular';

@Injectable()
export class AppControllerProvider {
  private toast: Toast;
  private resourceLoader: ResourceLoader;
  private config: Config;
  private menuItemChangeHandler: any;
  private menuItems = [
    {
      icon: 'assets/bistro/images/main-icon/icon_home.png',
      title: 'Trang chủ',
      page: 'DcHomePage',
      active: false
    },
    {
      icon: 'assets/bistro/images/main-icon/icon_menu.png',
      title: 'Thực đơn',
      page: 'DcMenuPage',
      active: false
    },
    {
      icon: 'assets/bistro/images/main-icon/icon_promotion.png',
      title: 'Chương trình khuyến mại',
      page: 'DcPromotionPage',
      active: false
    },
    // {
    //   icon: 'assets/bistro/images/main-icon/icon_order.png',
    //   title: 'Đặt món',
    //   page: 'DcOrderPage',
    //   active: false
    // },
    {
      icon: 'assets/bistro/images/main-icon/icon_support.png',
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
    this.resourceLoader = new ResourceLoader();
    this.config = new Config();
    this.loadConfig().then(() => {
      this.menuItems = this.config.getData(["app-config", "menu-item"]);
      if (this.menuItemChangeHandler) {
        this.menuItemChangeHandler(this.menuItems);
      } 
    });
  }

  getMenuItems() {
    return this.menuItems;
  }

  onMenuItemChange(handler) {
    this.menuItemChangeHandler = handler;
  }

  setRootPage(page: any, param?: any) {
    if (page && page != "" && page) {
      let activeIndex = this.menuItems.findIndex(elm => {
        return elm.active;
      })
      console.log("active index ", activeIndex)
      if (activeIndex > -1) {
        if (this.menuItems[activeIndex].page == page) {
          return;
        } else {
          this.menuItems[activeIndex].active = false;
        }
      }
      this.app.getActiveNav().setRoot(page, param);
      for (let item of this.menuItems) {
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

  loadConfig() {
    return new Promise((resolve, reject) => {
      if (this.config.hasData()) {
        resolve();
      } else {
        this.httpService.getHttp().request(AssetsUrl.CONFIG).subscribe(
          data => {
            this.config.onResponseConfig(data.json());
            resolve();
          }
        );
      }
    });
  }
  getAppConfig() {
    return this.config;
  }

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

  getAddressService() {
    return this.addressService;
  }

  getDiscountService() {
    return this.discountService;
  }

  getResourceLoader() {
    return this.resourceLoader;
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

  animateVerticalElement(cssClass: string, parent: HTMLElement, clientHeight: number, animateClass?: string) {
    this.onVerticalScroll(cssClass, parent, clientHeight, animateClass);
    parent.addEventListener('scroll', () => {
      this.onVerticalScroll(cssClass, parent, clientHeight, animateClass);
    })
  }

  onVerticalScroll(cssClass: string, parent: HTMLElement, clientHeight: number, animateClass?: string) {
    let elements = parent.getElementsByClassName(cssClass);
    for (let i = 0; i < elements.length; i++) {
      let element = <HTMLElement>elements.item(i);
      let scrollTop = parent.scrollTop;
      let offsetTop = parent.offsetTop;
      if (!element.classList.contains("animated") && this.isElementInVerticalViewPort(element, offsetTop, scrollTop, clientHeight)) {
        element.classList.add('animated');
        if (animateClass) element.classList.add(animateClass);
      }
    }
  }

  isElementInVerticalViewPort(element: HTMLElement, offsetTop: number, scrollTop: number, scrollHeight: number) {
    let top = element.offsetTop;
    let height = element.offsetHeight;
    let distance = top - scrollTop;

    if (scrollTop + scrollHeight - height / 3 >= (top + offsetTop) && scrollTop <= (top + height + offsetTop)) {
      if (distance > 0) element.style.animationDelay = distance + "ms";
      console.log("animation delay", distance);
      return true;
    }
    return false;
  }

  animateHorizontalElement(cssClass: string, verticalScrollParent: HTMLElement, horizontalScrollParent: HTMLElement, clientWidth: number, animateClass?: string) {
    this.onHorizontalScroll(cssClass, horizontalScrollParent, clientWidth, animateClass);
    horizontalScrollParent.addEventListener('scroll', () => {
      this.onHorizontalScroll(cssClass, horizontalScrollParent, clientWidth, animateClass);
    })
  }

  onHorizontalScroll(cssClass: string, parent: HTMLElement, clientWidth: number, animateClass?: string) {
    let elements = parent.getElementsByClassName(cssClass);
    for (let i = 0; i < elements.length; i++) {
      let element = <HTMLElement>elements.item(i);
      let scrollTop = parent.scrollTop;
      let offsetTop = parent.offsetTop;
      if (!element.classList.contains("animated") && this.isElementInVerticalViewPort(element, offsetTop, scrollTop, clientWidth)) {
        element.classList.add('animated');
        if (animateClass) element.classList.add(animateClass);
      }
    }
  }

  isElementInHorizontalViewPort(element: HTMLElement, offsetLeft: number, scrollLeft: number, scrollWidth: number) {
    let left = element.offsetLeft;
    let width = element.offsetWidth;
    if (scrollLeft + scrollWidth - width / 3 >= (left + offsetLeft) && scrollLeft <= (left + width + offsetLeft)) return true;
    return false;
  }

  isElementInViewPort(element: HTMLElement, viewPortWidth: number, viewPortHeight: number, direction?: number, isViewable?: boolean, isAddAnimationDelay?: boolean) {
    //direction = false <=> both
    //direction = 1 <=> vertical
    //direction = 2 <=> horizontal

    let rect = element.getBoundingClientRect();
    if (isViewable) {
      viewPortWidth = viewPortWidth - rect.width / 3;
      viewPortHeight = viewPortHeight - rect.height / 3;
    }
    let result = true;
    if (!direction || direction == 1) {
      result = result && (rect.top >= 0 || (rect.top + rect.height) >= 0) && (rect.bottom <= viewPortHeight || rect.top <= viewPortHeight)
    }
    if (!direction || direction == 2) {
      result = result && (rect.left >= 0 || (rect.left + rect.width) >= 0) && (rect.right <= viewPortWidth || rect.left <= viewPortWidth)
    }
    if (result) {
      if (isAddAnimationDelay) {
        let delay = 0;
        if (!direction || direction == 1) delay += rect.top;
        if (!direction || direction == 2) delay += rect.left;
        element.style.animationDelay = delay + "ms";
      }
      return true;
    };
    return false;
  }

  cloneSimpleObject(objectSource: any, objectTarget: any) {
    for (var key in objectSource) {
      if (objectSource.hasOwnProperty(key)) {
        var element = objectSource[key];
        objectTarget[key] = element;
      }
    }
  }
}
