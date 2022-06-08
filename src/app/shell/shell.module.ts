import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SpecialistViewComponent } from './specialist-view/specialist-view.component';
import { RatingPipe } from './specialist-view/rating.pipe';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FilterComponent } from './filter/filter.component';
import { TouppercasePipe } from './specialist-view/touppercase.pipe';

@NgModule({
  declarations: [ShellComponent, HeaderComponent, SpecialistViewComponent, RatingPipe, FilterComponent, TouppercasePipe],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ShellComponent,
      },
    ]),
    MatIconModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class ShellModule {}
