import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent implements OnInit {
  public openForm = false;

  constructor() {}

  ngOnInit(): void {}

  public showAddingForm() {
    this.openForm = !this.openForm;
    console.log(this.openForm);
  }

  public close(isClosed: boolean) {
    this.openForm = isClosed;
  }
}
