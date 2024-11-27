import { Injectable } from '@angular/core';
import { filter, of } from 'rxjs';
import { Hero } from '../models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getAllHeros() {
    return of(this.getDataBase());
  }

  createHero(newHero: Hero) {
    const heros = this.getDataBase();
    heros.unshift(newHero);
    this.saveDataBase(heros);
    return this.getAllHeros();
  }

  updateHero(modifiedHero: Hero) {
    const heros = this.getDataBase();
    heros.forEach(hero => {
      if(hero.name === modifiedHero.name) {
        hero = modifiedHero;
      }
    })
    this.saveDataBase(heros);
    return this.getAllHeros();
  }

  deleteHero(name: string) {
    const heros = this.getDataBase();

    const filteredHeroList = heros.filter(hero => hero.name !== name);
    this.saveDataBase(filteredHeroList)

    return this.getAllHeros();
  }

  checkDataBase(): boolean {
    return !!localStorage.getItem('data')
  }

  saveDataBase(heros: Hero[]) {
    localStorage.setItem('data', JSON.stringify(heros));
  }

  private getDataBase() {
    return JSON.parse(localStorage.getItem('data') as string) as Hero[];
  }

  
}
