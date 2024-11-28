import { Component, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { ChartValues } from '../../models/chart.model';

@Component({
  selector: 'app-pie-chart',
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {

  @Input() data: ChartValues[] = [];

  @Input() label!: string;
  private svg: any;
  private margin = 50;
  private width = 250;
  private height = 250;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors!: any;


  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.renderer.removeChild(this.el.nativeElement.querySelector('#dynamic-container'), `div.${this.label}`)

      if(!this.el.nativeElement.querySelector(`div.${this.label}`)) {
        this.createSvg();
        this.createColors();
        this.drawChart();
      }
      
    }
  }

  constructor(private renderer: Renderer2, private el: ElementRef) {
    
  }

  private createSvg(): void {
    const newDiv = this.renderer.createElement('div');
    this.renderer.addClass(newDiv, this.label);
    const container = this.el.nativeElement.querySelector('#dynamic-container');
    this.renderer.appendChild(container, newDiv);
    this.svg = d3.select(`div.${this.label}`)
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
  }

  private createColors(): void {
    this.colors = d3.scaleOrdinal()
    .domain(this.data.map((d:ChartValues) => d.value.toString()))
    .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
  }

  private drawChart(): void {

    const pie = d3.pie<any>().value((d:ChartValues) => Number(d.value));
  

    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d: any, i: any) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");
  

    const labelLocation = d3.arc()
    .innerRadius(100)
    .outerRadius(this.radius);
  
    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('text')
    .text((d: any)=> d.data.name)
    .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", 15);
  } 
}
