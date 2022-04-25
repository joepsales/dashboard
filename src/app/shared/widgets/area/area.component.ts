import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  constructor() { }

  chartOptions = {};
  @Input() data: any[] = [];

  Highcharts = Highcharts;
  

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
          type: 'areaspline'
      },
      title: {
          text: 'Dummy Data'
      },
      legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'top',
          x: 150,
          y: 100,
          floating: true,
          borderWidth: 1,
          backgroundColor:
              '#FFFFFF'
      },
      xAxis: {
          categories: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday'
          ],
          plotBands: [{ // visualize the weekend
              from: 4.5,
              to: 6.5,
              color: 'rgba(68, 170, 213, .2)'
          }],
          labels: {
            enabled: false
          },
          title: {
            text: null
          },
          startOnTick: false,
          endOnTick: false,
          tickOptions: []
      },
      yAxis: {
          title: {
              text: 'Y-axis'
          }
      },
      tooltip: {
          shared: true,
          valueSuffix: ' units'
      },
      credits: {
          enabled: false
      },
      plotOptions: {
          areaspline: {
              fillOpacity: 0.5
          }
      },
      exporting: {
        enabled: false
      },
      series: [{
          name: 'Joep',
          data: [3, 4, 3, 5, 4, 10, 12]
      }, {
          name: 'John',
          data: [1, 3, 4, 3, 3, 5, 4]
      }]
  };

  HC_exporting(Highcharts);
  
  setTimeout(() => {
    window.dispatchEvent(
      new Event('resize')
    );
  }, 300)
  }

}
