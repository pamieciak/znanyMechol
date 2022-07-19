import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunicateService } from '@shared/services/communicate.service';
import { SpecialistsService } from '@shared/services/specialists.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit {
  public inputValue$ = this.communicateService.shareValue$;

  constructor(
    private specialistService: SpecialistsService,
    private communicateService: CommunicateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit() {
    if (this.route.snapshot.queryParams['q']) {
      this.specialistService.getSpecialistList(this.route.snapshot.queryParams['q']);
      this.communicateService.sendValue(this.route.snapshot.queryParams['q']);
    }
  }

  public showSpecByJob(value: string) {
    this.specialistService.getSpecialistList(value);
    this.communicateService.sendValue(value);
    this.communicateService.queryService(value);
  }

  public clearFilter() {
    this.specialistService.getSpecialistList();
    this.communicateService.sendValue('');
    this.router.navigate(['home']);
  }
}
