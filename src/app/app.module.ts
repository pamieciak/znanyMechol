import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbStatusService } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrModule } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StarRatingModule } from 'angular-star-rating';
import { MatSelectModule } from '@angular/material/select';
import { AppState } from './store/app.state';
import { authReducer } from './store/auth';
import { isAdminRecucer } from './store/admin-user/admin-user.reducer';
import { setUserListReducer } from './store/user-list/user-list.reducer';
import { setSpecialistsListReducer } from './store/specialist-list/specialist-list.reducer';
import { searchReducer } from './store/search/search.reducer';

import { appUserReducer } from './store/user/user.reducer';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot<AppState>(
      {
        auth: authReducer,
        isAdminLoggedIn: isAdminRecucer,
        users: setUserListReducer,
        specialists: setSpecialistsListReducer,
        search: searchReducer,
        appUser: appUserReducer,
      },
      {}
    ),
    HttpClientModule,
    BrowserAnimationsModule,
    NbEvaIconsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 4000, // 15 seconds
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-top-center',
    }),
    MatTooltipModule,
    StarRatingModule.forRoot(),
    MatSelectModule,
  ],
  providers: [NbStatusService],
  bootstrap: [AppComponent],
})
export class AppModule {}
