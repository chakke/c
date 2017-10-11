import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-dc-find-place',
  templateUrl: 'dc-find-place.html',
})
export class DcFindPlacePage {
  placholder = "Tìm địa điểm...";
  tab = "google";
  searchKeyword = "";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private googleMaps: GoogleMaps) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DcFindPlacePage');
  }

  loadMap() {
    let mapElement = document.getElementById('dc-find-place-map');

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };
    let map = this.googleMaps.create(mapElement, mapOptions);
    map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
      })
  }

  search() {

  }

}
