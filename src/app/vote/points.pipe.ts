import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'points'
})
export class PointsPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    switch (value) {
      case 0:
        return '+5';
      case 1:
      case 2:
        return '+3';
      case 3:
        return '+2';
      case 4:
        return '+1'
      default:
        return '0';
    }
  }

}
