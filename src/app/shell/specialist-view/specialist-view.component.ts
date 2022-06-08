import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SpecialistService } from './specialist.service';

@Component({
  selector: 'app-specialist-view',
  templateUrl: './specialist-view.component.html',
  styleUrls: ['./specialist-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialistViewComponent {
  public specialist$ = this.specialistApi.specialistList$;

  constructor(private specialistApi: SpecialistService) {}
}
