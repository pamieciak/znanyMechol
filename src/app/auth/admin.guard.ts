import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/store/app.state';
import { Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}

  public canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store
      .select(state => state.isAdminLoggedIn.isAdminLoggedIn)
      .pipe(
        take(1),
        tap(isAdmin => {
          if (isAdmin) {
            return;
          } else {
            this.router.navigate(['home']);
          }
        })
      );
  }
}
