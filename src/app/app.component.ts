import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { Hero } from './models/hero.model';
import { TableComponent } from "./components/table/table.component";
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TableComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'celonis-challenge';
  columns: string[] = [
    'name',
    'gender',
    'citizenship',
    'skills',
    'occupation',
    'memberOf',
    'creator',
  ]
  data$!: Observable<Hero[]>;

  constructor(private apiService: ApiService, private storageService: StorageService) {

  }

  ngOnInit() {
    if(this.storageService.checkDataBase()) {
      this.data$ = this.storageService.getAllHeros()
    } else {
      this.data$ = this.apiService.getAll()
      this.data$.subscribe(data => this.storageService.saveDataBase(data))
    }
  }
}
