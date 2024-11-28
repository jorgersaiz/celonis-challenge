import { Component, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { ChartValues } from '../../models/chart.model';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {

  @Input() data: ChartValues[] = [];
  @Input() label = ''
  private svg: any;
  private margin = 50;
  private width = 200 - (this.margin * 2);
  private height = 250 - (this.margin * 2);
  private maxRange!: number;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.renderer.removeChild(this.el.nativeElement.querySelector('#dynamic-container'), `div.${this.label}`)
      this.maxRange = this.data.reduce((max, current) => {
        return current.value > max.value ? current : max;
      }, this.data[0]).value;
      if(!this.el.nativeElement.querySelector(`div.${this.label}`)) {
        this.createSvg();
        this.drawBars(this.data);
      }
      
    }
  }

  private createSvg(): void {
    const newDiv = this.renderer.createElement('div');

    this.renderer.addClass(newDiv, this.label);
    const container = this.el.nativeElement.querySelector('#dynamic-container');
    this.renderer.appendChild(container, newDiv);
    this.svg = d3.select(`div.${this.label}`)
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: ChartValues[]): void {

    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.name))
    .padding(0.01);
  

    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");
  

    const y = d3.scaleLinear()
    .domain([0, this.maxRange])
    .range([this.height, 0])
  

    this.svg.append("g")
    .call(d3.axisLeft(y));
  
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: ChartValues) => x(d.name))
    .attr("y", (d: ChartValues) => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", (d: ChartValues) => this.height - y(d.value))
    .attr("fill", "#d04a35");
  }
  
}