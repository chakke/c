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
  map: GoogleMap;
  scrollContent: HTMLElement;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private googleMaps: GoogleMaps) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DcFindPlacePage');
    this.loadMap();
    this.scrollContent = <HTMLElement>document.querySelector('#dc-find-place-content .scroll-content');
    if (this.scrollContent) {
      this.scrollContent.style.setProperty("background-color", "#FFF", "important");
    }
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
    this.map = this.googleMaps.create(mapElement, mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
        console.log("set map visible false");
        this.map.setVisible(false);
      })
  }

  search() {

  }

  tabChange() {
    if (this.tab == "map") {
      if (this.scrollContent) {
        this.scrollContent.style.setProperty("background-color", "transparent", "important");
      }
      if (this.map) {
        this.map.setVisible(true);
      }
      console.log("set map visible true");
    } else {
      if (this.map)
        this.map.setVisible(false);
      console.log("set map visible false");
    }
  }

}
