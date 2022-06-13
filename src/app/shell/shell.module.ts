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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NbThemeModule, NbLayoutModule, NbIconModule, NbStatusService } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SpecialistDetailsComponent } from './specialist-details/specialist-details.component';

@NgModule({
  declarations: [
    ShellComponent,
    HeaderComponent,
    SpecialistViewComponent,
    RatingPipe,
    FilterComponent,
    TouppercasePipe,
    SpecialistDetailsComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ShellComponent,
        children: [
          {
            path: 'details/:id',
            component: SpecialistDetailsComponent,
          },
          {
            path: '',
            component: SpecialistViewComponent,
          },
        ],
      },
    ]),
    MatIconModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FontAwesomeModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbThemeModule,
  ],
  providers: [NbStatusService],
})
export class ShellModule {}
