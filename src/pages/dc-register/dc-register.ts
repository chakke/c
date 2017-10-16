import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppControllerProvider } from '../../providers/app-controller/app-controller';

@IonicPage()
@Component({
  selector: 'page-dc-register',
  templateUrl: 'dc-register.html',
})
export class DcRegisterPage {
  phone = "";
  password = "";
  retypePass = "";
  loginForm: FormGroup;
  isSubmitted = false;
  phoneErrorMessage = "";
  passwordErrorMessage = "";
  retypePassErrorMessage = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private appController: AppControllerProvider) {
    this.loginForm = this.formBuilder.group({
      phone: ['', Validators.compose([Validators.maxLength(20), Validators.minLength(8), Validators.required, Validators.pattern(/^\d+$/)])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      retypePass: ['', Validators.compose([Validators.pattern(this.password), Validators.required])]
    })
  }

  register() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      console.log("register");
      this.appController.getUserService().register(this.phone, this.password);
      this.navCtrl.popToRoot();
    } else {
      this.checkForm();
    }
  }

  checkForm() {
    this.loginForm.controls.retypePass.setValidators(Validators.compose([Validators.pattern(this.password), Validators.required]));
    let phoneError = this.loginForm.controls.phone.errors;
    if (phoneError) {
      if (phoneError.hasOwnProperty('required')) {
        this.phoneErrorMessage = "Vui lòng điền số điện thoại";
      } else {
        this.phoneErrorMessage = "Số điện thoại không hợp lệ";
      }
    }
    let passwordError = this.loginForm.controls.password.errors;
    if (passwordError) {
      if (passwordError.hasOwnProperty('required')) {
        this.passwordErrorMessage = "Vui lòng điền mật khẩu";
      } else {
        this.passwordErrorMessage = "Mật khẩu phải có độ dài tối thiểu 6 kí tự";
      }
    }
    let retypePassError = this.loginForm.controls.retypePass.errors;
    console.log(retypePassError);
    if (retypePassError) {
      if (retypePassError.hasOwnProperty('required')) {
        this.retypePassErrorMessage = "Vui lòng nhập lại mật khẩu";
      } else {
        this.retypePassErrorMessage = "Xác nhận mật khẩu không chính xác";
      }
    }
  }

  gotoLogin() {
    this.navCtrl.push("DcLoginPage");
    if (this.navCtrl.length() > 1) {
      this.navCtrl.remove(1, this.navCtrl.length() - 1);
    }
  }

}
