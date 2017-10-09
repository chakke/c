import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-dc-service',
  templateUrl: 'dc-service.html',
})
export class DcServicePage {

  serviceItems = [
    {
      title: "Đặt chỗ",
      des: "Vui lòng đặt chỗ ít nhất 1 giờ trước khi đến để được phục vụ tốt nhất",
      icon: "icon_booking.png",
      page: ""
    },
    {
      title: "Ship đồ ăn",
      des: "Thanh toán và giao hàng tận nơi bằng tiền mặt hay thẻ tín dụng, Paypal",
      icon: "icon_ship.png",
      page: ""
    },
    {
      title: "Trợ giúp tại chỗ",
      des: "Nhân viên nhà hàng sẽ lập tức tới bàn của quý khách để nhận yêu cầu",
      icon: "icon_help.png",
      page: ""
    },
    {
      title: "Gọi taxi",
      des: "Taxi theo yêu cầu của quý khách sẽ đến trong vòng 5-10 phút",
      icon: "icon_taxi.png",
      page: ""
    },
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DcServicePage');
  }
}
