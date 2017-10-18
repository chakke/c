import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Menu, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppControllerProvider } from '../providers/app-controller/app-controller';
import { User } from '../providers/classes/user';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'DcHomePage';
  user: User;
  menuItems = [

  ]
  @ViewChild(Menu) menu: Menu;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private app: App,
    private appController: AppControllerProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString("#bb2b33");
     
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
    this.user = this.appController.getUserService().getUser();
    this.menuItems = this.appController.getMenuItems();
  }
  itemClick(menuItem) {
    this.appController.setRootPage(menuItem.page);
    this.closeMenu();
  }

  setMenuZIndex(zIndex) {
    this.menu.getNativeElement().style.zIndex = zIndex + "";
  }
  gotoLogin() {
    this.closeMenu();
    this.app.getActiveNav().push("DcLoginPage");
  }

  gotoRegister() {
    this.closeMenu();
    this.app.getActiveNav().push("DcRegisterPage");
  }
  closeMenu(): Promise<any> {
    this.setMenuZIndex(0);
    return this.menuCtrl.close();
  }

  logOut() {
    this.appController.getUserService().logOut();
  }
}

