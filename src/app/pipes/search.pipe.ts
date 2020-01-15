import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(values: any[], searchText: string): any[] {
    if (!values) { return []; }
    if (!searchText) { return values; }

    searchText = searchText.toLowerCase();
    return values.filter( it => {
      return it.name.toLowerCase().includes(searchText);
    });
  }
}
