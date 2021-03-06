import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'separateThousands'
})
export class SeparateThousandsPipe implements PipeTransform {

  transform(num: any): any {
    return num.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
  }

}
