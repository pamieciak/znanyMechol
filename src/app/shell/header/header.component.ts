import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommunicationService } from '@shared/services/communication.service';
import { AuthService } from 'app/auth/auth.service';
import { SpecialistService } from '../specialist-view/specialist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public isLogedIn$ = this.auth.isLogedIn$;

  public user$ = this.auth.user$;

  public search = new FormControl('');

  constructor(
    private auth: AuthService,
    private specialistApi: SpecialistService,
    private share: CommunicationService
  ) {}

  public searchValue() {
    if (this.search.value === '') {
      this.specialistApi.getSpecialist();
    } else {
      this.specialistApi.getSpecialistByJob(this.search.value.toLowerCase());
      this.share.sendValue(this.search.value);
      console.log(this.search.value);
    }
  }
}
