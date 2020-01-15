import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reductionString'
})
export class ReductionStringPipe implements PipeTransform {

  transform(str: string): any {
    const tempArr = str.split(' ');
    const limit = 80;

    let result = '';
    let i = 0;

    if (str.length > limit) {
      do {
        result += ` ${tempArr[i]}`;
        i++;
      } while (result.length < limit);

      result += '...';
    } else {
      result = str;
    }

    return result;
  }

}
