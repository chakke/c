import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-dc-service',
  templateUrl: 'dc-service.html',
})
export class DcServicePage {
  tab = "place";
  steps = [
    {
      number: 1,
      title: "Chọn món",
      active: true,
      hasArrow: true
    },
    {
      number: 2,
      title: "Điền thông tin",
      active: false,
      hasArrow: true
    },
    {
      number: 3,
      title: "Phương thức thanh toán",
      active: false,
      hasArrow: true
    },
    {
      number: 4,
      title: "Xác nhận",
      active: false,
      hasArrow: false
    }
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad DcServicePage');
  }

  segmentChanged() {
    let scrollContent = <HTMLElement>document.querySelector("#service-ion-content .scroll-content");
    let fixedTop = <HTMLElement>document.getElementById('fixed-top'); 
    setTimeout(() => {
      if (scrollContent && fixedTop) {
        scrollContent.style.paddingTop = fixedTop.offsetHeight + "px";
      }
    }, 0)
    //Why need to setTimeout?
    //Because when switch tab = ship. .dc-step-group element is not added to doom immediately. So just wait a tick.
  }



}
