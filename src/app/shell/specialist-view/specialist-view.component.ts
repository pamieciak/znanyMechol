import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from './api.service';

@Component({
  selector: 'app-specialist-view',
  templateUrl: './specialist-view.component.html',
  styleUrls: ['./specialist-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialistViewComponent implements OnInit {
  public specialist$ = this.specialistApi.searchAll$;

  constructor(private specialistApi: ApiService, private route: ActivatedRoute) {}

  public ngOnInit() {
    // console.log(this.route.snapshot);
    return;
  }
}
