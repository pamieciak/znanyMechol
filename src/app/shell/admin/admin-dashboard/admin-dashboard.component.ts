import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SpecialistsService } from '@shared/services/specialists.service';
import { AuthService } from 'app/auth/auth.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent {
  public openAddingForm = false;
  public openSpecialistList = false;
  public spinner = false;
  public openUserList = false;
  public user$ = this.auth.user$;

  constructor(
    private cdf: ChangeDetectorRef,
    private toastr: ToastrService,
    private auth: AuthService,
    private specialistService: SpecialistsService
  ) {}

  public showAddingForm() {
    if (this.openSpecialistList || this.openUserList) {
      this.openSpecialistList = false;
      this.openUserList = false;
    }
    this.openAddingForm = !this.openAddingForm;
  }

  public openEditList() {
    if (this.openAddingForm || this.openUserList) {
      this.openAddingForm = false;
      this.openUserList = false;
    }
    this.openSpecialistList = !this.openSpecialistList;
    this.specialistService.getSpecialistList();
  }

  public openUsers() {
    if (this.openSpecialistList || this.openAddingForm) {
      this.openSpecialistList = false;
      this.openAddingForm = false;
    }

    this.openUserList = !this.openUserList;
  }

  public close(isClosed: boolean) {
    this.openAddingForm = isClosed;
    this.spinner = true;

    setTimeout(() => {
      this.spinner = false;
      this.toastr.success('Specjalista dodany pomyślnie', 'Sukces!');
      this.cdf.markForCheck();
    }, 1000);
  }
}
