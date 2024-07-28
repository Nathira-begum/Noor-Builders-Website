import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFreeQuoteComponent } from './get-free-quote.component';

describe('GetFreeQuoteComponent', () => {
  let component: GetFreeQuoteComponent;
  let fixture: ComponentFixture<GetFreeQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetFreeQuoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetFreeQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
