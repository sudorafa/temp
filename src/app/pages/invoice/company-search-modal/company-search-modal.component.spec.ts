import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySearchModalComponent } from './company-search-modal.component';

describe('CompanySearchModalComponent', () => {
  let component: CompanySearchModalComponent;
  let fixture: ComponentFixture<CompanySearchModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanySearchModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanySearchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
