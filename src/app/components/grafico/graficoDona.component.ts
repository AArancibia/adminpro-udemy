import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: '<app-grafico-dona>',
  templateUrl: './graficoDona.component.html'
})

export class GraficoDonaComponent implements OnInit{

  @Input('ChartLabels') doughnutChartLabels: string[] = [];
  @Input('ChartData') doughnutChartData: number[] = [];
  @Input('ChartType') doughnutChartType: string = '';

  constructor() {

  }

  ngOnInit() {
  }
}
