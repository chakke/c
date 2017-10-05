import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpService } from '../http-service';
import { Observable } from 'rxjs';
import { Food, OrderedFood } from '../classes/food';
@Injectable()
export class FoodServiceProvider {
  allFoods: Array<Food> = [];
  orderedFood: Array<OrderedFood> = [];
  dataVersion: number = 0;
  constructor(private http: HttpService) {
    this.orderedFood = [
    ]
  }

  updateData(version: number, data) {
    if (version > this.dataVersion) {
      this.resetData();
      this.dataVersion = version;

      if (data) {
        for (let food of data) {
          let temFood = new Food(food["id"], food["category"], food["vie"],
            food["en"], food["price"], food["img"], food["currency"], "", food["option"], food["size"], 0);
          this.allFoods.push(temFood);
        }
      }
    }
    this.onDataChange();
  }

  onDataChange(): Observable<Array<Food>> {
    return Observable.of(this.allFoods);
  }

  resetData() {
    this.allFoods = [];
  }

  addOrderedFood(food: OrderedFood) {
    let index = this.orderedFood.findIndex(elm => {
      return elm.id == food.id;
    });
    if (index > -1) {
      this.orderedFood[index].quantily += food.quantily;
      this.orderedFood[index].parallelFoods = food.parallelFoods;
      this.orderedFood[index].note = food.note;
    } else {
      let orederedFood = new OrderedFood(0, 0, "", "");
      orederedFood.cloneFrom(food);
      this.orderedFood.push(orederedFood);
    }
  }

  resetOrderedFood() {
    this.orderedFood = [];
  }

  getFoodByCategory(category: number, keyword?: string, startIndex?: number, count?: number): Observable<Array<Food>> {
    let filteredFoods = this.allFoods.filter(elm => {
      return elm.category == category;
    });
    if (keyword) {
      keyword = keyword.toLowerCase();
      filteredFoods = filteredFoods.filter(food => {
        return food.keyWord.includes(keyword);
      });
    }
    if (!isNaN(startIndex) && !isNaN(count)) {
      return Observable.of(filteredFoods.slice(startIndex, startIndex + count));
    } else {
      return Observable.of(filteredFoods);
    }
  }

  getOrderedFoods() {
    return this.orderedFood;
  }
}
