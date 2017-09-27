import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
export class Food {
  title: string;
  price: number;
  image: string;
  constructor(title?: string, price?: number, image?: string) {
    this.title = (title ? title : "");
    this.price = (price ? price : 0);
    this.image = (image ? image : "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.foodemperor.com%2Fwp-content%2Fuploads%2F2014%2F06%2Fblujamcafe.jpg&f=1");
  }
}
@IonicPage()
@Component({
  selector: 'page-dc-home',
  templateUrl: 'dc-home.html',
})

export class DcHomePage {
  dailyFoods: Array<Food> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) { 
    this.dailyFoods = [
      new Food("Xôi lạp xưởng", 28000),
      new Food("Thịt bò Mỹ nướng sốt tiêu đen", 99000),
      new Food("Panna Cotta dâu", 25000),
      new Food("Xôi lạp xưởng", 28000),
      new Food("Xôi lạp xưởng", 28000),
      new Food("Xôi lạp xưởng", 28000)
    ]
  } 

}
