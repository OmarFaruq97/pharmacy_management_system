import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowStockAlertComponent } from './low-stock-alert.component';

describe('LowStockAlertComponent', () => {
  let component: LowStockAlertComponent;
  let fixture: ComponentFixture<LowStockAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LowStockAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LowStockAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
