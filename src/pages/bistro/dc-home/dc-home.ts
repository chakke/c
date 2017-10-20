import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, ModalController, Content } from 'ionic-angular';
import { AppControllerProvider } from '../../../providers/bistro/app-controller/app-controller'
import { Food } from '../../../providers/bistro/classes/food';
import { Category } from '../../../providers/bistro/classes/category';
import { Discount } from '../../../providers/bistro/classes/discount';

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
  keyword: string = "";
  isEntered = false;

  @ViewChildren('itemCategory') itemCategories: QueryList<any>; 
  @ViewChild(Content) content: Content;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appController: AppControllerProvider,
    private modalCtrl: ModalController) {
  }
  ionViewDidLoad() { 
    this.itemCategories.changes.subscribe(event => { 
      this.animateSectionElement();
    }) 

    this.createDefault();
    this.loadCategories();
    this.getAllDiscount();
    this.appController.getCategoryService().onDataChange((data) => {
      this.createDefault();
      if (data) this.categories = data;
      this.loadMoreCategory();
    });
  }

  ionViewDidEnter() {
    if (!this.isEntered) { 
      this.animateSectionElement();
      this.content.ionScrollEnd.subscribe(() => {
        this.animateSectionElement();
      })
    } 
    this.isEntered = true;
  }

  animateSectionElement() { 
    let viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    let sections = document.getElementsByClassName('dc-section');
    for (let i = 0; i < sections.length; i++) {
      let section = <HTMLElement>sections.item(i);
      if (this.appController.isElementInViewPort(section, viewPortWidth, viewPortHeight, 1, true, true)) {
        if (!section.classList.contains("animated")) {
          section.classList.add("animated", "fadeInRight");

          section.addEventListener('animationend', () => {
            this.animateItemElement(section, viewPortWidth, viewPortHeight);
          })
          section.addEventListener('oAnimationEnd', () => {
            this.animateItemElement(section, viewPortWidth, viewPortHeight);
          })
          section.addEventListener('webkitAnimationEnd', () => {
            this.animateItemElement(section, viewPortWidth, viewPortHeight);
          })
        }
        else {
          this.animateItemElement(section, viewPortWidth, viewPortHeight);
        }
      }
    }
  }

  animateItemElement(section: HTMLElement, viewPortWidth: number, viewPortHeight: number) {

    section.style.animationDuration = "0ms";
    let scrollContens = section.getElementsByClassName('horizontal-scroll');
    if (scrollContens.length > 0) {
      let scrollContent = <HTMLElement>scrollContens.item(0);

      let items = scrollContent.getElementsByClassName('item');

      for (let j = 0; j < items.length; j++) {
        let item = <HTMLElement>items.item(j);

        if (!item.classList.contains("animated") && this.appController.isElementInViewPort(item, viewPortWidth, viewPortHeight, 2, true, true)) {
          item.classList.add("animated", "zoomIn");
          item.addEventListener('animationend', () => {
            item.style.animationDuration = "0ms";
          })
          item.addEventListener('oAnimationEnd', () => {
            item.style.animationDuration = "0ms";
          })
          item.addEventListener('webkitAnimationEnd', () => {
            item.style.animationDuration = "0ms";
          })
        }
      }

      scrollContent.addEventListener('scroll', () => {
        let items = scrollContent.getElementsByClassName('item');
        for (let j = 0; j < items.length; j++) {
          let item = <HTMLElement>items.item(j);
          if (!item.classList.contains("animated") && this.appController.isElementInViewPort(item, viewPortWidth, viewPortHeight, 2, true, true)) {

            item.classList.add("animated", "zoomIn");
          }
        }
      })
    }
  }

  createDefault() {
    this.categories = [];
    this.showCategories = [];
    this.categoryPerPage = 4;
    this.categoryIndex = 0;
    this.categoryDebounceTime = 300;
    this.onLoadMore = false;
    this.keyword = "";
  }

  loadCategories() {
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

    for (this.categoryIndex; this.categoryIndex < this.categories.length && this.categoryIndex < categoryCount; this.categoryIndex++) {
      let category = new Category(0, "", "");
      this.appController.cloneSimpleObject(this.categories[this.categoryIndex], category);
      this.showCategories.push(category);
      // this.showCategories.push(this.categories[this.categoryIndex]);
    }
    if (infiniteScroll)
      infiniteScroll.complete();
    this.onLoadMore = false;
  }

  getFoodByCategory(category) {
    let foodObserver = this.appController.getFoodService().getFoodByCategory(category, this.keyword, 0, 6);
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
    // this.animateSectionElement()
  }

  getAllDiscount() {
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

  doRefresh(refresher) {
    this.createDefault();
    this.loadCategories();
    setTimeout(() => {
      this.animateSectionElement();
      refresher.complete();
    }, 1000);
  }

}
