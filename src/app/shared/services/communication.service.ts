import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private readonly shareValue = new Subject<string>();

  public get shareValue$() {
    return this.shareValue.asObservable();
  }

  public sendValue(value: string) {
    if (!value) {
      return this.shareValue.next('');
    } else {
      return this.shareValue.next(value);
    }
  }
}
