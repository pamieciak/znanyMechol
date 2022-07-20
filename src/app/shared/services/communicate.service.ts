import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/store/app.state';
import { searchActions } from 'app/store/search/search.actions';

@Injectable({
  providedIn: 'root',
})
export class CommunicateService {
  constructor(private router: Router, private store: Store<AppState>) {}

  public queryService(value: string) {
    const qParam: Params = { q: value };
    this.router.navigate(['home'], {
      queryParams: qParam,
      queryParamsHandling: 'merge',
    });
  }

  public sendValue(search: string | undefined) {
    this.store.dispatch(searchActions.search({ search }));
  }
}
