import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
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

  public isAdmin$ = this.auth.isAdmin$;

  constructor(private auth: AuthService, private specialistApi: ApiService, private router: Router) {}

  public backToHome() {
    if (this.isAdmin$) {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/home']);
      this.specialistApi.sendValue('');
      this.specialistApi.getSpecialistList();
    }
  }

  public searchValue() {
    if (this.search.value === '') {
      this.specialistApi.getSpecialistList();
    } else {
      this.specialistApi.getSpecialistList(this.search.value.toLowerCase());
      this.specialistApi.sendValue(this.search.value);
      this.specialistApi.queryService(this.search.value);
    }
  }

  public logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
    this.auth.logOut();
  }
}
