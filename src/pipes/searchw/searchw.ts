import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchw',
})

export class SearchwPipe implements PipeTransform {
 
  transform(data: any[], terms: string): any[] {
    if(!data) return [];

    if(!terms) return data;
    terms = terms.toLowerCase();

    return data.filter( it => {
      return it.nama_mapel.toLowerCase().includes(terms);
    });
  }

}
