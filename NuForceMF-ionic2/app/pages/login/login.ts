import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { UserData } from '../../providers/user-data/user-data';


@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData) { }

  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      console.log('form.valid called');
      this.userData.login(this.login.username);
      this.navCtrl.setRoot(HomePage);
    }
  }

  onSignup() {
    console.log('onSignUp called');

    this.navCtrl.pop();
  }
}
