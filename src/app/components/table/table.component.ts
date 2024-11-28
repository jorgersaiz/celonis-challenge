import { Component, EventEmitter, inject, Input, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Hero } from '../../models/hero.model';
import { ChipComponent } from "../chip/chip.component";
import { MatDialog } from '@angular/material/dialog';
import { HeroCardComponent } from "../card/hero-card.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChartValues } from '../../models/chart.model';
import { BarChartComponent } from "../bar-chart/bar-chart.component";
import { PieChartComponent } from "../pie-chart/pie-chart.component";
import { KpiComponent } from "../kpi/kpi.component";
import { RadioFormComponent } from "../radio-form/radio-form.component";
import { CapitalizeFirstLetterPipe } from "../../pipes/capitalize-first-letter.pipe";


@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatSortModule, ChipComponent, HeroCardComponent, MatIconModule, MatButtonModule, BarChartComponent, PieChartComponent, KpiComponent, RadioFormComponent, CapitalizeFirstLetterPipe],
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
  isCreated = true;
  dataview = true;
  private selectedOptions: string[] = [];
  
  readonly dialog = inject(MatDialog);
  @ViewChild(MatSort) sort!: MatSort;
  

  @ViewChild('modal') templateRef!: TemplateRef<any>;
  

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.isCreated = false;
      
      this.dataSource.data = this.data || [];
      this.heroNames = [];
      this.data?.forEach(hero => this.heroNames.push(hero.name))
      this.filterList(this.selectedOptions)
      setTimeout(() => {
        this.isCreated = true
      }, 50);
    }
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  filterList(selectedOptions: string[]) {
    this.isCreated = false;
    this.selectedOptions = selectedOptions;
    if(selectedOptions.length > 0) {
      this.dataSource.data = this.data?.filter(hero => selectedOptions.includes(hero.name)) || [];
    } else {
      this.dataSource.data = this.data || [];
    }
    setTimeout(() => {
      this.isCreated = true
    }, 50);
    
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

  switchDataView(isKpi: boolean) {
    if(isKpi) this.dataview = true;
    else this.dataview = false;
  }

  formatToChart(heros: Hero[], key: string): ChartValues[] {
    const chartList: ChartValues[] = [] 
    heros.forEach(hero => {
      if(chartList.length > 0 && chartList.find(item => item.name === hero[key as keyof Hero] )) {
        chartList.forEach(item => {
          if(item.name === hero[key as keyof Hero]) {
            item.value++
          } 
        })
      } else {
        const newItem: ChartValues = {
          name: hero[key as keyof Hero],
          value: 1
        }
        chartList.push(newItem)
      }
    })
    return chartList;
  }
}
