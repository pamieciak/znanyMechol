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
import { LoaderDialogComponent } from './shared/components/loader-dialog/loader-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrModule } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StarRatingModule } from 'angular-star-rating';
import { MatSelectModule } from '@angular/material/select';
import { AppState } from './store/app.state';
import { authReducer } from './store/auth';
import { isAdminRecucer } from './store/isAdmin/isAdmin.reducer';

@NgModule({
  declarations: [AppComponent, LoaderDialogComponent],
  entryComponents: [LoaderDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot<AppState>(
      {
        auth: authReducer,
        isAdmin: isAdminRecucer,
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
