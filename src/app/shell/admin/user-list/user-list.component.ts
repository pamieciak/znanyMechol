import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UsersService } from '@shared/services/users.service';
import { User } from 'app/auth/user.interface';
import { AppState } from 'app/store/app.state';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  public isOpenModal = false;
  public isOpenConfimationModal = false;
  public userData = this.store.select(state => state.appUser.value);
  public user$ = this.store.select(state => state.users.users);
  public adminPass = new FormControl('');
  public selectedUserName? = '';

  constructor(
    private userService: UsersService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private store: Store<AppState>
  ) {}

  public openChangePasswordModal(user: User) {
    this.selectedUserName = user.name;
    this.isOpenModal = !this.isOpenModal;
  }

  public openConfirmationModal() {
    this.isOpenModal = !this.isOpenModal;
    this.isOpenConfimationModal = !this.isOpenConfimationModal;
  }

  public chceckIfPasswordMatch(adminPass: string) {
    this.userService.checkUserPass(adminPass).subscribe(ifPassIsMatch => {
      if (ifPassIsMatch) {
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

  public closeResetMOdal() {
    if (this.isOpenConfimationModal) this.isOpenConfimationModal = false;
  }
}
