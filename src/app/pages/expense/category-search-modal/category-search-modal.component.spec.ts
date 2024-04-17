import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySearchModalComponent } from './category-search-modal.component';

describe('CategorySearchModalComponent', () => {
  let component: CategorySearchModalComponent;
  let fixture: ComponentFixture<CategorySearchModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorySearchModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorySearchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
