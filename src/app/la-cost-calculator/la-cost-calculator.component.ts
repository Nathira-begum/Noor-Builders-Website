import { Component } from '@angular/core';

@Component({
  selector: 'app-la-cost-calculator',
  templateUrl: './la-cost-calculator.component.html',
  styleUrls: ['./la-cost-calculator.component.css']
})
export class LaCostCalculatorComponent {
  loanAmount: number = 500000;   // Default loan amount
  interestRate: number = 10;     // Default interest rate
  tenure: number = 12;           // Default tenure (months)

  emi: number = 0;
  totalInterest: number = 0;
  totalPayment: number = 0;

  calculateEMI() {
    const P = this.loanAmount;
    const R = this.interestRate / 12 / 100; // monthly interest
    const N = this.tenure;

    if (R === 0) {
      this.emi = P / N;
    } else {
      this.emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    }

    this.totalPayment = this.emi * N;
    this.totalInterest = this.totalPayment - P;
  }
}
