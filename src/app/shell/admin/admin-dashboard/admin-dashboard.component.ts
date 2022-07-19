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
  public openForm = false;
  public openList = false;
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
    if (this.openList || this.openUserList) {
      this.openList = false;
      this.openUserList = false;
    }
    this.openForm = !this.openForm;
  }

  public openEditList() {
    if (this.openForm || this.openUserList) {
      this.openForm = false;
      this.openUserList = false;
    }
    this.openList = !this.openList;
    this.specialistService.getSpecialistList();
  }

  public openUsers() {
    if (this.openList || this.openForm) {
      this.openList = false;
      this.openForm = false;
    }

    this.openUserList = !this.openUserList;
  }

  public close(isClosed: boolean) {
    this.openForm = isClosed;
    this.spinner = true;

    setTimeout(() => {
      this.spinner = false;
      this.toastr.success('Specjalista dodany pomyślnie', 'Sukces!');
      this.cdf.markForCheck();
    }, 1000);
  }
}
