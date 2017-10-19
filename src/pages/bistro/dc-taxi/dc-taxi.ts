import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppControllerProvider } from '../../../providers/bistro/app-controller/app-controller';
import { Address } from '../../../providers/bistro/classes/address';

@IonicPage()
@Component({
  selector: 'page-dc-taxi',
  templateUrl: 'dc-taxi.html',
})
export class DcTaxiPage {

  form: FormGroup;
  adress: string = "";
  person: number;
  car: string = "";
  isSubmited = false;
  errorMessage = "";
  currentAddress: Address;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private appController: AppControllerProvider, private formBuilder: FormBuilder,
    private modalCtrl: ModalController) {
    this.form = this.formBuilder.group(
      {
        address: [""],
        person: [""],
        car: [""],
      }
    )
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    this.currentAddress = this.appController.getAddressService().getCurrentAddress();
  }

  continue() {
    if (this.currentAddress) {
      this.appController.showToast("Gọi taxi thành công");
      this.appController.getAddressService().addRecentAddress(this.currentAddress);
    } else {
      this.errorMessage = "Vui lòng chọn điểm đến";
    }

  }

  getTarget(address: Address) {
    if (address) {
      if (address.address.toLowerCase().includes(address.name.toLowerCase())) {
        return address.address;
      }else{
        return address.name + " " + address.address;
      }
    }
    return "Điểm đến";
  }

  pickPlace(event) {
    this.navCtrl.push("DcFindPlacePage");
  }



}
