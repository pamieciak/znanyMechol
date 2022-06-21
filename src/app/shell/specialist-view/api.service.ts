import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Specialist } from './specialist.intefrace';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_URL = 'http://localhost:3000/specialists';

  private readonly specialistList = new BehaviorSubject<Specialist[]>([]);

  private readonly searchValue = new ReplaySubject<string>(1);

  constructor(private http: HttpClient, private router: Router) {
    this.getSpecialistList();
  }
  public get shareValue$() {
    return this.searchValue.asObservable();
  }

  public get searchAll$() {
    return this.specialistList.asObservable();
  }

  public getSpecialistList(value?: string | null | Observable<string>) {
    if (value) {
      return this.http.get<Specialist[]>(`${this.API_URL}?q=${value}`).subscribe(search => {
        this.specialistList.next(search);
      });
    } else {
      return this.http.get<Specialist[]>(this.API_URL).subscribe(specialists => {
        this.specialistList.next(specialists);
      });
    }
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
