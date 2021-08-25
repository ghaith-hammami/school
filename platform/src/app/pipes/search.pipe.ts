import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();
    return value.filter(function (data: any) {
      if (data.Topic) {
        return JSON.stringify(data.Topic).toLowerCase().includes(args);
      }
      else {
        return "nothing"
      }
    });
  }

}