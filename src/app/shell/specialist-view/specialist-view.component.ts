import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommunicateService } from '@shared/services/communicate.service';
import { AppState } from 'app/store/app.state';

@Component({
  selector: 'app-specialist-view',
  templateUrl: './specialist-view.component.html',
  styleUrls: ['./specialist-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialistViewComponent {
  public specialist$ = this.store.select(state => state.specialists.specialists);

  constructor(private communicateService: CommunicateService, private store: Store<AppState>) {
    this.store.select(state => state.specialists.specialists);
    this.communicateService.sendValue('');
  }
}
