import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, Hero } from '../models/hero.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = '/assets/wikipedia_marvel_data.json';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Hero[]> {
    return this.http.get<ApiResponse[]>(this.url).pipe(
      map(res => res.map( hero => {
          return {
            name: hero.nameLabel,
            gender: hero.genderLabel,
            citizenship: hero.citizenshipLabel,
            skills: hero.skillsLabel,
            occupation: hero.occupationLabel,
            memberOf: hero.memberOfLabel,
            creator: hero.creatorLabel
          }
        })
      )
    );
  }


}
