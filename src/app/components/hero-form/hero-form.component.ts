import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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

  @Input() selectedHero!: Hero | undefined;
  @Output() submitHeroEvent = new EventEmitter <Hero>();
  @Output() editHeroEvent = new EventEmitter <Hero>();
  public heroForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    gender: new FormControl<Gender>(Gender.M),
    citizenship: new FormControl<string>('', Validators.required),
    skills: new FormControl<string>('', Validators.required),
    occupation: new FormControl<string>('', Validators.required),
    memberOf: new FormControl<string>('', Validators.required),
    creator: new FormControl<string>('', Validators.required),
  })

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedHero'] && !!this.selectedHero) {
      this.heroForm.setValue(this.selectedHero as Hero);
      this.heroForm.controls.name.disable();
    }
  }

  submitForm() {
    const hero: Hero = this.heroForm.getRawValue() as Hero;
    if(!!this.selectedHero) {
      this.editHeroEvent.emit(hero)
    } else {
      this.submitHeroEvent.emit(hero)
    }
  }
}
