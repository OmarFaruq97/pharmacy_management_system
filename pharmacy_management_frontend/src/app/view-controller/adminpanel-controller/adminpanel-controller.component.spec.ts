import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpanelControllerComponent } from './adminpanel-controller.component';

describe('AdminpanelControllerComponent', () => {
  let component: AdminpanelControllerComponent;
  let fixture: ComponentFixture<AdminpanelControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminpanelControllerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminpanelControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
