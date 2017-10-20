import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, ModalController } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller'
import { Food } from '../../providers/classes/food';
import { Category } from '../../providers/classes/category';
import { Discount } from '../../providers/classes/discount';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/delay';
@IonicPage()
@Component({
  selector: 'page-dc-home',
  templateUrl: 'dc-home.html',
})

export class DcHomePage {
  discounts: Array<Discount> = [];
  categories: Array<Category> = [];
  showCategories: Array<Category> = [];
  categoryPerPage: number = 4;
  categoryIndex: number = 0;
  categoryDebounceTime = 300;
  onLoadMore = false;
  observer: Subscription = new Subscription();
  keyword: string = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appController: AppControllerProvider,
    private modalCtrl: ModalController) {
  }
  ionViewDidLoad() {
    this.loadCategories();
    this.getAllDiscount();
    this.appController.getCategoryService().onDataChange((data) => {
      this.createDefault();
      if (data) this.categories = data;
      this.loadMoreCategory();
    })
  }

  createDefault() {
    this.categories = [];
    this.showCategories = [];
    this.categoryPerPage = 4;
    this.categoryIndex = 0;
    this.categoryDebounceTime = 300;
    this.onLoadMore = false;
    this.keyword = "";
    this.observer.unsubscribe();
  }

  loadCategories() {
    this.createDefault();
    this.categories = this.appController.getCategoryService().getAllCategories();
    this.loadMoreCategory();
  }

  doInfinite(infiniteScroll) {
    if (this.onLoadMore) {
      infiniteScroll.complete();
      return;
    }
    this.loadMoreCategory(infiniteScroll);
  }

  loadMoreCategory(infiniteScroll?) {
    this.onLoadMore = true;
    let categoryCount = this.categoryIndex + this.categoryPerPage;
    this.observer = Observable.interval(this.categoryDebounceTime).subscribe(() => {
      // console.log("adding category", this.categoryIndex, Date.now());
      if (this.categoryIndex == this.categories.length || this.categoryIndex == categoryCount) {
        if (infiniteScroll)
          infiniteScroll.complete();
        this.onLoadMore = false;
        this.observer.unsubscribe();
        return;
      };
      // this.categories[this.categoryIndex]["numberOfItems"] = 0;
      this.showCategories.push(this.categories[this.categoryIndex]);
      this.categoryIndex++;
    });

  }


  getFoodByCategory(category) {
    let foodObserver = this.appController.getFoodService().getFoodByCategory(category.id, this.keyword, 0, 6);
    foodObserver.subscribe(data => {
      category["numberOfItems"] = data.length;
    });
    return foodObserver;
  }

  search(keyword) {
    this.createDefault();
    this.categories = this.appController.getCategoryService().getAllCategories();
    this.keyword = keyword;
    this.showCategories = this.categories;
    this.categoryIndex = this.categories.length;
  }

  getAllDiscount(){
    this.discounts = this.appController.getDiscountService().getAllDiscount();
  }

  gotoDiscountDetail(discount) {
    this.navCtrl.push("DiscountDetailPage", { "discount": discount });
  }

  gotoDetail(food) {
    this.navCtrl.push("FoodDetailPage", { food: food });
  }

  goToMenu(category) {
    this.appController.setRootPage("DcMenuPage", { category: category });
  }

}
