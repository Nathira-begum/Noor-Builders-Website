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
      price: 1900,
      features: [
        {
          title: 'Design',
          features: ['3D - Basic Elevation'],
          expanded: false,
        },
        {
          title: 'Structure',
          features: [
            'Type: Sttuf Column',
            'Cement: TNPL',
            'Brick: Chamber',
            'Steel: Adithiya (or) Equivalent',
          ],
          expanded: false,
        },
        {
          title: 'Doors & Windows',
          features: [
            'Maindoor (5" * 7"): Teak Wood(5" * 4")',
            'Bed Room: Country Wood with Flush Door',
            'Window & Ventilator: Country Wood Frame & Shutters',
            'Bathroom: PVC Door',
            'Hardwares: PowDer Coat',
            'Staircase Handrail: M.S Handrail & M.S Baluster',
          ],
          expanded: false,
        },
        {
          title: 'Tiles & Granite',
          features: [
            'Flooring: Rs 45 /Sq.ft (Basic Cost)',
            'Wall: Rs 35 /Sq.ft (Basic Cost)',
            'Paving: Rs 35 /Sq.ft (Basic Cost)',
            'Granite: Rs 100/Sq.ft (Basic Cost)',
            'Kitchen Table Top: Granite Top with S.S Sink',
          ],
          expanded: false,
        },
        {
          title: 'Electrical',
          features: [
            'Pipes: ISI Brand',
            'Wires: ISI Brand',
            'Switches: Kundan(Fybros)',
            'Others: UPS Line + 1 AC Point',
          ],
          expanded: false,
        },
        { title: 'Plumbing', features: ['ISI Brand'], expanded: false },

        {
          title: 'Painting',
          features: [
            'Inner: Two Coat of White Wash',
            'Outer: Two Coat of White Wash',
            'Polish: Melamine Polish',
            'Enamel: Dulux',
            'Terrace: White Wash with Water Proof Oil',
          ],
          expanded: false,
        },

        {
          title: 'Extra Charges',
          features: [
            'Preliminary Work: Site Cleaning, Appoval, EB Connection, Borewell & Sub Motar, Material Storage Places(Shed).',
            'Main Building Works: Over Head Tank and Steel Stand, Underground Sump, Septic Tank, Soak Pit, Compound Wall, Gate & Ramp, Outer Flooring, Kerb Wall & Drainage, Washing Stone & Dry Cloth Angle.',
            'Finishing Works: Electrical Fitting(Material & Labour), Plumping Fittings(Material & Labour), Wall Glading Tiles, Three Phase DB Work, Ground Earth, Sump Motor, Auto Cutter Device,External Gas Pipe Work, Interior Cupboard Work.',
          ],
          expanded: false,
        },
      ],
    },
    {
      name: 'Premium',
      price: 2000,
      features: [
          {
          title: 'Design',
          features: ['3D - Engineer Choice'],
          expanded: false,
        },
        {
          title: 'Structure',
          features: [
            'Type: Column Raising',
            'Cement: Chettinad or Dalmia',
            'Brick: Chamber',
            'Steel: Indrola (or) Equivalent',
          ],
          expanded: false,
        },
        {
          title: 'Doors & Windows',
          features: [
            'Maindoor (5" * 7"): Teak Wood(5" * 4")',
            'Bed Room: Country Wood with Flush Door',
            'Window & Ventilator: Country Wood Frame & Shutters',
            'Bathroom: PVC Door',
            'Hardwares: S.S Coat',
            'Staircase Handrail: M.S Handrail & M.S Baluster',
          ],
          expanded: false,
        },
        {
          title: 'Tiles & Granite',
          features: [
            'Flooring: Rs 50 /Sq.ft (Basic Cost)',
            'Wall: Rs 35 /Sq.ft (Basic Cost)',
            'Paving: Rs 35 /Sq.ft (Basic Cost)',
            'Granite: Rs 140/Sq.ft (Basic Cost)',
            'Kitchen Table Top: Granite Top with S.S Sink',
          ],
          expanded: false,
        },
        {
          title: 'Electrical',
          features: [
            'Pipes: ISI Brand',
            'Wires: Kundan',
            'Switches: GM-G9',
            'Others: UPS Line + 2 AC Point',
          ],
          expanded: false,
        },
        { title: 'Plumbing', features: ['TRUflow'], expanded: false },

        {
          title: 'Painting',
          features: [
            'Inner: Two Coat Putty, Two Coat Emulsion 5- years any Products',
            'Outer: Two Coat Emulsion 5-Years any Product',
            'Polish: Melamine Polish',
            'Enamel: Asian',
            'Terrace: White Wash with Water Proof Oil',
          ],
          expanded: false,
        },

        {
          title: 'Extra Charges',
          features: [
            'Preliminary Work: Site Cleaning, Appoval, EB Connection, Borewell & Sub Motar, Material Storage Places(Shed).',
            'Main Building Works: Over Head Tank and Steel Stand, Underground Sump, Septic Tank, Soak Pit, Compound Wall, Gate & Ramp, Outer Flooring, Kerb Wall & Drainage, Washing Stone & Dry Cloth Angle.',
            'Finishing Works: Electrical Fitting(Material & Labour), Plumping Fittings(Material & Labour), Wall Glading Tiles, Three Phase DB Work, Ground Earth, Sump Motor, Auto Cutter Device,External Gas Pipe Work, Interior Cupboard Work.',
          ],
          expanded: false,
        },
      ],
    },
    {
      name: 'Elite',
      price: 2350,
      features: [
           {
          title: 'Design',
          features: ['3D - Client Choice(T&C Apply)'],
          expanded: false,
        },
        {
          title: 'Structure',
          features: [
            'Type: Framed Structure',
            'Cement: Ramco or Ultra Tech',
            'Brick: Wirecut',
            'Steel: Jindal (or) Vizaq',
          ],
          expanded: false,
        },
        {
          title: 'Doors & Windows',
          features: [
            'Maindoor (5" * 7"): Teak Wood(6" * 4")',
            'Bed Room: Country Wood with Flush Door',
            'Window & Ventilator: Country Wood Frame & Teak Shutters',
            'Bathroom: PVC Door',
            'Hardwares: Antic Coat',
            'Staircase Handrail: S.S Handrail & S.S Baluster',
          ],
          expanded: false,
        },
        {
          title: 'Tiles & Granite',
          features: [
            'Flooring: Rs 60 /Sq.ft (Basic Cost)',
            'Wall: Rs 40 /Sq.ft (Basic Cost)',
            'Paving: Rs 40 /Sq.ft (Basic Cost)',
            'Granite: Rs 160/Sq.ft (Basic Cost)',
            'Kitchen Table Top: Granite Top with S.S Sink',
          ],
          expanded: false,
        },
        {
          title: 'Electrical',
          features: [
            'Pipes: Finolex',
            'Wires: Finolex or Equilant',
            'Switches: Legrand - Mylic',
            'Others: UPS Line + 2 AC Point + Home Theatre Line',
          ],
          expanded: false,
        },
        { title: 'Plumbing', features: ['Finolex / Supreme'], expanded: false },

        {
          title: 'Painting',
          features: [
            'Inner: Two Coat Putty, Two Coat Emulsion 7-Years any Product',
            'Outer: Two Coat Emulsion 5-Years any Product',
            'Polish: Melamine Polish',
            'Enamel: Asian',
            'Terrace: Cooling Tiles',
          ],
          expanded: false,
        },

        {
          title: 'Extra Charges',
          features: [
            'Preliminary Work: Site Cleaning, Appoval, EB Connection, Borewell & Sub Motar, Material Storage Places(Shed).',
            'Main Building Works: Over Head Tank and Steel Stand, Underground Sump, Septic Tank, Soak Pit, Compound Wall, Gate & Ramp, Outer Flooring, Kerb Wall & Drainage, Washing Stone & Dry Cloth Angle.',
            'Finishing Works: Electrical Fitting(Material & Labour), Plumping Fittings(Material & Labour), Wall Glading Tiles, Three Phase DB Work, Ground Earth, Sump Motor, Auto Cutter Device,External Gas Pipe Work, Interior Cupboard Work.',
          ],
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
