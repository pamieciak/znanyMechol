import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'touppercase',
})
export class TouppercasePipe implements PipeTransform {
  public transform(specialization: string) {
    return specialization.charAt(0).toUpperCase() + specialization.substring(1);
  }
}
