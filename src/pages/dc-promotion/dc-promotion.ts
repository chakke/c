import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-dc-promotion',
  templateUrl: 'dc-promotion.html',
})
export class DcPromotionPage {
  promotions = [

  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    for (let i = 0; i < 20; i++) {
      this.promotions.push({
        image: "https://malaysiafreebies.com/wp-content/uploads/2017/09/22008088_1539645696116176_4713972264537885721_n.jpg",
        title: "Tưng bừng đón tết trung thu",
        isNew: true,
        time: "2/10/2017 - 8/10/2017",
        description: "Dancer kính gửi tới quý khách hàng chương trình khuyến mãi cực khủng. Mua 1 tặng 2 trả tiền 3. "

      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DcPromotionPage');
  }

}
