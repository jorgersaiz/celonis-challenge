import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartValues } from '../../models/chart.model';
import { Kpi } from '../../models/kpi.model';
import { CapitalizeFirstLetterPipe } from "../../pipes/capitalize-first-letter.pipe";

@Component({
  selector: 'app-kpi',
  imports: [CapitalizeFirstLetterPipe],
  templateUrl: './kpi.component.html',
  styleUrl: './kpi.component.scss'
})
export class KpiComponent {
  @Input() data: ChartValues[] = []
  kpiValues: Kpi[] = []
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.kpiValues = this.formatData(this.data)
    }
  }

  formatData(data: ChartValues[]): Kpi[] {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    let formattedData = data.map(item => ({
      name: item.name,
      percentage: ((item.value / total) * 100)
    }));
  
    let others = formattedData.filter(item => item.percentage < 15);
    let othersTotal = others.reduce((sum, item) => sum + item.percentage, 0);
    
    formattedData = formattedData.filter(item => item.percentage >= 15);
    
    if (others.length > 0) {
      formattedData.push({
        name: "Other",
        percentage: othersTotal
      });
    }
  
    return formattedData;
  }
}
