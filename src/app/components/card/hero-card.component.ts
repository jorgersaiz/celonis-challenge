import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card'; 
import { Hero } from '../../models/hero.model';
@Component({
  selector: 'app-hero-card',
  imports: [MatCardModule],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss'
})
export class HeroCardComponent {
  @Input() hero!: Hero;
  title = '';
  texts: string[] = [];

  ngOnInit() {

    this.title = this.hero?.name;
    Object?.keys(this.hero).forEach(key => {
      this.texts.push(`${this.capitalizeFirstLetter(key)}: ${this.capitalizeFirstLetter(this.hero[key as keyof Hero])}`)
    })
  }

  capitalizeFirstLetter(word: string) {
    if (!word) return ''; 
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
