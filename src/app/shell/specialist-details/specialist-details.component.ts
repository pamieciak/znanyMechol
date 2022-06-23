import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ApiService } from '../specialist-view/api.service';
import { Specialist } from '../specialist-view/specialist.intefrace';

@Component({
  selector: 'app-specialist-details',
  templateUrl: './specialist-details.component.html',
  styleUrls: ['./specialist-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialistDetailsComponent implements OnInit {
  public id!: string | undefined;

  public specDetails$!: Observable<Specialist[]>;

  private readonly API_URL = 'http://localhost:3000/specialists';

  constructor(private apiService: ApiService, private routes: ActivatedRoute, private http: HttpClient) {}

  public ngOnInit(): void {
    this.id = this.routes.snapshot.paramMap.get('id')?.split('-').pop();
    this.apiService.sendValue(this.id);
    this.specDetails$ = this.apiService.shareValue$.pipe(
      switchMap(res => {
        return this.http.get<Specialist[]>(`${this.API_URL}?q=${res}`);
      })
    );
  }
}
