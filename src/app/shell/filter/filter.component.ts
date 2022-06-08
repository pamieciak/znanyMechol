import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SpecialistService } from '../specialist-view/specialist.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  public btnContent = '';

  constructor(private specialistApi: SpecialistService) {}

  public showSpecByJob(value: string) {
    this.specialistApi.getSpecialistByJob(value);
    this.btnContent = value;
  }

  public clearFilter() {
    this.specialistApi.getSpecialist();
    this.btnContent = '';
  }
}
