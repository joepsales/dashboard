import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {


  @Input() label: string | undefined;
  @Input() total: string | undefined;
  @Input() percentage: string | undefined;

  Highcharts = Highcharts;
  chartOptions = {};
  @Input() data: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
          type: 'areaspline',
          backgroundColor: null,
          borderWidth: 0,
          margin: [2, 2, 2, 2]
      },
      title: {
          text: 'Dummy Data'
      },
      legend: {
          enabled: false,
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
          labels: {
            enabled: false
          },
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
          }]
      },
      yAxis: {
          title: {
              text: null
          }
      },
      tooltip: {
          shared: true,
          valueSuffix: ' units',
          outside: true
      },
      credits: {
          enabled: false
      },
      exporting: {
        enabled: false
      },
      plotOptions: {
          areaspline: {
              fillOpacity: 0.5
          }
      },
      series: [{
          name: 'Joep',
          data: [2, 4, 3, 1]
      }, {
          name: 'John',
          data: [4, 3, 1, 2]
      }]
  };

  HC_exporting(Highcharts);
  
  setTimeout(() => {
    window.dispatchEvent(
      new Event('resize')
    );
  }, 300);
  }
}
