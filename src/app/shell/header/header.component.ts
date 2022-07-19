import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApiService } from '@shared/services/api.service';
import { AuthService } from 'app/auth/auth.service';
import { AppState } from 'app/store/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public openM = false;
  public isLogedIn$ = this.store.select(state => state.auth.isAuth);

  public user$ = this.auth.user$;

  public search = new FormControl('');

  public isAdmin$ = this.store.select(state => state.isAdmin.isAdmin);

  constructor(
    private auth: AuthService,
    private specialistApi: ApiService,
    private router: Router,
    private store: Store<AppState>
  ) {}

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

  public openModal() {
    this.openM = !this.openM;
  }

  public closeModal() {
    if (this.openM) {
      this.openM = false;
    }
  }
  public logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
    this.auth.logOut();
    this.openM = false;
  }
}
