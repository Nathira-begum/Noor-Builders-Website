import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaCostCalculatorComponent } from './la-cost-calculator.component';

describe('LaCostCalculatorComponent', () => {
  let component: LaCostCalculatorComponent;
  let fixture: ComponentFixture<LaCostCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaCostCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaCostCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
