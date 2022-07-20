import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SpecialistsService } from '@shared/services/specialists.service';

import { Specialist } from 'app/shell/specialist-view/specialist.intefrace';
import { AppState } from 'app/store/app.state';

import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, take, tap } from 'rxjs';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditListComponent {
  public isOpenModal = false;
  public isEditModalOpen = false;
  public name!: string;
  public surname!: string;
  public id!: number | undefined;
  public rating!: number;
  public deleting = false;
  public editing = false;

  public specArray = new ReplaySubject<Specialist>(1);

  public adminlist$ = this.store.select(state => state.specialists.specialists);

  public editForm = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern(/^[A-Z].*$/)]),
    last_name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern(/^[A-Z].*$/)]),
    specialization: new FormControl('', [Validators.required, Validators.minLength(4)]),
    address: new FormControl('', [Validators.required, Validators.minLength(4)]),
    rating: new FormControl(this.rating),
  });

  constructor(
    private toastr: ToastrService,
    public cdr: ChangeDetectorRef,
    private specialistService: SpecialistsService,
    private store: Store<AppState>
  ) {
    this.specialistService.getSpecialistList();
  }

  public get specialista$() {
    return this.specArray.asObservable();
  }

  public deleteSpecialist() {
    this.specialistService.deleteSpecialist(this.id);
    this.specialistService.getSpecialistList();
    this.isOpenModal = false;
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
    this.isOpenModal = !this.isOpenModal;
  }

  public closeModal() {
    if (this.isOpenModal) {
      this.isOpenModal = false;
    }
  }

  public openEditor(specialist: Specialist) {
    this.isEditModalOpen = !this.isEditModalOpen;
    this.editForm.controls['first_name'].setValue(specialist.first_name);
    this.editForm.controls['last_name'].setValue(specialist.last_name);
    this.editForm.controls['specialization'].setValue(specialist.specialization);
    this.editForm.controls['address'].setValue(specialist.address);
    this.id = specialist.id;
    this.rating = specialist.rating;

    this.specArray.next(specialist);
  }

  public editData() {
    const specialistData: Specialist = {
      first_name: this.editForm.controls['first_name'].value,
      last_name: this.editForm.controls['last_name'].value,
      specialization: this.editForm.controls['specialization'].value.toLowerCase(),
      address: this.editForm.controls['address'].value,
      email: '',
      rating: this.rating,
      id: this.id,
    };

    this.specialistService.editSpecialist(specialistData);
    this.specialistService.getSpecialistList();
    this.editing = true;

    setTimeout(() => {
      this.editing = false;
      this.cdr.markForCheck();
      if (this.isEditModalOpen) {
        this.isEditModalOpen = false;
      }
    }, 1000);

    this.specialista$
      .pipe(
        take(1),
        tap(res => {
          if (
            res.address === this.editForm.controls['address'].value &&
            res.first_name === this.editForm.controls['first_name'].value &&
            res.last_name === this.editForm.controls['last_name'].value &&
            res.specialization === this.editForm.controls['specialization'].value
          ) {
            setTimeout(() => {
              this.toastr.info(`Nie wprowadzono żadnych zmian`, 'Informacja!');
              this.cdr.markForCheck();
            }, 1000);
          } else {
            setTimeout(() => {
              this.toastr.success(`Dane ${res.first_name} ${res.last_name} edytowane`, 'Sukces!');
              this.cdr.markForCheck();
            }, 1000);
          }
        })
      )
      .subscribe();
  }

  public closeEdit() {
    if (this.isEditModalOpen) {
      this.isEditModalOpen = false;
    }
  }
}
