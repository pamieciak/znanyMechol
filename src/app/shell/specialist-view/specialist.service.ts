import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Specialist } from './specialist.intefrace';

@Injectable({
  providedIn: 'root',
})
export class SpecialistService {
  private readonly API_URL = 'http://localhost:3000/specialists';

  private readonly specialistList = new BehaviorSubject<Specialist[]>([]);

  constructor(private http: HttpClient) {
    this.getSpecialist();
  }

  public get specialistList$() {
    return this.specialistList.asObservable();
  }

  public getSpecialist() {
    this.http.get<Specialist[]>(this.API_URL).subscribe(specialists => {
      this.specialistList.next(specialists);
    });
  }

  public getSpecialistByJob(value: string | null) {
    return this.http.get<Specialist[]>(`${this.API_URL}?specialization=${value}`).subscribe(specialistJob => {
      this.specialistList.next(specialistJob);
    });
  }
}
