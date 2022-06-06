import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterViewInit {
  // public isLogedIn!: boolean;

  @ViewChild('logout') public logout!: ElementRef<HTMLLinkElement>;

  constructor(private auth: AuthService) {}

  public ngAfterViewInit() {
    console.log(this.logout.nativeElement.textContent);
  }
}
