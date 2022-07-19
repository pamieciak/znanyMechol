import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicateService {
  private readonly searchValue = new ReplaySubject<string>(1);

  constructor(private http: HttpClient, private router: Router) {}

  public get shareValue$() {
    return this.searchValue.asObservable();
  }

  public queryService(value: string) {
    const qParam: Params = { q: value };
    this.router.navigate(['home'], {
      queryParams: qParam,
      queryParamsHandling: 'merge',
    });
  }

  public sendValue(value: string | undefined) {
    if (!value) {
      return this.searchValue.next('');
    } else {
      return this.searchValue.next(value);
    }
  }
}
