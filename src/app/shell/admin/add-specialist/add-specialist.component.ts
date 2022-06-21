import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ApiService } from 'app/shell/specialist-view/api.service';
import { Specialist } from 'app/shell/specialist-view/specialist.intefrace';
import { TouppercasePipe } from 'app/shell/specialist-view/touppercase.pipe';

@Component({
  selector: 'app-add-specialist',
  templateUrl: './add-specialist.component.html',
  styleUrls: ['./add-specialist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSpecialistComponent implements OnInit {
  @Output() public closeForm = new EventEmitter<boolean>();

  public form = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern(/^[A-Z].*$/)]),
    last_name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern(/^[A-Z].*$/)]),
    specialization: new FormControl('', [Validators.required, Validators.minLength(4)]),
    address: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  public addSpecialist() {
    const specialistData: Specialist = {
      first_name: this.form.controls['first_name'].value,
      last_name: this.form.controls['last_name'].value,
      specialization: this.form.controls['specialization'].value,
      address: this.form.controls['address'].value,
      email: '',
      rating: 0,
      id: 0,
    };

    this.closeForm.emit(false);

    this.apiService.postSpecialist(specialistData);
  }
}
