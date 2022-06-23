import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { ApiService } from 'app/shell/specialist-view/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent implements OnInit {
  public openForm = false;
  public openList = false;
  public spinner = false;

  public user$ = this.auth.user$;

  constructor(
    private cdf: ChangeDetectorRef,
    private toastr: ToastrService,
    private apiService: ApiService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  public showAddingForm() {
    if (this.openList) {
      this.openList = false;
    }
    this.openForm = !this.openForm;
  }

  public openEditList() {
    if (this.openForm) {
      this.openForm = false;
    }
    this.openList = !this.openList;
    this.apiService.getSpecialistList();
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
