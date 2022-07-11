import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'app/auth/user.interface';
import { ApiService } from 'app/shell/specialist-view/api.service';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, take } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  public openM = false;
  public openConf = false;

  public loggedUser = JSON.parse(String(localStorage.getItem('user')));
  public role = this.loggedUser['role'];

  public userData = new ReplaySubject<User>(1);

  public user$ = this.apiService.userAll$;

  public adminPass = new FormControl('');

  constructor(private apiService: ApiService, private toastr: ToastrService, private cdr: ChangeDetectorRef) {}

  public changePassword(user: User) {
    this.userData.next(user);
    this.openM = !this.openM;
  }

  public openConfirmation() {
    this.openM = !this.openM;
    this.openConf = !this.openConf;
  }

  public chceckRole(adminPass: string) {
    this.apiService.getUserRole(this.role, adminPass);

    this.apiService.isPasswordMatch.pipe(take(1)).subscribe(isTrue => {
      if (isTrue) {
        this.toastr.success('Hasło zresetowane', 'Sukces!');
        this.openConf = false;
        this.cdr.markForCheck();
        //ZAPYTAĆ O TO!
      } else {
        this.toastr.error('Niepoprawne hasło admina', 'Błąd!');
      }
    });
  }

  public closeModal() {
    if (this.openM) this.openM = false;
  }

  public closeReset() {
    if (this.openConf) this.openConf = false;
  }
}
