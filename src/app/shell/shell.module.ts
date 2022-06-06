import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ShellComponent, HeaderComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ShellComponent,
      },
    ]),
    MatIconModule,
  ],
})
export class ShellModule {}
