import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Specialist } from 'app/shell/specialist-view/specialist.intefrace';
import { AppState } from 'app/store/app.state';
import { setSpecialistsListAction } from 'app/store/specialist-list/specialist-list.actions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpecialistsService {
  private readonly API_URL = 'http://localhost:3000/specialists';

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.getSpecialistList();
  }

  public getSpecialistList(value?: string | null | Observable<string>) {
    if (value) {
      return this.http.get<Specialist[]>(`${this.API_URL}?q=${value}`).subscribe(specialists => {
        this.store.dispatch(setSpecialistsListAction.setSpecialists({ specialists }));
      });
    } else {
      return this.http.get<Specialist[]>(this.API_URL).subscribe(specialists => {
        this.store.dispatch(setSpecialistsListAction.setSpecialists({ specialists }));
      });
    }
  }

  public postSpecialist(data: Specialist) {
    this.http.post<Specialist[]>('http://localhost:3000/specialists', data).subscribe();
    this.getSpecialistList();
  }

  public editSpecialist(data: Specialist) {
    this.http.put<Specialist>(`${this.API_URL}/${data.id}`, data).subscribe(updatedSpecialist => {
      this.store.dispatch(setSpecialistsListAction.addUpdatedSpecialist({ updatedSpecialist }));
    });
  }

  public deleteSpecialist(id: number | undefined) {
    this.http.delete<Specialist[]>(`${this.API_URL}/${id}`).subscribe(() => {
      this.store.dispatch(setSpecialistsListAction.deleteSpecialist({ id }));
    });
  }

  public getSpecialistDetails(id: string | undefined) {
    return this.http.get<Specialist[]>(`${this.API_URL}?q=${id}`);
  }
}
