import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, ModalController } from 'ionic-angular';
import { FoodServiceProvider } from '../../providers/food-service/food-service'
import { Food } from '../../providers/classes/food'
@IonicPage()
@Component({
  selector: 'page-dc-home',
  templateUrl: 'dc-home.html',
})

export class DcHomePage {
  discounts = [
    {
      image: "https://s3-ap-southeast-1.amazonaws.com/mytour-static-file/files/cityme%20625x400.png",
      title: "Ăn sang giá sàn 10% off"
    },
    {
      image: "https://cdn02.static-adayroi.com/resize/710_710/100/0/2016/09/20/1474361257955_5545841.jpg",
      title: "Cơn lốc vịt quay Bắc Kinh ngay tại Hà Nội"
    }
  ]
  dailyFoods: Array<Food> = [];
  favoriteFoods: Array<Food> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private foodService: FoodServiceProvider, private modalCtrl: ModalController) {

  }
  ionViewDidEnter() {
    this.loadFavoriteFood(null);
    this.loadDailyFood(null);
  }

  loadFavoriteFood(keyword) {
    this.foodService.getFavoriteFoods(keyword).then(data => {
      this.favoriteFoods = data;
    })
  }

  loadDailyFood(keyword) {
    this.foodService.getDailyFoods(keyword).then(data => {
      this.dailyFoods = data;
    })
  }

  search(keyword) {
    this.loadFavoriteFood(keyword);
    this.loadDailyFood(keyword);
  }

  gotoDiscountDetail(discount) {
    let modal = this.modalCtrl.create("DiscountDetailPage", { "discount": discount });
    modal.present();
  }
}
