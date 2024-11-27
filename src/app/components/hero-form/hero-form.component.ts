import { Component, EventEmitter, Output } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Gender, Hero } from '../../models/hero.model';

@Component({
  selector: 'app-hero-form',
  imports: [MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss'
})
export class HeroFormComponent {

  @Output() submitHeroEvent = new EventEmitter <Hero>();
  public heroForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    gender: new FormControl<Gender>(Gender.M),
    citizenship: new FormControl<string>('', Validators.required),
    skills: new FormControl<string>('', Validators.required),
    occupation: new FormControl<string>('', Validators.required),
    memberOf: new FormControl<string>('', Validators.required),
    creator: new FormControl<string>('', Validators.required),
  })

  submitForm() {
    const hero: Hero = this.heroForm.value as Hero;

    this.submitHeroEvent.emit(hero)
  }
}
