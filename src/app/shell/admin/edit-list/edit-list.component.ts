import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ApiService } from 'app/shell/specialist-view/api.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditListComponent {
  public openM = false;
  public name!: string;
  public surname!: string;
  public id!: number | undefined;
  public deleting = false;

  public adminlist$ = this.apiService.searchAll$;

  constructor(private apiService: ApiService, private toastr: ToastrService, public cdr: ChangeDetectorRef) {}

  public delete() {
    this.apiService.deleteSpecialist(this.id);
    this.apiService.getSpecialistList();
    this.openM = false;
    this.deleting = true;

    setTimeout(() => {
      this.toastr.success(`Specjalista ${this.name} ${this.surname} usunięty`, 'Sukces!');
      this.deleting = false;
      this.cdr.markForCheck();
    }, 1000);
  }

  public openModal(name: string, surname: string, id: number | undefined) {
    this.name = name;
    this.surname = surname;
    this.id = id;
    this.openM = !this.openM;
  }

  public closeModal() {
    if (this.openM) {
      this.openM = false;
    }
  }
}
