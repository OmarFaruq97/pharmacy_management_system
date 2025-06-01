import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMedicineInputComponent } from './company-medicine-input.component';

describe('CompanyMedicineInputComponent', () => {
  let component: CompanyMedicineInputComponent;
  let fixture: ComponentFixture<CompanyMedicineInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyMedicineInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyMedicineInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
