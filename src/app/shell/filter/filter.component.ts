import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@shared/services/api.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit {
  public inputValue$ = this.specialistApi.shareValue$;

  constructor(private specialistApi: ApiService, private route: ActivatedRoute, private router: Router) {}

  public ngOnInit() {
    if (this.route.snapshot.queryParams['q']) {
      this.specialistApi.getSpecialistList(this.route.snapshot.queryParams['q']);
      this.specialistApi.sendValue(this.route.snapshot.queryParams['q']);
    }
  }

  public showSpecByJob(value: string) {
    this.specialistApi.getSpecialistList(value);
    this.specialistApi.sendValue(value);
    this.specialistApi.queryService(value);
  }

  public clearFilter() {
    this.specialistApi.getSpecialistList();
    this.specialistApi.sendValue('');
    this.router.navigate(['home']);
  }
}
