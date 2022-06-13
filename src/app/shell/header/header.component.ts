import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'app/auth/auth.service';
import { ApiService } from '../specialist-view/api.service';

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

  constructor(private auth: AuthService, private specialistApi: ApiService) {}

  public searchValue() {
    if (this.search.value === '') {
      this.specialistApi.getSpecialistList();
    } else {
      this.specialistApi.getSpecialistList(this.search.value.toLowerCase());
      this.specialistApi.sendValue(this.search.value);
      this.specialistApi.queryService(this.search.value);
    }
  }
}
