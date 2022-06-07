import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

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
    CommonModule,
  ],
})
export class ShellModule {}
