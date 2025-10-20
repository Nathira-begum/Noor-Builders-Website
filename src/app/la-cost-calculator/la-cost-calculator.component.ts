import { Component } from '@angular/core';

interface PackageFeature {
  title: string;
  features: string[];
  expanded: boolean;
}

@Component({
  selector: 'app-la-cost-calculator',
  templateUrl: './la-cost-calculator.component.html',
  styleUrls: ['./la-cost-calculator.component.css'],
})
export class LaCostCalculatorComponent {
  area: number = 0;
  selectedPackage: string = '';
  totalCost: number | null = null;
  constructionArea: number = 0;
  packageCost: number = 0;
  carParking: number = 0;
  sumpLitres: number = 0;
  wasteWaterTank: number = 0;
  compoundWall: number = 0;
  solarPower: number = 0;
  submitted: boolean = false;

  packages: { name: string; price: number; features: PackageFeature[] }[] = [
    {
      name: 'Basic',
      price: 1899,
      features: [
        {
          title: 'Design',
          features: [
            'Basement height: Up to 2 feet',
            'Steel: Any ISI brand',
            'Aggregates: 20mm & 40mm',
            'Blocks: 6 inch for Exterior Wall & 4 inch for Interior Wall or Bricks: 9 inch for Exterior Wall & 4.5 inch for Interior Wall',
            'Cement: Any ISI brand',
            'Sand: Blockwork & P Sand: Plastering',
            'RCC Design Mix: M20',
            'Ceiling Height: 10 Feet',
          ],
          expanded: false,
        },
        {
          title: 'Kitchen',
          features: ['Basic Kitchen setup'],
          expanded: false,
        },
        {
          title: 'Bathroom',
          features: ['Basic Bathroom setup'],
          expanded: false,
        },
        { title: 'Plumbing', features: ['Basic plumbing'], expanded: false },
        {
          title: 'Doors & Windows',
          features: ['Basic doors and windows'],
          expanded: false,
        },
        { title: 'Painting', features: ['Basic painting'], expanded: false },
        { title: 'Flooring', features: ['Basic flooring'], expanded: false },
        {
          title: 'Electrical',
          features: ['Basic electricals'],
          expanded: false,
        },
        {
          title: 'Other Inclusives',
          features: ['Other basic inclusives'],
          expanded: false,
        },
        {
          title: 'Extra Charges',
          features: ['No extra charges'],
          expanded: false,
        },
      ],
    },
    {
      name: 'Standard',
      price: 2099,
      features: [
        {
          title: 'Design',
          features: ['All features in basic package'],
          expanded: false,
        },
        {
          title: 'Structure',
          features: ['Standard structure'],
          expanded: false,
        },
        {
          title: 'Kitchen',
          features: ['Free Smart Home Automation'],
          expanded: false,
        },
        {
          title: 'Bathroom',
          features: ['Free Organic Terrace Gardening'],
          expanded: false,
        },
        {
          title: 'Plumbing',
          features: [
            'Bathroom: 1 wash basin with tap, 1 shower with wall mixer for hot & cold water, 1 floor mount western closet with health faucet',
            'Dining: 1 wash basin with tap',
            'Kitchen: Double stainless steel sink with 1 tap & 1 RO point',
            'Service: 1 tap point & water outlet point for washing machine',
          ],
          expanded: false,
        },
        {
          title: 'Doors & Windows',
          features: ['Standard doors & windows'],
          expanded: false,
        },
        { title: 'Painting', features: ['Standard painting'], expanded: false },
        { title: 'Flooring', features: ['Vitrified Tiles'], expanded: false },
        {
          title: 'Electrical',
          features: ['Branded Electricals'],
          expanded: false,
        },
        {
          title: 'Other Inclusives',
          features: ['Other standard inclusives'],
          expanded: false,
        },
        {
          title: 'Extra Charges',
          features: ['No extra charges'],
          expanded: false,
        },
      ],
    },
    {
      name: 'Premium',
      price: 2449,
      features: [
        {
          title: 'Design',
          features: ['All features in standard package'],
          expanded: false,
        },
        {
          title: 'Structure',
          features: ['Premium structure'],
          expanded: false,
        },
        {
          title: 'Kitchen',
          features: ['Granite flooring', 'Premium quality materials'],
          expanded: false,
        },
        { title: 'Bathroom', features: ['Luxury bathrooms'], expanded: false },
        {
          title: 'Plumbing',
          features: ['High-end plumbing fixtures'],
          expanded: false,
        },
        {
          title: 'Doors & Windows',
          features: ['Designer doors & windows'],
          expanded: false,
        },
        { title: 'Painting', features: ['Luxury painting'], expanded: false },
        {
          title: 'Flooring',
          features: ['Granite / Marble flooring'],
          expanded: false,
        },
        {
          title: 'Electrical',
          features: ['Smart electricals'],
          expanded: false,
        },
        {
          title: 'Other Inclusives',
          features: ['Luxury inclusives'],
          expanded: false,
        },
        {
          title: 'Extra Charges',
          features: ['No extra charges'],
          expanded: false,
        },
      ],
    },
  ];

  toggleFeature(pkgIndex: number, featureIndex: number) {
    this.packages[pkgIndex].features[featureIndex].expanded =
      !this.packages[pkgIndex].features[featureIndex].expanded;
  }

  getTotalCost(): number {
    const constructionTotal = this.constructionArea * this.packageCost;
    const carParkingTotal = this.carParking * 1800;
    const sumpTotal = this.sumpLitres * 25;
    const wasteWaterTotal = this.wasteWaterTank * 30000;
    const compoundWallTotal = this.compoundWall * 2000;
    const solarTotal = this.solarPower * 75000;

    return (
      constructionTotal +
      carParkingTotal +
      sumpTotal +
      wasteWaterTotal +
      compoundWallTotal +
      solarTotal
    );
  }

  submitCalculator() {
    this.submitted = true;
    alert('Total Cost: ₹' + this.getTotalCost());
  }

  resetCalculator() {
    this.constructionArea = 0;
    this.packageCost = 0;
    this.carParking = 0;
    this.sumpLitres = 0;
    this.wasteWaterTank = 0;
    this.compoundWall = 0;
    this.solarPower = 0;
    this.submitted = false;
  }
}
