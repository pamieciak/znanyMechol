import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommunicateService } from '@shared/services/communicate.service';
import { SpecialistsService } from '@shared/services/specialists.service';
import { AuthService } from 'app/auth/auth.service';
import { AppState } from 'app/store/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public isOpenModal = false;
  public isLogedIn$ = this.store.select(state => state.auth.isAuth);

  public user$ = this.auth.user$;

  public search = new FormControl('');

  public isAdmin$ = this.store.select(state => state.isAdmin.isAdmin);

  constructor(
    private auth: AuthService,
    private specialistService: SpecialistsService,
    private communicateService: CommunicateService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  public backToHome() {
    if (this.isAdmin$) {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/home']);
      this.communicateService.sendValue('');
      this.specialistService.getSpecialistList();
    }
  }

  public searchValue() {
    if (this.search.value === '') {
      this.specialistService.getSpecialistList();
    } else {
      this.specialistService.getSpecialistList(this.search.value.toLowerCase());
      this.communicateService.sendValue(this.search.value);
      this.communicateService.queryService(this.search.value);
    }
  }

  public openModal() {
    this.isOpenModal = !this.isOpenModal;
  }

  public closeModal() {
    if (this.isOpenModal) {
      this.isOpenModal = false;
    }
  }
  public logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
    this.auth.logOut();
    this.isOpenModal = false;
  }
}
