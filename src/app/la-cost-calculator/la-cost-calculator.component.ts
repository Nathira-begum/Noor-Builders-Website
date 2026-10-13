import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

interface PackageFeature {
  name: string;
  price: number;
  className: string;
  icon: string;
  popular: boolean;
  features: string[];
}

@Component({
  selector: 'app-la-cost-calculator',
  templateUrl: './la-cost-calculator.component.html',
  styleUrls: ['./la-cost-calculator.component.css'],
})
export class LaCostCalculatorComponent implements OnInit {
  //=====================================================
  // CUSTOMER DETAILS
  //=====================================================

  fullName: string = '';
  phoneNumber: string = '';
  email: string = '';
  address: string = '';

  //=====================================================
  // PROJECT DETAILS
  //=====================================================

  constructionArea: number | null = null;

  selectedPackage: number | null= null;

  constructionType: string = '';

  floors: string = '';

  //=====================================================
  // LOCATION DETAILS
  //=====================================================
  siteLocation: string = '';

  approvalAuthority: string = '';


  //=====================================================
  // UTILITIES
  //=====================================================
  plotArea: number = 0;
  sumpLitres: number = 0;

  wasteWaterTank: number = 0;

  compoundWall: number = 0;

  solarPower: number = 0;

  //=====================================================
  // BOREWELL
  //=====================================================

  boreDepth: number = 0;

  boreCost: number = 0;

  //=====================================================
  // ELECTRICITY
  //=====================================================

  ebConnection: string = '';
  ebCost: number = 0;

  expectedEbBill: number = 0;

  //=====================================================
  // TOTAL
  //=====================================================

  totalCost: number = 0;

  submitted: boolean = false;
  showEstimate: boolean = false;
  ebSinglePhaseCost: number = 25000;
  ebThreePhaseCost: number = 65000;
  estimatedCost: number = 0;
  //=====================================================
  // EXPAND / COLLAPSE
  //=====================================================

  expandedState: boolean[][] = [];

  //=====================================================
  // PRICING PACKAGES
  //=====================================================

  packages: PackageFeature[] = [
    {
      name: 'Standard',
      price: 2350,
      className: 'standard',
      icon: 'fa-solid fa-house',
      popular: false,
      features: [
        'Standard Quality Materials',
        '2D Floor Plan',
        'Basic Elevation',
        'Standard Electrical',
        'Standard Plumbing',
        'Vitrified Tiles',
        'Standard Paint',
        'Site Supervision',
      ],
    },

    {
      name: 'Premium',
      price: 2550,
      className: 'premium',
      icon: 'fa-solid fa-gem',
      popular: true,
      features: [
        'Premium Quality Materials',
        '3D Elevation',
        'Premium Tiles',
        'Premium Electrical',
        'Premium Plumbing',
        'UPVC Windows',
        'False Ceiling',
        'Structural Warranty',
      ],
    },

    {
      name: 'Luxury',
      price: 2800,
      className: 'luxury',
      icon: 'fa-solid fa-crown',
      popular: false,
      features: [
        'Luxury Materials',
        '3D Walkthrough',
        'Granite Flooring',
        'Luxury Paint',
        'Premium Doors',
        'Designer Ceiling',
        'Smart Home Ready',
        'Premium Finishes',
      ],
    },

    {
      name: 'Elite',
      price: 3000,
      className: 'elite',
      icon: 'fa-solid fa-award',
      popular: false,
      features: [
        'Ultra Luxury Materials',
        '3D Walkthrough',
        'Italian Marble',
        'Luxury Interiors',
        'Imported Fittings',
        'Dedicated Site Engineer',
        '5 Years Support',
        'Premium Warranty',
      ],
    },
  ];

  //=====================================================
  // INITIALIZE
  //=====================================================

  ngOnInit(): void {
    this.expandedState = this.packages.map((pkg) =>
      pkg.features.map(() => false),
    );
      console.log('Packages:', this.packages);

  }

  //=====================================================
  // SELECT PACKAGE
  //=====================================================

  selectPackage(price: number): void {
    this.selectedPackage = price;
  }
  //=====================================================
  // TOGGLE FEATURE
  //=====================================================

