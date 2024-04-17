import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNotImplementedComponent } from './modal-not-implemented.component';

describe('ModalNotImplementedComponent', () => {
  let component: ModalNotImplementedComponent;
  let fixture: ComponentFixture<ModalNotImplementedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNotImplementedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalNotImplementedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
