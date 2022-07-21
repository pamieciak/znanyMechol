import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  public spinner = false;
  public closeLoginForm = false;

  public authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private changeDetRef: ChangeDetectorRef) {}

  public onSubmit() {
    if (this.authForm.valid) {
      this.spinner = true;
      this.closeLoginForm = true;

      setTimeout(() => {
        this.authService.logIn(this.authForm.value.email, this.authForm.value.password).subscribe(value => {
          if (value === false) {
            this.spinner = false;
            this.closeLoginForm = false;
            this.changeDetRef.markForCheck();
          }
        });
      }, 1000);
    }
  }
}
