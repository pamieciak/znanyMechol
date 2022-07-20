import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'app/auth/user.interface';
import { AppState } from 'app/store/app.state';
import { setUserListActions } from 'app/store/user-list/user-list.actions';
import { map, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public isPasswordMatch = new Subject<boolean>();

  private readonly API_USER_URL = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.getUserList();
  }

  public getUserList() {
    return this.http.get<User[]>(`${this.API_USER_URL}?role_like=user`).subscribe(users => {
      this.store.dispatch(setUserListActions.setUsers({ users }));
    });
  }

  public getUserRole(pass: string) {
    return this.store
      .select(state => state.singleuser.singleuser)
      .pipe(
        switchMap(user => {
          return this.http.get<User[]>(`${this.API_USER_URL}?email_like${user?.email}=&password_like=${pass}`);
        }),
        map(users => users.length !== 0)
      );
  }
}
