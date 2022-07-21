import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';

export type x = {
  name: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public auth$ = this.store.select(state => state.auth.isUserAuthorised);
  public isAdmin$ = this.store.select(state => state.isAdminLoggedIn.isAdminLoggedIn);
  constructor(private store: Store<AppState>) {}
}
