import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'app/auth/user.interface';
import { AppState } from 'app/store/app.state';
import { setUserListActions } from 'app/store/user-list/user-list.actions';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public isPasswordMatch = new Subject<boolean>();

  private readonly API_USER_URL = 'http://localhost:3000/users';

  private readonly searchValue = new ReplaySubject<string>(1);

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.getUserList();
  }

  public get shareValue$() {
    return this.searchValue.asObservable();
  }

  public getUserList() {
    return this.http.get<User[]>(`${this.API_USER_URL}?role_like=user`).subscribe(users => {
      this.store.dispatch(setUserListActions.setUsers({ users }));
    });
  }

  public getUserRole(role: string, pass: string) {
    return this.http.get<User[]>(`${this.API_USER_URL}?role_like=${role}&password_like=${pass}`).subscribe(admin => {
      this.isPasswordMatch.next(admin.length !== 0);
    });
  }
}
