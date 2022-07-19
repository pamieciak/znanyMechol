import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/auth/user.interface';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public isPasswordMatch = new Subject<boolean>();

  private readonly API_USER_URL = 'http://localhost:3000/users';

  private readonly userList = new BehaviorSubject<User[]>([]);

  private readonly searchValue = new ReplaySubject<string>(1);

  constructor(private http: HttpClient) {
    this.getUserList();
  }

  public get shareValue$() {
    return this.searchValue.asObservable();
  }

  public get userAll$() {
    return this.userList.asObservable();
  }

  public getUserList() {
    return this.http.get<User[]>(this.API_USER_URL).subscribe(users => {
      const onlyUserList = users.filter(user => {
        return user.role === 'user';
      });
      this.userList.next(onlyUserList);
    });
  }

  public getUserRole(role: string, pass: string) {
    return this.http.get<User[]>(`${this.API_USER_URL}?q=${role}`).subscribe(admin => {
      if (admin[0].password === pass) {
        this.isPasswordMatch.next(true);
      } else {
        this.isPasswordMatch.next(false);
      }
    });
  }
}
