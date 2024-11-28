import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';

@Component({
  selector: 'app-radio-form',
  imports: [MatRadioButton, MatRadioGroup, ReactiveFormsModule],
  templateUrl: './radio-form.component.html',
  styleUrl: './radio-form.component.scss'
})
export class RadioFormComponent {
  radioForm = new FormGroup({
    isKpi: new FormControl<boolean>(true, Validators.required)
  })

  @Output() switchDataViewEvent = new EventEmitter <boolean>();

  ngOnInit() {
    this.radioForm.valueChanges.subscribe(formData => this.switchDataViewEvent.emit(!!formData.isKpi))
  }

}
