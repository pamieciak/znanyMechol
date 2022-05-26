import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly API_URL = 'http://localhost:3000/users';

  constructor(private authApi: HttpClient, private router: Router) {}

  public logIn(email: string, password: string) {
    return this.authApi.get<User[]>(`${this.API_URL}?email=${email}&password=${password}`).pipe(
      map(users => {
        return users.length !== 0;
      }),
      tap(isLogIn => {
        if (isLogIn) {
          this.router.navigate(['app']);
        } else {
          alert('nie udało się zalogować');
        }
      })
    );
  }
}
