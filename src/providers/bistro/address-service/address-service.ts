import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Address } from '../classes/address';
import { APIUrl } from '../app-constant';

declare var google: any;
@Injectable()
export class AddressServiceProvider {
  currentAddress: Address;
  recentAddress: Array<Address> = [];
  favouriteAddress: Array<Address> = [];
  constructor(public http: Http) {
    this.recentAddress = [
      new Address("Sân vận đông quốc gia Mỹ Đình", "Sân vận đông quốc gia Mỹ Đình", 21.020391, 105.7617783, new Date(Date.now() - 48 * 3600 * 1000)),
      new Address("Đại học Bách Khoa Hà Nội", "Đại học Bách Khoa Hà Nội", 21.0056183, 105.8411588, new Date(Date.now() - 9 * 3600 * 1000)),
      new Address("Ngõ 27 Đại Cồ Việt, Q. Hai Bà Trưng", "Ngõ 27 Đại Cồ Việt, Q. Hai Bà Trưng", 21.0078538, 105.8476211, new Date(Date.now() - 8 * 3600 * 1000))
    ]
    this.favouriteAddress = [
      new Address("Ngõ 27 Đại Cồ Việt, Q. Hai Bà Trưng", "Ngõ 27 Đại Cồ Việt, Q. Hai Bà Trưng", 21.0078538, 105.8476211, new Date(Date.now() - 8 * 3600 * 1000)),
      new Address("Đại học Bách Khoa Hà Nội", "Đại học Bách Khoa Hà Nội", 21.0056183, 105.8411588, new Date(Date.now() - 9 * 3600 * 1000)),
      new Address("Sân vận đông quốc gia Mỹ Đình", "Sân vận đông quốc gia Mỹ Đình", 21.020391, 105.7617783, new Date(Date.now() - 48 * 3600 * 1000)),
      new Address("Viện 103, Phùng Hưng - Hà Đông", "Viện 103, Phùng Hưng - Hà Đông", 20.9668597, 105.7872891, new Date(Date.now() - 72 * 3600 * 1000))
    ]
  }

  addRecentAddress(address: Address) {
    if (address) {
      address.time = new Date();
      let index = this.recentAddress.findIndex(elm => {
        return elm.address.trim().toLowerCase() == address.address.trim().toLowerCase() || (elm.lat == address.lat && elm.lng == address.lng);
      });
      console.log("index", index);
      if (index > -1) {
        this.recentAddress.splice(index, 1);
        console.log("length 1", this.recentAddress.length);
        this.recentAddress.push(address);
      } else {
        console.log("length 2", this.recentAddress.length);
        if (this.recentAddress.length >= 5) {
          this.recentAddress.shift();
        }
        this.recentAddress.push(address);
      }
    }
    console.log("add recent fucker", this.recentAddress);
  }

  addFavouriteAddress(address: Address) {
    if (address) {
      let index = this.favouriteAddress.findIndex(elm => {
        return elm.address.trim().toLowerCase() == address.address.trim().toLowerCase() || (elm.lat == address.lat && elm.lng == address.lng);
      });
      if (index == -1)
        this.favouriteAddress.push(address);
    }
  }

  setCurrentAddress(address: Address) {
    if (address) this.currentAddress = address;
  }

  removeItemFavouriteAddress(address: Address) {
    let index = this.favouriteAddress.findIndex(elm => {
      return elm.address.trim().toLowerCase() == address.address.trim().toLowerCase() || (elm.lat == address.lat && elm.lng == address.lng);
    });
    if (index > -1) {
      this.favouriteAddress.splice(index, 1);
    }
  }

  getRecentAddress() {
    return this.recentAddress;
  }

  getFavouriteAddress() {
    return this.favouriteAddress;
  }

  getCurrentAddress() {
    return this.currentAddress;
  }

  searchPlaceByName(keyword, element): Promise<Array<Address>> {
    return new Promise((resolve, reject) => {
      if (keyword && element) {
        let request = {
          query: keyword
        }
        let service = new google.maps.places.PlacesService(element);
        service.textSearch(request, (data) => {
          if (data) {
            let addresses: Array<Address> = [];
            data.forEach(element => {
              let address = new Address(element["formatted_address"],
                element["name"], element["geometry"]["location"].lat(),
                element["name"], element["geometry"]["location"].lng())
              addresses.push(address);
            });
            resolve(addresses);
          } else {
            reject();
          }
        })
      }
      else {
        reject();
      }
    })
  }

  searchPlaceByPosition(lat: number, lng: number): Promise<Array<Address>> {
    let url = APIUrl.GEOCODE_URL;
    url = url.replace('$latlng', lat + "," + lng);
    let addresses: Array<Address> = [];
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(data => {
        if (data["_body"]) {
          let body = JSON.parse(data["_body"]);
          body.results.forEach(place => {
            let address = new Address(place.formatted_address, place.formatted_address,
              place.geometry.location.lat, place.geometry.location.lng);
            addresses.push(address);
          });
          resolve(addresses);
        }
        else {
          reject()
        }
      }, error => {
        console.log("searchPlaceByPosition error", error);
        reject(error);
      })
    })
  }
}
