import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, ReplaySubject, tap } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly API_URL = 'http://localhost:3000/users';

  private readonly isLogedIn = new BehaviorSubject<boolean>(false);

  private readonly user = new ReplaySubject<User>(1);

  private readonly isAdmin = new BehaviorSubject<boolean>(false);

  constructor(private authApi: HttpClient, private router: Router, private toastr: ToastrService) {
    this.isAutorised();
  }

  public get isLogedIn$() {
    return this.isLogedIn.asObservable();
  }

  public get user$() {
    return this.user.asObservable();
  }

  public get isAdmin$() {
    return this.isAdmin.asObservable();
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
            this.isAdmin.next(false);
          } else {
            this.isAdmin.next(true);
          }
        }
        return hasUsers;
      }),
      tap(isLogIn => {
        if (isLogIn) {
          this.toastr.success('Logowanie prawidłowe', 'Sukces!');
          this.isLogedIn.next(true);
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.toastr.error('Logowanie nieprawidłowe', 'Uwaga!');
        }
      })
    );
  }

  public logOut() {
    this.isLogedIn.next(false);
    this.isAdmin.next(false);
    this.toastr.success('Wylogowano', 'Sukces!');
  }

  private isAutorised() {
    const user = JSON.parse(String(localStorage.getItem('user')));
    if (!user) {
      return;
    } else {
      this.user.next(user);
      if (user.role !== 'admin') {
        this.isAdmin.next(false);
      } else {
        this.isAdmin.next(true);
      }
      this.isLogedIn.next(true);
    }
  }
}
