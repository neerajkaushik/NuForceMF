import {Component} from '@angular/core';
import {UserData} from '../../providers/user-data/user-data';
import { App, NavController } from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(    
     navCtrl: NavController,
     app: App
  ) {

  }
}
