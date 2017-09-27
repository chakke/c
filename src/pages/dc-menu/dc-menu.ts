import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-dc-menu',
  templateUrl: 'dc-menu.html',
})
export class DcMenuPage {
  quickMenuItem = [
    {
      icon: '<i class="fa fa-sun-o" aria-hidden="true"></i>',
      title: 'Bữa sáng',
      value: 'breakfast',
      color: "#194e1f",
      background: "#29cc3d",
      active: true
    },
    {
      icon: '<i class="fa fa-coffee" aria-hidden="true"></i>',
      title: 'Cà phê',
      value: 'coffee',
      color: "#699a97",
      background: "#b4e2e0",
      active: false
    },
    {
      icon: '<i class="fa fa-cutlery" aria-hidden="true"></i>',
      title: 'Bữa chính',
      value: 'main',
      color: "#90990a",
      background: "#dde657",
      active: false
    },
    {
      icon: '<i class="fa fa-lemon-o" aria-hidden="true"></i>',
      title: 'Sinh tố',
      value: 'lemon',
      color: "#ab6100",
      background: "#ffc300",
      active: false
    },
    {
      icon: '<i class="fa fa-birthday-cake" aria-hidden="true"></i>',
      title: 'Bánh',
      value: 'cake',
      color: "#bb6d61",
      background: "#fac1b8",
      active: false
    }
  ]

  breakfastFoods = [

  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.addItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DcMenuPage');
  }

  menuClick(menuItem) {

    for (let item of this.quickMenuItem) {
      item.active = false;
    }
    menuItem.active = true; 
    this.breakfastFoods = [];
    setTimeout(() => {
      this.addItems();
    }, 300)
  }

  changeFoodQuantily(item, quantity) {
    item["quantity"] = quantity;
  }

  doInfinite(infiniteScroll) { 
    setTimeout(() => {
      this.addItems(); 
      infiniteScroll.complete();
    }, 500);
  }

  addItems() {
    for (let i = 1; i <= 5; i++)
      this.breakfastFoods.push({
        image: 'http://7monngonmoingay.vn/wp-content/uploads/2016/07/cach-lam-pho-bo-sot-vang-thom-ngon-nuc-mui.jpg',
        title: 'Phở bò sốt vang',
        description: 'Beef Au Vin Noddle Soup',
        waittingTime: '5',
        price: 35000,
        quantity: 0
      })
  }
}
