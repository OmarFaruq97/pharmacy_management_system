import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineNameComponent } from './medicine-name.component';

describe('MedicineNameComponent', () => {
  let component: MedicineNameComponent;
  let fixture: ComponentFixture<MedicineNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicineNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