  toggleFeature(cardIndex: number, featureIndex: number): void {
    this.expandedState[cardIndex][featureIndex] =
      !this.expandedState[cardIndex][featureIndex];
  }

calculateEstimate(form: NgForm): void {

  // Show validation messages
  this.submitted = true;

  console.log('Calculate button clicked');
  console.log('Form valid:', form.valid);

  // Mark every field as touched
  Object.keys(form.controls).forEach((field) => {
    form.controls[field].markAsTouched();
  });

  // ==========================================
  // CHECK REQUIRED FIELDS
  // ==========================================

  if (
    form.invalid ||
    !this.fullName.trim() ||
    !this.phoneNumber.trim() ||
    !this.email.trim() ||
    !this.address.trim() ||
    !this.siteLocation.trim() ||
    !this.approvalAuthority ||
    !this.constructionType ||
    !this.floors ||
    !this.ebConnection ||
    Number(this.plotArea) < 100 ||
    !this.selectedPackage ||
    Number(this.wasteWaterTank) <= 0
  ) {

    // DO NOT CALCULATE
    this.totalCost = 0;
    this.estimatedCost = 0;
    this.ebCost = 0;
    this.boreCost = 0;

    console.log('Validation failed - calculation stopped');

    return;
  }

  // ==========================================
  // CALCULATION STARTS ONLY AFTER VALIDATION
  // ==========================================

  let total = 0;

  // Construction Cost
  const constructionCost =
    Number(this.plotArea) * Number(this.selectedPackage);

  total += constructionCost;

  // Borewell
  this.boreCost = this.getBorewellCost();
  total += this.boreCost;

  // Sump
  total += Number(this.sumpLitres) * 25;

  // Waste Water Tank
  total += Number(this.wasteWaterTank) * 30000;

  // Compound Wall
  total += Number(this.compoundWall) * 2000;

  // Solar
  total += Number(this.solarPower) * 75000;

  // Approval
  // total += this.getApprovalCharge();

  // EB
  this.ebCost = this.getEbConnectionCost();
  total += this.ebCost;

  // ==========================================
  // FINAL RESULT
  // ==========================================

  this.totalCost = total;
  this.estimatedCost = total;

  console.log('Construction Cost:', constructionCost);
  console.log('Borewell Cost:', this.boreCost);
  // console.log('Approval Cost:', this.getApprovalCharge());
  console.log('EB Cost:', this.ebCost);
  console.log('TOTAL:', this.totalCost);
}
  //=====================================================
  // GET TOTAL COST
  //=====================================================

  getTotalCost(): number {
    return this.totalCost;
  }

  //=====================================================
  // SUBMIT
  //=====================================================
submitCalculator(): void {
  if (!this.showEstimate) {
    return;
  }

  alert(
    'Estimated Construction Cost : ₹' +
      this.totalCost.toLocaleString('en-IN')
  );
}
  resetCalculator(): void {
    console.log('Reset clicked');

    this.fullName = '';
    this.phoneNumber = '';
    this.email = '';
    this.address = '';

    this.constructionArea = null;
    this.selectedPackage = null;
    this.constructionType = '';
    this.floors = '';

    // this.clientArea = '';
    this.siteLocation = '';
    // this.approvalAuthority = '';

    this.sumpLitres = 0;
    this.wasteWaterTank = 0;
    this.compoundWall = 0;
    this.solarPower = 0;

    this.boreDepth = 0;
    this.boreCost = 0;

    this.ebConnection = 'Single Phase';
    this.ebCost = 0;
    this.expectedEbBill = 0;

    this.totalCost = 0;
    this.estimatedCost = 0;
    this.submitted = false;

    // reset package selection
    this.selectedPackage = 0;

    console.log('Calculator Reset Completed');
  }

  //=====================================================
  // PACKAGE NAME
  //=====================================================

  getSelectedPackageName(): string {
    const pkg = this.packages.find((x) => x.price === this.selectedPackage);

    return pkg ? pkg.name : '';
  }

  //=====================================================
  // APPROVAL CHARGE
  //=====================================================



  //=====================================================
  // EB COST
  //=====================================================

  getEbConnectionCost(): number {
    if (this.ebConnection === 'Single Phase') {
      return 25000;
    }

    return 65000;
  }

  //=====================================================
  // BOREWELL COST
  //=====================================================

  getBorewellCost(): number {
    if (this.boreDepth === 400) {
      return 105000;
    }

    if (this.boreDepth === 600) {
      return 160000;
    }

    if (this.boreDepth === 800) {
      return 200000;
    }

    return 0;
  }

  //=====================================================
  // PRINT ESTIMATE
  //=====================================================

  printEstimate(): void {
    window.print();
  }

  //=====================================================
  // DOWNLOAD PDF
  //=====================================================

  downloadEstimate(): void {
    alert('PDF Download feature can be added later.');
  }
}
