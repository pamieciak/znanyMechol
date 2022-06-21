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
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AddSpecialistComponent } from './admin/add-specialist/add-specialist.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

// import { Observable, tap, delay } from 'rxjs';
// import { Specialist } from './specialist-view/specialist.intefrace';
// import { ApiService } from './specialist-view/api.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class ExcampleResolver implements Resolve<Observable<Specialist[]>> {
//   constructor(private apiService: ApiService) {}
//   public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Specialist[]> {
//     return this.apiService.searchAll$.pipe(delay(2000), tap(console.log));
//   }
// }

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
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  providers: [NbStatusService],
})
export class ShellModule {}
