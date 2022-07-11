import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { User } from 'app/auth/user.interface';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { Specialist } from './specialist.intefrace';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public isPasswordMatch = new Subject<boolean>();

  private readonly API_URL = 'http://localhost:3000/specialists';
  private readonly API_USER_URL = 'http://localhost:3000/users';

  private readonly specialistList = new BehaviorSubject<Specialist[]>([]);

  private readonly userList = new BehaviorSubject<User[]>([]);

  private readonly searchValue = new ReplaySubject<string>(1);

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
    this.getSpecialistList();
    this.getUserList();
  }
  public get shareValue$() {
    return this.searchValue.asObservable();
  }

  public get searchAll$() {
    return this.specialistList.asObservable();
  }

  public get userAll$() {
    return this.userList.asObservable();
  }

  public postSpecialist(data: Specialist) {
    this.http.post<Specialist[]>('http://localhost:3000/specialists', data).subscribe();
    this.getSpecialistList();
  }

  public editSpecialist(data: Specialist) {
    this.http.put<Specialist>(`${this.API_URL}/${data.id}`, data).subscribe(updatedSpecialist => {
      const newList = this.specialistList.value.map(specialist => {
        if (specialist.id === updatedSpecialist.id) {
          return updatedSpecialist;
        } else {
          return specialist;
        }
      });
      this.specialistList.next(newList);
    });
  }

  public deleteSpecialist(id: number | undefined) {
    this.http.delete<Specialist[]>(`${this.API_URL}/${id}`).subscribe(() => {
      const newList = this.specialistList.value.filter(specialist => {
        return specialist.id != id;
      });
      this.specialistList.next(newList);
    });
  }

  public getSpecialistList(value?: string | null | Observable<string>) {
    if (value) {
      return this.http.get<Specialist[]>(`${this.API_URL}?q=${value}`).subscribe(search => {
        this.specialistList.next(search);
      });
    } else {
      return this.http.get<Specialist[]>(this.API_URL).subscribe(specialists => {
        this.specialistList.next(specialists);
      });
    }
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

  public queryService(value: string) {
    const qParam: Params = { q: value };
    this.router.navigate(['home'], {
      queryParams: qParam,
      queryParamsHandling: 'merge',
    });
  }

  public sendValue(value: string | undefined) {
    if (!value) {
      return this.searchValue.next('');
    } else {
      return this.searchValue.next(value);
    }
  }
}
