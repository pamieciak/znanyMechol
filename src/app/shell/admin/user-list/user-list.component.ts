import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UsersService } from '@shared/services/users.service';
import { User } from 'app/auth/user.interface';
import { AppState } from 'app/store/app.state';

import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, take } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  public isOpenModal = false;
  public isOpenConfimationModal = false;

  public loggedUser = JSON.parse(String(localStorage.getItem('user')));
  public role = this.loggedUser['role'];

  public userData = new ReplaySubject<User>(1);

  public user$ = this.store.select(state => state.users.users);

  public adminPass = new FormControl('');

  constructor(
    private userService: UsersService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private store: Store<AppState>
  ) {}

  public changePassword(user: User) {
    this.userData.next(user);
    this.isOpenModal = !this.isOpenModal;
  }

  public openConfirmation() {
    this.isOpenModal = !this.isOpenModal;
    this.isOpenConfimationModal = !this.isOpenConfimationModal;
  }

  public chceckRole(adminPass: string) {
    if (this.role === 'admin') {
      this.userService.getUserRole(this.role, adminPass);
    }

    this.userService.isPasswordMatch.pipe(take(1)).subscribe(isTrue => {
      if (isTrue) {
        this.toastr.success('Hasło zresetowane', 'Sukces!');
        this.isOpenConfimationModal = false;
        this.adminPass.setValue('');
        this.cdr.markForCheck();
      } else {
        this.toastr.error('Niepoprawne hasło admina', 'Błąd!');
      }
    });
  }

  public closeModal() {
    if (this.isOpenModal) this.isOpenModal = false;
  }

  public closeReset() {
    if (this.isOpenConfimationModal) this.isOpenConfimationModal = false;
  }
}
