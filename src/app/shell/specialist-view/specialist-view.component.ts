import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from './api.service';

@Component({
  selector: 'app-specialist-view',
  templateUrl: './specialist-view.component.html',
  styleUrls: ['./specialist-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialistViewComponent implements OnInit {
  public specialist$ = this.specialistApi.searchAll$;

  constructor(private specialistApi: ApiService, private route: ActivatedRoute, private router: Router) {}

  public ngOnInit() {
    return;
  }

  // public showData(name: string, lastName: string) {
  //   this.router.navigate([`details/${name}-${lastName}`], {});
  //   this.specialistApi.sendValue(`${name}`);
  // }
}
