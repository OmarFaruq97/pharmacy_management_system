import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGenericComponent } from './new-generic.component';

describe('NewGenericComponent', () => {
  let component: NewGenericComponent;
  let fixture: ComponentFixture<NewGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewGenericComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
