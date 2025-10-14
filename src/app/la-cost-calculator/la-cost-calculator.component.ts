import {
  Component,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-la-cost-calculator',
  templateUrl: './la-cost-calculator.component.html',
  styleUrls: ['./la-cost-calculator.component.css'],
})
export class CostCalculatorComponent implements AfterViewInit, OnDestroy {
  constructor(private cdr: ChangeDetectorRef) {}

  showResults = false;

  selectedState: string = '';
  selectedCityCalc: string = '';
  area: number | null = 5000;
  unit: string = 'sqft';
  selectedCity: string = '';

  chart1: any = null;
  chart2: any = null;

  rates: any = {
    chennai: { basic: 2250, classic: 2470, premium: 2740, royale: 3010 },
    bangalore: { basic: 2350, classic: 2590, premium: 2860, royale: 3120 },
    hyderabad: { basic: 2200, classic: 2430, premium: 2700, royale: 2980 },
    coimbatore: { basic: 2100, classic: 2330, premium: 2600, royale: 2850 },
  };

  currentRates = this.rates['chennai'];

  costData = [
    {
      resource: 'Cement',
      quantity: '225 Bags',
      quality: 'Medium Grade',
      amount: 771750,
    },
    {
      resource: 'Steel',
      quantity: '17500 Kgs',
      quality: 'Medium Grade',
      amount: 805000,
    },
    {
      resource: 'Bricks',
      quantity: '95000 Pieces',
      quality: 'Medium Grade',
      amount: 665000,
    },
    {
      resource: 'Aggregate',
      quantity: '9500 Cubic Feet',
      quality: 'Medium Grade',
      amount: 315000,
    },
  ];

  ngOnInit() {
    this.currentRates = this.rates['chennai'];
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    if (this.chart1) {
      this.chart1.destroy();
      this.chart1 = null;
    }
    if (this.chart2) {
      this.chart2.destroy();
      this.chart2 = null;
    }
  }

  handleButtonClick() {
    if (this.showResults) {
      this.resetCalculator();
    } else {
      this.calculateCost();
    }
  }

  calculateCost() {
    if (!this.selectedState || !this.selectedCityCalc || !this.area) {
      alert('Please fill State, City and Area before proceeding.');
      return;
    }

    this.showResults = true;

    // Wait for Angular to render the canvas, then draw the charts
    setTimeout(() => {
      this.renderCharts();
    }, 200);
  }

  resetCalculator() {
    this.selectedState = '';
    this.selectedCityCalc = '';
    this.area = 5000;
    this.unit = 'sqft';
    this.showResults = false;

    if (this.chart1) {
      this.chart1.destroy();
      this.chart1 = null;
    }
    if (this.chart2) {
      this.chart2.destroy();
      this.chart2 = null;
    }
  }

  updateRates(event: any) {
    const newVal = event?.target ? event.target.value : this.selectedCity;
    this.selectedCity = newVal;

    if (this.rates[this.selectedCity]) {
      this.currentRates = this.rates[this.selectedCity];
    }
  }
  renderCharts() {
    const pieCanvas = document.getElementById(
      'costPieChart'
    ) as HTMLCanvasElement;
    const barCanvas = document.getElementById(
      'timelineChart'
    ) as HTMLCanvasElement;

    if (!pieCanvas || !barCanvas) {
      console.error('Canvas not ready');
      return;
    }

    this.chart1 = new Chart(pieCanvas, {
      type: 'pie',
      data: {
        labels: ['Design', 'Excavation', 'Foundation', 'Roof', 'Plastering'],
        datasets: [
          {
            data: [10, 15, 20, 25, 30],
            backgroundColor: [
              '#ffeb3b',
              '#fbc02d',
              '#ffc107',
              '#f57f17',
              '#ff9800',
            ],
          },
        ],
      },
    });

    this.chart2 = new Chart(barCanvas, {
      type: 'bar',
      data: {
        labels: ['Design', 'Excavation', 'Foundation', 'Roof', 'Finishing'],
        datasets: [
          {
            label: 'Cost (INR)',
            data: [200000, 350000, 450000, 300000, 250000],
            backgroundColor: [
              '#ffeb3b',
              '#fbc02d',
              '#ffc107',
              '#f57f17',
              '#ff9800',
            ],
          },
        ],
      },
      options: {
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }
}
