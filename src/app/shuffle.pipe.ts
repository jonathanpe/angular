import { Pipe, PipeTransform } from '@angular/core';
import { Album } from './album';

@Pipe({
  name: 'shuffle' // nom du pipe à utiliser dans le template
})
export class ShufflePipe implements PipeTransform {

  // un pipe avec un argument
  transform(data: any[]): any[] {

    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor( Math.random() * (i + 1) );
     // console.log(i, j, j, i); // on mélange les indices
      [data[i], data[j]] = [data[j], data[i]];
    }

    return data;

  }

}