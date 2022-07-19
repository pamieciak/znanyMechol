import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommunicateService } from '@shared/services/communicate.service';
import { SpecialistsService } from '@shared/services/specialists.service';

@Component({
  selector: 'app-specialist-view',
  templateUrl: './specialist-view.component.html',
  styleUrls: ['./specialist-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialistViewComponent implements OnInit {
  public specialist$ = this.specialistService.searchAll$;

  constructor(private specialistService: SpecialistsService, private communicateService: CommunicateService) {
    this.specialistService.getSpecialistList();
    this.communicateService.sendValue('');
  }

  public ngOnInit() {
    return;
  }
}
