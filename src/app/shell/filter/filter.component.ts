import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommunicationService } from '@shared/services/communication.service';
import { SpecialistService } from '../specialist-view/specialist.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  public btnContent: any = '';

  public inputValue$ = this.share.shareValue$;

  constructor(private specialistApi: SpecialistService, private share: CommunicationService) {}

  public showSpecByJob(value: string) {
    this.specialistApi.getSpecialistByJob(value);
    this.btnContent = this.share.sendValue(value);
  }

  public clearFilter() {
    this.specialistApi.getSpecialist();
    this.btnContent = this.share.sendValue('');
  }
}
