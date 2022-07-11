import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from 'app/store/auth';
import { isAdminActions } from 'app/store/isAdmin/isAdmin.actions';
import { ToastrService } from 'ngx-toastr';
import { map, ReplaySubject, tap } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly API_URL = 'http://localhost:3000/users';

  private readonly user = new ReplaySubject<User>(1);

  constructor(
    private authApi: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private store: Store
  ) {
    this.isAutorised();
  }

  public get user$() {
    return this.user.asObservable();
  }

  public logIn(email: string, password: string) {
    return this.authApi.get<User[]>(`${this.API_URL}?email=${email}&password=${password}`).pipe(
      map(users => {
        const hasUsers = users.length !== 0;
        //sideEffect
        if (hasUsers) {
          this.user.next(users[0]);
          localStorage.setItem('user', JSON.stringify(users[0]));

          if (users[0].role !== 'admin') {
            this.store.dispatch(isAdminActions.isntThisAdmin());
          } else {
            this.store.dispatch(isAdminActions.isThisAdmin());
          }
        }
        return hasUsers;
      }),
      tap(isLogIn => {
        if (isLogIn) {
          this.toastr.success('Logowanie prawidłowe', 'Sukces!');
          this.store.dispatch(authActions.isLogedInTrue());
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.toastr.error('Logowanie nieprawidłowe', 'Uwaga!');
        }
      })
    );
  }

  public logOut() {
    this.store.dispatch(authActions.isLogedInFalse());
    this.store.dispatch(isAdminActions.isntThisAdmin());
    this.toastr.success('Wylogowano', 'Sukces!');
  }

  private isAutorised() {
    const user = JSON.parse(String(localStorage.getItem('user')));
    if (!user) {
      return;
    } else {
      this.user.next(user);
      if (user.role !== 'admin') {
        this.store.dispatch(isAdminActions.isntThisAdmin());
      } else {
        this.store.dispatch(isAdminActions.isThisAdmin());
      }
      // this.isLogedIn.next(true);
      this.store.dispatch(authActions.isLogedInTrue());
    }
  }
}
