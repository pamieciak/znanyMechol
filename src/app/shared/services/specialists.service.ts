import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Specialist } from 'app/shell/specialist-view/specialist.intefrace';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpecialistsService {
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

  public postSpecialist(data: Specialist) {
    this.http.post<Specialist[]>('http://localhost:3000/specialists', data).subscribe();
    this.getSpecialistList();
  }

  public editSpecialist(data: Specialist) {
    this.http.put<Specialist>(`${this.API_URL}/${data.id}`, data).subscribe(updatedSpecialist => {
      const newList = this.specialistList.value.map(specialist => {
        if (specialist.id === updatedSpecialist.id) {
          return updatedSpecialist;
        } else {
          return specialist;
        }
      });
      this.specialistList.next(newList);
    });
  }

  public deleteSpecialist(id: number | undefined) {
    this.http.delete<Specialist[]>(`${this.API_URL}/${id}`).subscribe(() => {
      const newList = this.specialistList.value.filter(specialist => {
        return specialist.id != id;
      });
      this.specialistList.next(newList);
    });
  }

  public getSpecialistDetails(id: string | undefined) {
    return this.http.get<Specialist[]>(`${this.API_URL}?q=${id}`);
  }
}
