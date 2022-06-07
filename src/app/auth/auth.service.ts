import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, ReplaySubject, tap } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly API_URL = 'http://localhost:3000/users';

  private readonly isLogedIn = new BehaviorSubject<boolean>(false);

  private readonly user = new ReplaySubject<User>(1);

  constructor(private authApi: HttpClient, private router: Router) {}

  public get isLogedIn$() {
    return this.isLogedIn.asObservable();
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
        }
        return hasUsers;
      }),
      tap(isLogIn => {
        if (isLogIn) {
          alert('logowanie prawidłowe');
          this.isLogedIn.next(true);
          this.router.navigate(['home']);
        } else {
          alert('nie udało się zalogować');
        }
      })
    );
  }
}
