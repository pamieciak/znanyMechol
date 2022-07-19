import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rating',
})
export class RatingPipe implements PipeTransform {
  public transform(rating: number) {
    return '⭐️'.repeat(rating);
  }
}
