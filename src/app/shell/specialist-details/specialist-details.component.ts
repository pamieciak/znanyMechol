import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunicateService } from '@shared/services/communicate.service';
import { SpecialistsService } from '@shared/services/specialists.service';
import { Observable, switchMap } from 'rxjs';
import { Specialist } from '../../shell/specialist-view/specialist.intefrace';

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

  constructor(
    private specialistService: SpecialistsService,
    private communicateService: CommunicateService,
    private routes: ActivatedRoute,
    private http: HttpClient
  ) {}

  public ngOnInit(): void {
    this.id = this.routes.snapshot.paramMap.get('id')?.split('-').pop();
    this.communicateService.sendValue(this.id);
    this.specDetails$ = this.specialistService.shareValue$.pipe(
      switchMap(res => {
        return this.http.get<Specialist[]>(`${this.API_URL}?q=${res}`);
      })
    );
  }
}
