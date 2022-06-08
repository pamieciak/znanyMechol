import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public isLogedIn$ = this.auth.isLogedIn$;

  public user$ = this.auth.user$;

  public search = new FormControl('');

  public value$ = this.search.valueChanges;

  constructor(private auth: AuthService) {}
}
