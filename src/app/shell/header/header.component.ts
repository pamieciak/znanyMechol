import { Component, ChangeDetectionStrategy } from '@angular/core';
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

  constructor(private auth: AuthService) {}
}
