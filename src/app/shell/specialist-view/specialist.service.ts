import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Specialist } from './specialist.intefrace';

@Injectable({
  providedIn: 'root',
})
export class SpecialistService {
  public readonly API_URL = 'http://localhost:3000/specialists';

  constructor(private specialistApi: HttpClient) {}

  public getSpecialist() {
    return this.specialistApi.get<Specialist[]>(this.API_URL);
  }
}
