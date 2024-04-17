import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDefaultComponent } from './chart.default.component';

describe('ChartDefaultComponent', () => {
  let component: ChartDefaultComponent;
  let fixture: ComponentFixture<ChartDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartDefaultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
