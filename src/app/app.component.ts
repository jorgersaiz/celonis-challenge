import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { Hero } from './models/hero.model';
import { TableComponent } from "./components/table/table.component";
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { StorageService } from './services/storage.service';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { HeroFormComponent } from "./components/hero-form/hero-form.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TableComponent, AsyncPipe, MatButtonModule, MatIconModule, HeroFormComponent],
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
    'action'
  ]
  data$!: Observable<Hero[]>;
  selectedHeroName = '';
  selectedHero!: Hero | undefined;
  @ViewChild('modalForm') modalForm!: TemplateRef<any>;
  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;
  readonly dialog = inject(MatDialog);
  constructor(private apiService: ApiService, private storageService: StorageService) {}

  ngOnInit() {
    this.getAllHeros()
  }

  openDialog(modal: TemplateRef<any>, resetHero = false) {
    if(resetHero) this.selectedHero = undefined;
    this.dialog.open(modal);
  }

  createHero(hero: Hero) {
    this.storageService.createHero(hero);
    this.getAllHeros();
    this.closeDialog();
  }

  editHeroForm(hero: Hero) {
    this.selectedHero = hero;
    this.openDialog(this.modalForm)
  }

  editHero(hero: Hero) {
    this.dialog.closeAll();
    this.storageService.updateHero(hero);
    this.getAllHeros();
  }

  deleteHeroConfirmation(name: string) {
    this.selectedHeroName = name;
    this.openDialog(this.deleteModal)
  }

  deleteHero() {
    this.storageService.deleteHero(this.selectedHeroName);
    this.closeDialog()
    this.getAllHeros();
  }

  closeDialog() {
    this.dialog.closeAll()
  }

  private getAllHeros() {
    if(this.storageService.checkDataBase()) {
      this.data$ = this.storageService.getAllHeros()
    } else {
      this.data$ = this.apiService.getAll()
      this.data$.subscribe(data => this.storageService.saveDataBase(data))
    }
  }
}
