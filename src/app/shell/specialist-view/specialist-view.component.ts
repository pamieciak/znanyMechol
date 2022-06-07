import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SpecialistService } from './specialist.service';

@Component({
  selector: 'app-specialist-view',
  templateUrl: './specialist-view.component.html',
  styleUrls: ['./specialist-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialistViewComponent {
  // public selected!: Date | null;
  public specialist$ = this.specialistApi.getSpecialist();

  constructor(private specialistApi: SpecialistService) {}
}
