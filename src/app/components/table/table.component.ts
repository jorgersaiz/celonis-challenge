import { Component, EventEmitter, inject, Input, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Hero } from '../../models/hero.model';
import { ChipComponent } from "../chip/chip.component";
import { MatDialog } from '@angular/material/dialog';
import { HeroCardComponent } from "../card/hero-card.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatSortModule, ChipComponent, HeroCardComponent, MatIconModule, MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  @Input() displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  @Input() data!: Hero[] | null;
  @Output() deleteHeroEvent = new EventEmitter <string>();
  @Output() editHeroEvent = new EventEmitter <Hero>();
  dataSource = new MatTableDataSource(this.data || []);
  heroNames: string[] = [];
  selectedHero!: Hero;
  
  readonly dialog = inject(MatDialog);
  @ViewChild(MatSort) sort!: MatSort;
  

  @ViewChild('modal') templateRef!: TemplateRef<any>;
  

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.dataSource.data = this.data || [];
      this.heroNames = [];
      this.data?.forEach(hero => this.heroNames.push(hero.name))
    }
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  filterList(selectedOptions: string[]) {
    if(selectedOptions.length > 0) {
      this.dataSource.data = this.data?.filter(hero => selectedOptions.includes(hero.name)) || [];
    } else {
      this.dataSource.data = this.data || [];
    }
  }

  openDialog(hero: Hero) {
    this.dialog.open(this.templateRef);
    this.selectedHero = hero;
  }

  deleteHero(name:string, event: MouseEvent) {
    event.stopPropagation();
    this.deleteHeroEvent.emit(name)
  }

  editHero(hero:Hero, event: MouseEvent) {
    event.stopPropagation();
    this.editHeroEvent.emit(hero)
  }
}
