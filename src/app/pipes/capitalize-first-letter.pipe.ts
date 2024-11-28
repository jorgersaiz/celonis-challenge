import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirstLetter'
})
export class CapitalizeFirstLetterPipe implements PipeTransform {

  transform(value: string) {
    if (value.length === 0) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
