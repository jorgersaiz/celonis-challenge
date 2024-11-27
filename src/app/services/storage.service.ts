import { Injectable } from '@angular/core';
import { of } from 'rxjs';
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
  }

  updateHero(modifiedHero: Hero) {
    const heros = this.getDataBase();

    const modifiedHeroList = heros.map(hero => {
      
      if(hero.name === modifiedHero.name) return modifiedHero;
      else return hero
    })
    this.saveDataBase(modifiedHeroList);
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
