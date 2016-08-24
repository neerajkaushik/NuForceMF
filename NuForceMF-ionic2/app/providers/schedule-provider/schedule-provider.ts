import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ScheduleProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ScheduleProvider {

  data: any = null;
  distance: any = null;


  constructor(private http: Http) {}

  load() {

    console.log('---> called ScheduleProvider load');  

    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      
      /* commented to use javascript adapter for aditional security
        this.http.get('http://localhost:4567/schedule')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          console.debug('Schedule load data', this.data.job);
          resolve(this.data.job);
        });*/
        let dataRequest = new WLResourceRequest('/adapters/employeeAdapter/getSchedule',WLResourceRequest.GET);
        dataRequest.send().then((success)=>{
          console.log("data loaded from adapter"+success);
          this.data = success.responseJSON.job;
          resolve(this.data)
        },(failure)=>{
          console.log("failed to load data"+failure);
          resolve('error')
        })
       
    });
  }

}

