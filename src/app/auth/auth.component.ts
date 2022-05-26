import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
// import { User } from './user.interface';
// import { Authinterface } from './authinterface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  // public authArray: User[] = [];

  // public authRespone$ = this.authService.getUsers().subscribe(data => {
  //   this.authArray = data;
  // });
  //jaki pomysł na to żeby sprawdzić?
  public authForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.minLength(6)),
  });

  //czy private? jaki modyfikator
  constructor(private authService: AuthService) {}

  public onSubmit() {
    //   const userEmail = this.authForm.value.email;
    //   const userPassword = this.authForm.value.password;
    //   this.authArray.every(data => {
    //     if (userEmail === data.email && userPassword === data.password) {
    //       return console.log('Użytkownik istnieje');
    //     } else {
    //       console.log('Nieporawne dane');
    //     }
    //   });
    //   this.authForm.reset();
    // }
    this.authService.logIn(this.authForm.value.email, this.authForm.value.password).subscribe(console.log);
  }
}
