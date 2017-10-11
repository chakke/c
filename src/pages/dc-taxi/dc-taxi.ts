import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private appCtrl: AppControllerProvider, private formBuilder: FormBuilder) {
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

  continue() {
    if (!this.isSubmited) {
      this.form.controls.address.setValidators(Validators.compose([Validators.required]));
      this.form.controls.person.setValidators(Validators.compose([Validators.pattern(/^\d+$/)]));
      for (var key in this.form.controls) {
        if (this.form.controls.hasOwnProperty(key)) {
          var control = this.form.controls[key];
          control.updateValueAndValidity();

        }
      }
      this.form.updateValueAndValidity();
    }
    if (this.form.valid) {
      console.log("valid");
      this.appCtrl.showToast("Gọi taxi thành công");
    } else {
      let error = this.form.controls.address.errors
      if (error && error["required"]) {
        this.errorMessage = "Vui lòng điền điểm đến";
      }
      else {
        error = this.form.controls.person.errors
        if (error && error.hasOwnProperty("pattern")) {
          this.errorMessage = "Số người không hợp lệ";
        }
      }
    }
  }
}
