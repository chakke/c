import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpService } from '../http-service';
import { Food, OrderedFood } from '../classes/food';

@Injectable()
export class FoodServiceProvider {
  foodsJSON = {};
  allFoods = [];
  favoriteFood: Array<Food> = [];
  dailyFood: Array<Food> = [];

  constructor(private http: HttpService) {
    this.getFoods();
  }

  getFoods() {
    this.resetData();
    this.http.requestGet('assets/data/foods.json', "").then(data => {
      this.foodsJSON = data;
      if (data && data["favoriteFood"]) {
        for (let food of data["favoriteFood"]) {
          let temFood = new Food(food["title"], food["price"], food["image"], food["description"], food["watting-time"]);
          this.favoriteFood.push(temFood);
        }
      }
      if (data && data["dailyFood"]) {
        for (let food of data["dailyFood"]) {
          let temFood = new Food(food["title"], food["price"], food["image"], food["description"], food["watting-time"]);
          this.dailyFood.push(temFood);
        }
      }
    }, error => {
      console.log("get food error", error);
    })
  }

  resetData() {
    this.foodsJSON = {};
    this.allFoods = [];
    this.favoriteFood = [];
    this.dailyFood = [];
  }

  getFavoriteFoods(keyword?: string, startIndex?: number, count?: number): Promise<Array<Food>> {
    return new Promise<Array<Food>>((resolve, reject) => {
      let filteredFoods = this.favoriteFood;
      if (keyword) {
        keyword = keyword.toLowerCase();
        filteredFoods = filteredFoods.filter(food => {
          return food.keyWord.includes(keyword);
        });
        console.log("filtered", filteredFoods, keyword, this.favoriteFood);
      }
      if (!isNaN(startIndex) && !isNaN(count)) {
        resolve(filteredFoods.slice(startIndex, startIndex + count));
      } else {
        resolve(filteredFoods);
      }
    })
  }
  getDailyFoods(keyword?: string, startIndex?: number, count?: number): Promise<Array<Food>> {
    return new Promise<Array<Food>>((resolve, reject) => {
      let filteredFoods = this.dailyFood;
      if (keyword) {
        keyword = keyword.toLowerCase().trim();
        filteredFoods =  filteredFoods.filter(food => {
          return food.keyWord.includes(keyword);
        });
      }
      if (!isNaN(startIndex) && !isNaN(count)) {
        resolve(filteredFoods.slice(startIndex, startIndex + count));
      } else {
        resolve(filteredFoods);
      }
    })
  }
}
