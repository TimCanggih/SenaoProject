import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})

export class SearchPipe implements PipeTransform {

  transform(data: any[], terms: string): any[] {
    if(!data) return [];

    if(!terms) return data;
    terms = terms.toLowerCase();

    return data.filter( it => {
      return it.nama.toLowerCase().includes(terms);
    });
  }

}