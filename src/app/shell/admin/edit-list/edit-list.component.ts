import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from 'app/shell/specialist-view/api.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class EditListComponent {
  public adminlist$ = this.apiService.searchAll$;

  constructor(private apiService: ApiService) {}

  public delete(id: number | undefined) {
    this.apiService.deleteSpecialist(id);
  }
}
