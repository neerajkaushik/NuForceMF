import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';
import {ScheduleProvider} from '../../providers/schedule-provider/schedule-provider'
import {DateDivider} from '../../pipes/date-divider';


@Component({
  templateUrl: 'build/pages/schedule/schedule.html',
  providers: [ScheduleProvider],
  pipes: [DateDivider]
})
export class SchedulePage {
  //selectedItem: any;
  //icons: string[];
  //items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, navParams: NavParams,public schedule: ScheduleProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    console.log('---> SchedulePage init');

    this.loadSchedule();
    /*this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }*/
    
  }
  job: any; 
  times: any;

  loadSchedule() {
      console.log('---> loading schedule');
      this.schedule.load().then((results) =>{
          let tm = [];
          let geos = null;
          
          for (var i=0; i < results.length; i++) {
              geos += results[i].address + '|';
              if (tm.indexOf(results[i].date) == -1) tm.push(results[i].date)
          }
          console.log('---> date array', tm)
          this.times = tm;
          this.job = results;
          /*this.schedule.calc(geos).then((results) => {
            for (var i=0; i < results.length; i++) {
                this.delivery[i].distance = results[i].distance.text;
                if (results[i].duration_in_traffic.value > results[i].duration.value) {
                    this.delivery[i].traffic = true;
                    this.delivery[i].duration = results[i].duration_in_traffic.text;
                } 
                else {
                    this.delivery[i].traffic = false;
                    this.delivery[i].duration = results[i].duration.text;
                }
                  //this.delivery[i].duration = results[i].duration.text;
            }
          })*/
      })
      
  }
  /*displayDetails(item) {
      
      let endTime = parseInt(item.time);
      endTime++;
      let msg = 'Delivery time: from ' + item.time + ':00 to ' + endTime + ':00<br>';
      msg += 'Address: ' + item.address;
      
      let prompt = Alert.create({
          title: 'Delivery details',
          subTitle: item.name,
          message: msg,
          buttons: [
              {
                  text: 'Close'
              },
              {
                  text: 'Navigate',
                  handler: data => {
                      console.log('---> Trying to navigate to address ', item.address);
                      
                      let geoLoc = 'geo:?q="' + item.address + '"';
                      
                      this.launchExternal(geoLoc);
                  }
              },
              {
                  text: 'Call',
                  handler: data => {
                      console.log('---> trying to call to ' + item.name + ' ' + item.phone);
                      
                      let pn = 'tel:' + item.phone;
                      
                      this.launchExternal(pn);
                  }
              },
              {
                  text: 'Delivered',
                  handler: data => {
                      console.log('---> Item delivered', item);
                      
                      let index = this.delivery.indexOf(item);
                      this.delivery[index].delivered = true;
                  }
              }
          ]
      });
      
      this.nav.present(prompt);
  }*/    

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
