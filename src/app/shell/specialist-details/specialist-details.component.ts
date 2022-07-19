import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunicateService } from '@shared/services/communicate.service';
import { SpecialistsService } from '@shared/services/specialists.service';
import { Observable } from 'rxjs';
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

  constructor(
    private specialistService: SpecialistsService,
    private communicateService: CommunicateService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')?.split('-').pop();
    this.communicateService.sendValue(this.id);
    this.specDetails$ = this.specialistService.getSpecialistDetails(this.id);
  }
}
