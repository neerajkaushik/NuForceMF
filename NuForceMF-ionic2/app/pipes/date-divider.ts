import { Injectable, Pipe,PipeTransform } from '@angular/core';

/*
  Generated class for the TimeDivider pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'datedivider'
})
@Injectable()
export class DateDivider {
  /*
    Takes a value and makes it lowercase.
   */
  transform(items: any[], args: any[]): any {
      return items.filter(item => item.date == args[0]);
  }
}
