import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ApiService } from './api.service';
import { Specialist } from './specialist.intefrace';

@Component({
  selector: 'app-specialist-view',
  templateUrl: './specialist-view.component.html',
  styleUrls: ['./specialist-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialistViewComponent implements OnInit {
  public specialist$!: Observable<Specialist[]>;

  constructor(private specialistApi: ApiService, private route: ActivatedRoute, private router: Router) {}

  public ngOnInit() {
    console.log(this.route.snapshot.data['myResolver']);
    this.specialist$ = of(this.route.snapshot.data['myResolver']);
  }
}
