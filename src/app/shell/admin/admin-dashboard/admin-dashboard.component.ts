import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent implements OnInit {
  public openForm = false;
  public openList = true;
  public spinner = false;

  constructor(private cdf: ChangeDetectorRef, private toastr: ToastrService) {}

  ngOnInit(): void {}

  public showAddingForm() {
    this.openForm = !this.openForm;
    console.log(this.openForm);
  }

  public openEditList() {
    this.openList = !this.openList;
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
