import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { Gender, Hero } from '../models/hero.model';

const herosMock: Hero[] = [
  {
    name: "Vanisher",
    gender: Gender.M,
    citizenship: "United States of America",
    skills: "teleportation in fiction",
    occupation: "criminal",
    memberOf: "X-Force",
    creator: "Stan Lee"
  },
  {
    name: "Wolverine",
    gender: Gender.M,
    citizenship: "Canada",
    skills: "healing factor",
    occupation: "sailor",
    memberOf: "Canadian Army",
    creator: "Len Wein"
  }
]
describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
    localStorage.clear();
  });

  describe('checkDataBase', () => {
    it('should return false if there is no data on localStorage', () => {
      expect(service.checkDataBase()).toBe(false);
    });

    it('should return true if there is data on localStorage', () => {
      localStorage.setItem('data', JSON.stringify(herosMock));
      expect(service.checkDataBase()).toBe(true);
    });
  });

  describe('saveDataBase', () => {
    it('should save all the heros on localStorage', () => {
      const heros: Hero[] = herosMock;
      service.saveDataBase(heros);

      const savedData = JSON.parse(localStorage.getItem('data') as string);
      expect(savedData).toEqual(heros);
    });
  });

  describe('getAllHeros', () => {
    it('should return all heros', (done) => {
      const heros: Hero[] = herosMock;
      localStorage.setItem('data', JSON.stringify(heros));

      service.getAllHeros().subscribe((result) => {
        expect(result).toEqual(heros);
        done();
      });
    });
  });

  describe('createHero', () => {
    it('should add a new hero to the database', () => {
      const initialHeros: Hero[] = herosMock;
      const newHero: Hero = herosMock[1];

      localStorage.setItem('data', JSON.stringify(initialHeros));

      service.createHero(newHero);

      const savedData = JSON.parse(localStorage.getItem('data') as string);
      expect(savedData).toEqual([newHero, ...initialHeros]);
    });
  });

  describe('updateHero', () => {
    it('should modify the hero', () => {
      const heros: Hero[] = [herosMock[0]];
      const updatedHero: Hero = {
        name: "Vanisher",
        gender: Gender.M,
        citizenship: "United States of America",
        skills: "teleportation in fiction",
        occupation: "criminal",
        memberOf: "X-Force",
        creator: "Brad Pitt"
      };

      localStorage.setItem('data', JSON.stringify(heros));

      service.updateHero(updatedHero);

      const savedData = JSON.parse(localStorage.getItem('data') as string);
      expect(savedData).toEqual([
        updatedHero,
      ]);
    });

    it('shouldn`t modify the here if it does not exist', () => {
      const heros: Hero[] = [herosMock[0]];
      const updatedHero: Hero = herosMock[1];

      localStorage.setItem('data', JSON.stringify(heros));

      service.updateHero(updatedHero);

      const savedData = JSON.parse(localStorage.getItem('data') as string);
      expect(savedData).toEqual(heros);
    });
  });

  describe('deleteHero', () => {
    it('should delete a hero if name matches', () => {
      const heros: Hero[] = herosMock;
      localStorage.setItem('data', JSON.stringify(heros));
  
      service.deleteHero('Vanisher');
  
      const savedData = JSON.parse(localStorage.getItem('data') as string);
      expect(savedData).toEqual([herosMock[1]]);
    });
  
    it('shouldn`t delete any heros if the name doesn`t exist', () => {
      const heros: Hero[] = herosMock;
      localStorage.setItem('data', JSON.stringify(heros));

      service.deleteHero('Fake Name');
      const savedData = JSON.parse(localStorage.getItem('data') as string);
      expect(savedData).toEqual(heros);
    });
  });
});
