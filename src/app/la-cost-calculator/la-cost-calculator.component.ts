
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

interface PackageFeature {
  name: string;
  price: number;
  className: string;
  icon: string;
  popular: boolean;
  features: string[];
}

interface EstimateResponse {
  message: string;
  estimateId: string;
  totalCost: number;
}

@Component({
  selector: 'app-la-cost-calculator',
  templateUrl: './la-cost-calculator.component.html',
  styleUrls: ['./la-cost-calculator.component.css'],
})
export class LaCostCalculatorComponent implements OnInit {

  private apiUrl = 'http://localhost:5000/api/estimates';

  saving = false;
  saveError = '';
  savedEstimateId = '';

  // CUSTOMER DETAILS
  fullName = '';
  phoneNumber = '';
  email = '';
  address = '';

  // PROJECT DETAILS
  constructionArea: number | null = null;
  selectedPackage: number | null = 0;
  constructionType = '';
  floors = '';

  // LOCATION DETAILS
  siteLocation = '';
  approvalAuthority = '';

  // UTILITIES
  plotArea = 0;
  sumpLitres = 0;
  wasteWaterTank = 0;
  compoundWall = 0;
  solarPower = 0;

  // BOREWELL
  boreDepth: number | null = null;
  boreCost = 0;

  // ELECTRICITY
  ebConnection = '';
  ebCost = 0;
  expectedEbBill = 0;
  ebSinglePhaseCost = 25000;
  ebThreePhaseCost = 65000;

  // TOTAL
  totalCost = 0;
  estimatedCost = 0;
  submitted = false;
  showEstimate = false;

  // EXPAND / COLLAPSE
  expandedState: boolean[][] = [];

  // PRICING PACKAGES
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

  constructor(private http: HttpClient) {}

  // INITIALIZE
  ngOnInit(): void {
    this.expandedState = this.packages.map((pkg) =>
      pkg.features.map(() => false)
    );
  }

  // SELECT PACKAGE
  selectPackage(price: number): void {
    this.selectedPackage = price;
  }

  // TOGGLE FEATURE
  toggleFeature(cardIndex: number, featureIndex: number): void {
    this.expandedState[cardIndex][featureIndex] =
      !this.expandedState[cardIndex][featureIndex];
  }

  // CALCULATE ESTIMATE AND SAVE TO BACKEND
  calculateEstimate(form: NgForm): void {
    this.submitted = true;
    this.saveError = '';

    Object.values(form.controls).forEach((control) =>
      control.markAsTouched()
    );

    if (this.saving) {
      return;
    }

    // Validate calculator fields
    if (
      form.invalid ||
      !this.fullName.trim() ||
      !/^[6-9]\d{9}$/.test(this.phoneNumber.trim()) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim()) ||
      !this.address.trim() ||
      !this.siteLocation ||
      !this.constructionType ||
      !['Single Phase', 'Three Phase'].includes(this.ebConnection) ||
      Number(this.plotArea) < 100 ||
      Number(this.plotArea) > 100000 ||
      this.selectedPackage === null ||
      ![2350, 2550, 2800, 3000].includes(
        Number(this.selectedPackage)
      ) ||
      Number(this.wasteWaterTank) <= 0
    ) {
      this.totalCost = 0;
      this.estimatedCost = 0;
      this.ebCost = 0;
      this.boreCost = 0;
      this.showEstimate = false;

      return;
    }

    // Calculate package construction cost
    const constructionCost =
      Number(this.plotArea) * Number(this.selectedPackage);

    // Calculate additional costs
    this.boreCost = this.getBorewellCost();
    this.ebCost = this.getEbConnectionCost();

    const total =
      constructionCost +
      this.boreCost +
      Number(this.sumpLitres || 0) * 25 +
      Number(this.wasteWaterTank) * 30000 +
      Number(this.compoundWall || 0) * 2000 +
      Number(this.solarPower || 0) * 75000 +
      this.ebCost;

    this.totalCost = total;
    this.estimatedCost = total;
    this.showEstimate = true;

