import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from '../../providers/app-controller/app-controller'
import { Category } from '../../providers/classes/category';
import { Food, OrderedFood } from '../../providers/classes/food';

import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/delay'; 
@IonicPage()
@Component({
  selector: 'page-dc-menu',
  templateUrl: 'dc-menu.html',
})
export class DcMenuPage {
  categories: Array<Category> = [];
  showCategories: Array<Category> = [];
  categoryColors = [
    {
      color: "#194e1f",
      background: "#29cc3d",
    },
    {
      color: "#699a97",
      background: "#b4e2e0",
    },
    {
      color: "#90990a",
      background: "#dde657",
    },
    {
      color: "#ab6100",
      background: "#ffc300",
    },
    {
      color: "#bb6d61",
      background: "#fac1b8",
    },
    {
      color: "#7B1FA2",
      background: "#BA68C8",
    },
    {
      color: "#BF360C",
      background: "#FF8A65",
    },
  ];
  categoryIcon = [
    '<i class="fa fa-sun-o" aria-hidden="true"></i>',
    '<i class="fa fa-coffee" aria-hidden="true"></i>',
    '<i class="fa fa-cutlery" aria-hidden="true"></i>',
    '<i class="fa fa-lemon-o" aria-hidden="true"></i>',
    '<i class="fa fa-birthday-cake" aria-hidden="true"></i>',
    '<i class="fa fa-paw" aria-hidden="true"></i>',
    '<i class="fa fa-envira" aria-hidden="true"></i>'
  ];
  selectedCategory: Category;

  foods: Array<OrderedFood> = [];
  currentIndex = 0;
  numberOfFoodPerScreen = 6;
  keyword: string = "";
  onLoadMore = false;
  isMaxItem = false;
  observer: Subscription = new Subscription();
  debounceTime = 100;

  quickMenu: HTMLElement;
  scrollToActiveItem = true;

  @ViewChildren('items') items: QueryList<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appCotroller: AppControllerProvider ) {
    this.selectedCategory = new Category(0, "", ""); 
  }

  ionViewDidLoad() {
    this.getAllCategorires();
    this.loadMoreFoods();
    this.quickMenu = <HTMLElement>document.getElementById("quick-menu");

  }

  ionViewDidEnter() {
    this.items.changes.subscribe(event => {
      if (this.scrollToActiveItem) {
        event._results.forEach((elementRef: ElementRef) => {
          if (elementRef.nativeElement.id == "quick-menu-item-" + this.selectedCategory.id) {
            this.quickMenu.scrollLeft = elementRef.nativeElement.offsetLeft;
          }
        });
      }
    })
  }

  getAllCategorires() {
    this.categories = this.appCotroller.getCategoryService().getAllCategories();
    this.selectedCategory = this.categories[0];
    for (let i = 0; i < this.categories.length; i++) {
      let category = this.categories[i];
      category["icon"] = this.categoryIcon[i % 7];
      category["color"] = this.categoryColors[i % 7].color;
      category["background"] = this.categoryColors[i % 7].background;
      this.showCategories.push(category);
    }
    this.showCategories = [...this.categories];
    if (this.navParams.get("category")) {
      this.selectedCategory = this.navParams.get("category");
    }
  }

  menuClick(category) {
    this.scrollToActiveItem = false;
    if (this.selectedCategory.id == category.id) return;
    this.selectedCategory = category;
    this.createDefault();
    this.scrollToActiveItem = false;
    this.loadMoreFoods();
  }

  changeFoodQuantily(item, quantily) {
    item["quantily"] = quantily;
    console.log("item", item);
  }

  doInfinite(infiniteScroll) {
    if (this.onLoadMore) {
      infiniteScroll.complete();
      return;
    }
    this.loadMoreFoods(infiniteScroll);
  }

  loadMoreFoods(infiniteScroll?) {
    console.log("load more", this.currentIndex);
    this.onLoadMore = true;
    this.appCotroller.getFoodService().getFoodByCategory(this.selectedCategory.id, this.keyword,
      this.currentIndex, this.numberOfFoodPerScreen).subscribe(data => {
        let index = 0;
        if (data) {
          if (data.length == 0) {
            this.isMaxItem = true;
            return;
          }
          this.observer = Observable.interval(this.debounceTime).subscribe(() => {
            if (index == data.length) {
              this.currentIndex += data.length;
              this.observer.unsubscribe();
              if (infiniteScroll) infiniteScroll.complete();
              this.onLoadMore = false;
              return;
            }
            let food = data[index] as OrderedFood;
            food["quantily"] = 0;
            // food["note"] = "";
            this.foods.push(food);
            index++;
          })
        }
      })
  }

  createDefault() {
    this.observer.unsubscribe();
    this.currentIndex = 0;
    this.foods = [];
    this.isMaxItem = false;
    this.scrollToActiveItem = true;
  }


  onSearch(keyword: string) {
    this.createDefault();
    this.keyword = keyword;
    this.showCategories = this.categories.filter(elm => {
      return elm.keyword.includes(keyword.toLowerCase().trim()) || elm.id == this.selectedCategory.id;
    })
    this.loadMoreFoods();
  }

  gotoDetail(food) {
    this.navCtrl.push("FoodDetailPage", { food: food });
    console.log(food.quantily);
  }

}
