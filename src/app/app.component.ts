import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Menu } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'DcHomePage';
  menuItems = [
    {
      icon: ' <i class="fa fa-home" aria-hidden="true"></i>',
      title: 'Trang chủ',
      page: '',
      active: true
    },
    {
      icon: '<i class="fa fa-list-alt" aria-hidden="true"></i>',
      title: 'Thực đơn',
      page: '',
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
      page: '',
      active: false
    },
  ]
  @ViewChild(Menu) menu: Menu;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  ngAfterViewInit() {
    this.menu.ionOpen.subscribe(event => {
      this.setMenuZIndex(1);
    })
    this.menu.onBackdropClick = () => {
      this.closeMenu();
    }
  }
  itemClick(menuItem) {
    console.log("click", menuItem)
    for (let item of this.menuItems) {
      item.active = false;
    }
    menuItem.active = true;
    this.closeMenu().then(() => {
      if (menuItem.page && menuItem.page != "") {
        this.rootPage = menuItem.page;
      }
    });
  }

  setMenuZIndex(zIndex) {
    this.menu.getNativeElement().style.zIndex = zIndex + "";
  }

  openPage(page) {
    this.menuCtrl.close();
  }

  closeMenu(): Promise<any> {
    this.setMenuZIndex(0);
    return this.menuCtrl.close();
  }
}