    // Automatically save after a successful calculation
    this.submitCalculator();
  }

  // GET TOTAL COST
  getTotalCost(): number {
    return this.totalCost;
  }

  // SUBMIT ESTIMATE TO BACKEND
  submitCalculator(): void {
    if (!this.showEstimate || this.saving) {
      return;
    }

    this.saving = true;
    this.saveError = '';
    this.savedEstimateId = '';

    const estimateData = {
      fullName: this.fullName.trim(),
      phoneNumber: this.phoneNumber.trim(),
      email: this.email.trim(),
      address: this.address.trim(),

      constructionArea: this.constructionArea,
      plotArea: Number(this.plotArea),
      selectedPackage: Number(this.selectedPackage),
      packageName: this.getSelectedPackageName(),

      constructionType: this.constructionType,
      floors: this.floors,
      siteLocation: this.siteLocation,
      approvalAuthority: this.approvalAuthority,

      sumpLitres: Number(this.sumpLitres || 0),
      wasteWaterTank: Number(this.wasteWaterTank),
      compoundWall: Number(this.compoundWall || 0),
      solarPower: Number(this.solarPower || 0),

      boreDepth: this.boreDepth,
      boreCost: this.getBorewellCost(),

      ebConnection: this.ebConnection,
      ebCost: this.getEbConnectionCost(),

      constructionCost:
        Number(this.plotArea) * Number(this.selectedPackage),

      totalCost: this.totalCost,
    };

    this.http
      .post<EstimateResponse>(this.apiUrl, estimateData)
      .subscribe({
        next: (response) => {
          this.saving = false;
          this.savedEstimateId = response.estimateId;

          // Use the total calculated by the backend
          this.totalCost = response.totalCost;
          this.estimatedCost = response.totalCost;

          alert(
            'Estimate saved successfully!\n\n' +
            'Estimate ID: ' + response.estimateId + '\n' +
            'Estimated Construction Cost: ₹' +
            response.totalCost.toLocaleString('en-IN')
          );
        },
        error: (error) => {
          this.saving = false;

          this.saveError =
            error.error?.message ||
            'Unable to save estimate. Please check the backend server.';

          console.error('Error saving estimate:', error);

          alert(this.saveError);
        },
      });
  }

  // RESET CALCULATOR
  resetCalculator(form: NgForm): void {
    if (this.saving) {
      return;
    }

    this.fullName = '';
    this.phoneNumber = '';
    this.email = '';
    this.address = '';

    this.constructionArea = null;
    this.plotArea = 0;
    this.selectedPackage = 0;

    this.constructionType = '';
    this.floors = '';
    this.siteLocation = '';
    this.approvalAuthority = '';

    this.sumpLitres = 0;
    this.wasteWaterTank = 0;
    this.compoundWall = 0;
    this.solarPower = 0;

    this.boreDepth = null;
    this.boreCost = 0;

    this.ebConnection = '';
    this.ebCost = 0;
    this.expectedEbBill = 0;

    this.totalCost = 0;
    this.estimatedCost = 0;

    this.showEstimate = false;
    this.submitted = false;

    this.saveError = '';
    this.savedEstimateId = '';

    form.resetForm();

    // Restore the intended defaults
    this.fullName = '';
    this.phoneNumber = '';
    this.email = '';
    this.address = '';

    this.constructionArea = null;
    this.plotArea = 0;
    this.selectedPackage = 0;

    this.constructionType = '';
    this.floors = '';
    this.siteLocation = '';
    this.approvalAuthority = '';

    this.sumpLitres = 0;
    this.wasteWaterTank = 0;
    this.compoundWall = 0;
    this.solarPower = 0;

    this.boreDepth = null;
    this.ebConnection = '';
  }

  // PACKAGE NAME
  getSelectedPackageName(): string {
    const pkg = this.packages.find(
      (x) => x.price === Number(this.selectedPackage)
    );

    return pkg ? pkg.name : '';
  }

  // ELECTRICITY COST
  getEbConnectionCost(): number {
    if (this.ebConnection === 'Single Phase') {
      return this.ebSinglePhaseCost;
    }

    if (this.ebConnection === 'Three Phase') {
      return this.ebThreePhaseCost;
    }

    return 0;
  }

  // BOREWELL COST
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

  // PRINT ESTIMATE
  printEstimate(): void {
    if (!this.showEstimate) {
      return;
    }

    window.print();
  }

  // DOWNLOAD PDF
  downloadEstimate(): void {
    alert('PDF Download feature can be added later.');
  }
}
