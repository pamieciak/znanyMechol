import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SpecialistViewComponent } from './specialist-view/specialist-view.component';

import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FilterComponent } from './filter/filter.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  NbThemeModule,
  NbLayoutModule,
  NbIconModule,
  NbStatusService,
  NbDialogModule,
  NbCardModule,
  NbDialogService,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SpecialistDetailsComponent } from './specialist-details/specialist-details.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AddSpecialistComponent } from './admin/add-specialist/add-specialist.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditListComponent } from './admin/edit-list/edit-list.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StarRatingModule } from 'angular-star-rating';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSelectModule } from '@angular/material/select';
import { UserListComponent } from './admin/user-list/user-list.component';
import { RatingPipe } from './specialist-view/pipes/rating.pipe';
import { TouppercasePipe } from './specialist-view/pipes/touppercase.pipe';

@NgModule({
  declarations: [
    ShellComponent,
    HeaderComponent,
    SpecialistViewComponent,
    RatingPipe,
    FilterComponent,
    TouppercasePipe,
    SpecialistDetailsComponent,
    AdminDashboardComponent,
    AddSpecialistComponent,
    EditListComponent,
    UserListComponent,
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
            // resolve: {
            //   myResolver: ExcampleResolver,
            // },
          },
        ],
      },
    ]),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FontAwesomeModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbDialogModule.forRoot(),
    StarRatingModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbThemeModule,
    NbCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSelectModule,
    ScrollingModule,
  ],
  providers: [NbStatusService, NbDialogService],
})
export class ShellModule {}
