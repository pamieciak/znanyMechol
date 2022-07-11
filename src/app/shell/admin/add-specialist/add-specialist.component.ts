import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClickEvent } from 'angular-star-rating';
import { ApiService } from 'app/shell/specialist-view/api.service';
import { Specialist } from 'app/shell/specialist-view/specialist.intefrace';

@Component({
  selector: 'app-add-specialist',
  templateUrl: './add-specialist.component.html',
  styleUrls: ['./add-specialist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSpecialistComponent implements OnInit {
  @Output() public closeForm = new EventEmitter<boolean>();

  public onClickResult!: ClickEvent;
  public stars!: number;

  public form = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern(/^[A-Z].*$/)]),
    last_name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern(/^[A-Z].*$/)]),
    selectedValue: new FormControl('', [Validators.required, Validators.minLength(4)]),
    address: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  public specialization = [
    { value: 'elektryk', viewValue: 'Elektryk' },
    { value: 'blacharz', viewValue: 'Blacharz' },
    { value: 'mechanik', viewValue: 'Mechanik' },
    { value: 'zawieszenie', viewValue: 'Zawieszenie' },
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  public addSpecialist() {
    const specialistData: Specialist = {
      first_name: this.form.controls['first_name'].value,
      last_name: this.form.controls['last_name'].value,
      specialization: this.form.controls['selectedValue'].value.toLowerCase(),
      address: this.form.controls['address'].value,
      email: '',
      rating: this.stars,
      id: 0,
    };

    console.log(this.form.value);
    this.closeForm.emit(false);

    this.apiService.postSpecialist(specialistData);
  }

  public onClick = ($event: ClickEvent) => {
    this.stars = $event.rating;
    this.onClickResult = $event;
  };
}
